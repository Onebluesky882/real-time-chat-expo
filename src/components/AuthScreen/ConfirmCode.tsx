import React from "react";

import { db } from "@/utils/instanddb";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

const CodeStep = ({ sentEmail }: { sentEmail: string }) => {
  const [code, setCode] = useState("");

  const handleSubmitCode = async () => {
    const trimmed = code.trim();

    if (!trimmed) {
      Alert.alert("Code required");
      return;
    }

    try {
      await db.auth.signInWithMagicCode({
        email: sentEmail,
        code: trimmed,
      });
    } catch (err: any) {
      Alert.alert("Error", err.body?.message ?? "Invalid code");
    }
  };

  const handleResend = async () => {
    try {
      await db.auth.sendMagicCode({ email: sentEmail });
      Alert.alert("Code resent");
    } catch {
      Alert.alert("Failed to resend code");
    }
  };

  return (
    <View className="mt-8 w-full">
      {/* Title */}
      <Text className="text-2xl font-bold text-center mb-2">
        Verify your email
      </Text>

      {/* Subtitle */}
      <Text className="text-gray-500 text-center mb-6">
        We sent a verification code to{" "}
        <Text className="font-semibold text-black">{sentEmail}</Text>
      </Text>

      {/* Input */}
      <TextInput
        placeholder="Enter 6-digit code"
        keyboardType="number-pad"
        maxLength={6}
        className="border border-gray-300 rounded-xl px-4 py-4 text-center text-xl tracking-widest"
        value={code}
        onChangeText={setCode}
      />

      {/* Confirm Button */}
      <View className="mt-6">
        <Button title="Confirm" onPress={handleSubmitCode} />
      </View>

      {/* Resend */}
      <View className="mt-4 items-center">
        <Text className="text-blue-500 font-semibold" onPress={handleResend}>
          Resend code
        </Text>
      </View>
    </View>
  );
};

export default CodeStep;
