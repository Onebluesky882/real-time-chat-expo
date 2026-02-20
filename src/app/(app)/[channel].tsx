import { MessageBox } from "@/components/Channel/MessageBox";
import { MessageInput } from "@/components/MessageInput/MessageInput";
import { AppSchema } from "@/instant.schema";
import { db } from "@/utils/instanddb";
import { InstaQLEntity } from "@instantdb/react-native";
import { FlashList, FlashListRef } from "@shopify/flash-list";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import { Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import sendMessage from "../service/chat.service";
import { ChannelLoading } from "@/components/ChannelLoading";

export type Messages = InstaQLEntity<AppSchema, "messages">;
export default function channel() {
  const listRef = useRef<FlashListRef<any>>(null);
  const { channel } = useLocalSearchParams();
  const user = db.useAuth().user;
  const channelId = channel as string;
  // 1️⃣ query channel
  const { data: channelData } = db.useQuery({
    channels: {
      $: { where: { id: channelId } },
    },
  });

  const { data: profileData } = db.useQuery(
    user?.id
      ? {
          profiles: {
            $: {
              where: {
                "user.id": user.id,
              },
            },
          },
        }
      : {},
  );

  const profileId = profileData?.profiles?.[0].id;
  const { data, isLoading } = db.useQuery(
    channelId
      ? {
          messages: {
            $: {
              where: { channel: channelId },
              order: { timestamp: "asc" },
            },
            author: {
              user: {},
            },
          },
        }
      : {},
  );

  const messages = data?.messages ?? [];
  if (isLoading) return <ChannelLoading />;
  if (!channelId) {
    return <ChannelLoading />;
  }

  const channelTitle = channelData?.channels?.[0]?.name;

  return (
    <>
      <Stack.Screen
        options={{
          title: channelTitle,
        }}
      />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View className="flex-1">
          <FlashList<(typeof messages)[number]>
            data={messages}
            ref={listRef}
            renderItem={({ item }) => (
              <MessageBox
                id={item.id}
                content={item.content}
                currentUserId={user?.id ?? ""}
                author={item.author}
                timestamp={item.timestamp}
              />
            )}
            onContentSizeChange={() =>
              listRef.current?.scrollToEnd({ animated: true })
            }
          />
        </View>
        <MessageInput
          onSend={(text) => {
            if (!channelId) return;
            sendMessage(text, profileId!, channelId);
          }}
        />
      </KeyboardAvoidingView>
    </>
  );
}
