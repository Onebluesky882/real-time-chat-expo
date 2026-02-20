import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type CodeStepProps = {
  inputs: React.RefObject<(TextInput | null)[]>;
  code: string[];
  handleBackspace: (value: string, index: number) => void;
  handleChange: (value: string, index: number) => void;
  onResend: () => void;
};

export const CodeStep = ({
  handleBackspace,
  handleChange,
  onResend,
  code,
  inputs,
}: CodeStepProps) => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleResend = () => {
    if (seconds > 0) return;
    onResend();
    setSeconds(30);
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white dark:bg-black">
      {/* Title */}
      <View className="items-center mb-10">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">
          Verification Code
        </Text>
        <Text className="text-gray-400 mt-2 text-center">
          Enter the 6-digit code sent to your email
        </Text>
      </View>

      {/* OTP Inputs */}
      <View className="flex-row justify-between">
        {Array.from({ length: 6 }).map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref;
            }}
            style={{
              width: 48,
              height: 56,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: code[index] ? "#2563EB" : "#D1D5DB",
              backgroundColor: code[index] ? "#EFF6FF" : "#FFFFFF",
              textAlign: "center",
              fontSize: 22,
              fontWeight: "600",
              color: "#111827",
            }}
            keyboardType="number-pad"
            maxLength={1}
            value={code[index]}
            onChangeText={(value) => handleChange(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(code[index], index);
              }
            }}
            selectionColor="#2563EB"
            cursorColor="#2563EB"
            autoCorrect={false}
            autoFocus={index === 0}
            textContentType="oneTimeCode"
          />
        ))}
      </View>

      {/* Resend Section */}
      <View className="items-center mt-10">
        {seconds > 0 ? (
          <Text className="text-gray-400 text-sm">
            Resend code in{" "}
            <Text className="text-gray-700 dark:text-gray-200 font-semibold">
              {seconds}s
            </Text>
          </Text>
        ) : (
          <TouchableOpacity
            onPress={handleResend}
            className="px-6 py-3 rounded-xl bg-blue-500 active:opacity-80"
          >
            <Text className="text-white font-semibold">Resend Code</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
