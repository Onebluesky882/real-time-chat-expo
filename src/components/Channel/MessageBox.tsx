import { Messages } from "@/app/(app)/[channel]";
import React from "react";
import { Text, View } from "react-native";
type MessageBoxProps = Messages & {
  currentUserId: string;
  author?: Author;
};

type User = {
  id: string;
  email?: string;
  type?: string;
};
type Author = {
  id: string;
  displayName?: string;
  user?: User;
};
export const MessageBox = ({
  content,
  currentUserId,
  author,
}: Messages & MessageBoxProps) => {
  const isMe = author?.user?.id === currentUserId;

  return (
    <View className="flex-1 px-4 py-2 ">
      {!isMe && (
        <Text className="text-gray-500 p-2">{author?.displayName}</Text>
      )}

      <View
        className="shadow-md"
        style={{
          alignSelf: isMe ? "flex-end" : "flex-start",
          backgroundColor: isMe ? "#DCF8C6" : "#F2F2F2",
          maxWidth: "70%",
          padding: 10,
          borderRadius: 12,
        }}
      >
        <Text className="text-gray-600 font-medium text-[14px]">{content}</Text>
      </View>
    </View>
  );
};
