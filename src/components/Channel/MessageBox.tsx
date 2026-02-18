import { Messages } from "@/app/(app)/[channel]";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
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
  timestamp,
}: Messages & MessageBoxProps) => {
  const isMe = author?.user?.id === currentUserId;

  //   console.log("authorId:", author?.id);
  //   console.log("currentUserId:", currentUserId);

  console.log("time : ", formatTimeAgo(timestamp));
  console.log("timestamp", timestamp);
  return (
    <View className="flex-1 px-8 py-2 ">
      <Text className="text-xs text-gray-400 mt-1">
        {formatTimeAgo(timestamp)}
      </Text>
      {!isMe && (
        <Text className="text-gray-500 p-2">{author?.displayName}</Text>
      )}

      <View
        style={{
          alignSelf: isMe ? "flex-end" : "flex-start",
          backgroundColor: isMe ? "#DCF8C6" : "#FFFFFF",
          maxWidth: "70%",
          padding: 10,
          borderRadius: 12,
        }}
      >
        <Text className="text-[#25272E]">{content}</Text>
      </View>
    </View>
  );
};
