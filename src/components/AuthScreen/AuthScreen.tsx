import { db } from "@/utils/instanddb";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import CodeStep from "./ConfirmCode";
import { EmailStep } from "./EmailStep";

export const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [sentEmail, setSentEmail] = useState("");

  const handleSubmitEmail = async () => {
    const trimmed = email.trim();

    if (!trimmed) {
      Alert.alert("Email required");
      return;
    }

    // call API here
    try {
      await db.auth.sendMagicCode({ email: trimmed });
      setSentEmail(trimmed);
    } catch (error: any) {
      Alert.alert("Error", error.body?.message ?? "Failed to send code");
    }
  };

  return (
    <View className="justify-center w-full p-2">
      <Text className="font-bold text-2xl">Auth screen</Text>
      {!sentEmail ? (
        <EmailStep
          email={email}
          onChangeEmail={setEmail}
          onSubmit={handleSubmitEmail}
        />
      ) : (
        <CodeStep sentEmail={sentEmail} />
      )}
    </View>
  );
};
