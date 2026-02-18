import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

export default function _layout() {
  const { channel } = useLocalSearchParams();
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="[channel]"
        options={{
          headerBackVisible: true,
          headerBackTitle: "back",
        }}
      />
    </Stack>
  );
}
