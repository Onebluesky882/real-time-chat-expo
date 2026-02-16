import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
    <View style={styles.container}>
      {/* OTP Inputs */}
      <View className="flex-row justify-between">
        {Array.from({ length: 6 }).map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref;
            }}
            className="
              w-14 h-16
              rounded-2xl
              border border-gray-300
              dark:border-gray-600
              bg-white dark:bg-gray-800
              text-center
              text-2xl
              font-bold
              text-gray-900 dark:text-white
              focus:border-blue-500
              shadow-sm
            "
            keyboardType="number-pad"
            maxLength={1}
            value={code[index]}
            onChangeText={(value) => handleChange(value, index)}
            onKeyPress={({ nativeEvent }) =>
              nativeEvent.key === "Backspace" &&
              handleBackspace(code[index], index)
            }
          />
        ))}
      </View>

      {/* Resend Section */}
      <View className="items-center mt-6">
        {seconds > 0 ? (
          <Text className="text-gray-400">Resend code in {seconds}s</Text>
        ) : (
          <TouchableOpacity onPress={handleResend}>
            <Text className="text-blue-500 font-semibold">Resend Code</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  input: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
  },
});
