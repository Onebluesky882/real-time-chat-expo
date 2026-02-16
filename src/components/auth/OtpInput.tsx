import React, { useEffect, useRef } from "react";
import { TextInput, View } from "react-native";

type OtpInputProps = {
  length: number;
  value: string[];
  onChange: (code: string[]) => void;
  onComplete: (code: string) => void;
};

export default function OtpInput({
  length,
  value,
  onChange,
  onComplete,
}: OtpInputProps) {
  const inputsRef = useRef<Array<TextInput | null>>([]);

  // ✅ focus first empty whenever value changes
  useEffect(() => {
    const firstEmptyIndex = value.findIndex((v) => v === "");
    const indexToFocus = firstEmptyIndex === -1 ? length - 1 : firstEmptyIndex;

    inputsRef.current[indexToFocus]?.focus();
  }, [value, length]);

  const handleChange = (text: string, index: number) => {
    // allow only numeric
    if (!/^\d*$/.test(text)) return;

    const newCode = [...value];

    // handle paste multiple digits (Android fix)
    if (text.length > 1) {
      const chars = text.slice(0, length - index).split("");
      chars.forEach((char, i) => {
        newCode[index + i] = char;
      });
      onChange(newCode);

      if (newCode.every((v) => v !== "")) {
        onComplete(newCode.join(""));
      }
      return;
    }

    newCode[index] = text;
    onChange(newCode);

    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newCode.every((v) => v !== "")) {
      onComplete(newCode.join(""));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (value[index] === "" && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <View className="flex-row justify-between gap-2">
      {value.map((digit, index) => (
        <View key={index} className="flex-1">
          <TextInput
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            returnKeyType="done"
            textContentType="oneTimeCode" // ✅ iOS autofill
            autoComplete="sms-otp" // ✅ Android autofill
            maxLength={length} // needed for paste support
            className={`
              h-14
              text-center text-2xl font-bold
              bg-white border-2 rounded-2xl
              ${
                digit
                  ? "border-indigo-600 text-indigo-700"
                  : "border-gray-200 text-gray-900"
              }
            `}
          />
        </View>
      ))}
    </View>
  );
}
