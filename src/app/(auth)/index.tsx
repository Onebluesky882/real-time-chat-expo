import { CodeStep } from "@/components/AuthScreen/ConfirmCode";
import { EmailStep } from "@/components/AuthScreen/EmailStep";
import { db } from "@/utils/instanddb";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [sentEmail, setSentEmail] = useState("");
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleSubmitEmail = async () => {
    const trimmed = email.trim();

    if (!trimmed) {
      Alert.alert("Email required");
      return;
    }
    try {
      await db.auth.sendMagicCode({ email: trimmed });
      setSentEmail(trimmed);
    } catch (error: any) {
      Alert.alert("Error", error.body?.message ?? "Failed to send code");
    }
  };
  // ✅ submit OTP
  const submitCode = async (fullCode: string) => {
    try {
      await db.auth.signInWithMagicCode({
        email: sentEmail,
        code: fullCode,
      });

      router.replace("/(app)");
    } catch (err: any) {
      Alert.alert("Error", err.body?.message ?? "Invalid code");
    }
  };

  // ✅ handle change
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    if (newCode.every((digit) => digit !== "")) {
      submitCode(newCode.join(""));
    }
  };

  // ✅ backspace
  const handleBackspace = (value: string, index: number) => {
    if (value === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    try {
      await db.auth.sendMagicCode({ email: sentEmail });
    } catch (err: any) {
      Alert.alert("Error", err.body?.message ?? "Failed to resend");
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
        <CodeStep
          code={code}
          inputs={inputs}
          handleBackspace={handleBackspace}
          handleChange={handleChange}
          onResend={handleResend}
        />
      )}
    </View>
  );
}
