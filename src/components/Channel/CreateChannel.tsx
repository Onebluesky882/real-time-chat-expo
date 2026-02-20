import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type CreateChannelProps = {
  handleNewChannel: (name: string) => void;
};

export const CreateChannel = ({ handleNewChannel }: CreateChannelProps) => {
  const [toggle, setToggle] = useState(false);
  const [channelName, setChannelName] = useState("");
  const handlePress = () => {
    if (!toggle) {
      setToggle(true);
      return;
    }
    if (!channelName.trim()) return;

    handleNewChannel(channelName.trim());
    setChannelName("");
    setToggle(false);
  };

  return (
    <View className="my-4">
      {toggle && (
        <TextInput
          value={channelName}
          onChangeText={setChannelName}
          placeholder="Channel name"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 10,
          }}
        />
      )}

      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        style={{
          backgroundColor: "#3B82F6",
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
          {toggle ? "Create Channel" : "+ New Channel"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
