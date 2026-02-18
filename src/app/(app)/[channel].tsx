import { MessageBox } from "@/components/Channel/MessageBox";
import { AppSchema } from "@/instant.schema";
import { db } from "@/utils/instanddb";
import { InstaQLEntity } from "@instantdb/react-native";
import { FlashList, FlashListRef } from "@shopify/flash-list";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import { Text, View } from "react-native";

export type Messages = InstaQLEntity<AppSchema, "messages">;
export default function channel() {
  const listRef = useRef<FlashListRef<any>>(null);
  const { channel } = useLocalSearchParams();
  const user = db.useAuth().user;
  const channelName = channel as string;
  const { data, isLoading } = db.useQuery({
    messages: {
      $: {
        where: {
          "channel.name": channelName,
        },
        order: { timestamp: "asc" },
      },
      author: {
        user: {},
      },
    },
  });
  const messages = data?.messages ?? [];

  console.log(JSON.stringify(data, null, 2));

  if (isLoading) return <Text>loading</Text>;

  return (
    <>
      <Stack.Screen
        options={{
          title: String(channel),
        }}
      />
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
    </>
  );
}
