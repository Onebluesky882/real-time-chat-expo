import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type CreateChannelProps = {
  handleNewChannel: () => void;
};

export const CreateChannel = ({ handleNewChannel }: CreateChannelProps) => {
  return (
    <View className="my-4">
      <TouchableOpacity
        onPress={handleNewChannel}
        activeOpacity={0.8}
        className="bg-blue-400 py-3 rounded-md items-center shadow-md"
      >
        <Text className="text-white font-semibold text-base">
          + New Channel
        </Text>
      </TouchableOpacity>
    </View>
  );
};
