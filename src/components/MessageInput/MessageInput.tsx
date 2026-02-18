import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type Prop = {
  onSend: (text: string) => void;
};

export function MessageInput({ onSend }: Prop) {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;
    await onSend(text.trim());
    setText("");
  };

  return (
    <View className="flex-row items-center gap-2 bg-white   py-5 px-5">
      <TextInput
        placeholder="Type message"
        value={text}
        onChangeText={setText}
        className="flex-1 border border-gray-300 rounded-full px-4 py-3 "
      />

      <TouchableOpacity
        onPress={handleSend}
        className="bg-blue-500 p-3 rounded-full"
      >
        <Text className="text-white font-semibold">Send</Text>
      </TouchableOpacity>
    </View>
  );
}
