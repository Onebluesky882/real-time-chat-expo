import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

type NumericKeypadProps = {
  onKeyPress: (key: string) => void;
};

export default function NumericKeypad({ onKeyPress }: NumericKeypadProps) {
  const keys = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "",
    "0",
    "backspace",
  ];

  return (
    <View className="bg-gray-50 pt-2 pb-6 border-t border-gray-200">
      <View className="flex-row flex-wrap">
        {keys.map((key, index) => (
          <Pressable
            key={index}
            onPress={() => key && onKeyPress(key)}
            disabled={!key}
            className={`
              w-1/3 h-16
              items-center justify-center
              ${!key ? "opacity-0" : ""}
            `}
            android_ripple={{ color: "#e5e7eb" }}
          >
            {key === "backspace" ? (
              <Feather name="delete" size={24} color="#9ca3af" />
            ) : (
              <Text className="text-2xl font-medium text-gray-900">{key}</Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
