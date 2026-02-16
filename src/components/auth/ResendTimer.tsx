import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

type ResendTimerProps = {
  onResend: () => void;
  initialSeconds?: number;
};

export default function ResendTimer({
  onResend,
  initialSeconds = 60,
}: ResendTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [seconds]);

  const handleResend = () => {
    if (!canResend) return;

    onResend();
    setSeconds(initialSeconds);
    setCanResend(false);
  };

  const formatTime = () => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <View className="items-center gap-3">
      <Text className="text-sm font-medium text-gray-400">
        ไม่ได้รับรหัส OTP ใช่หรือไม่?
      </Text>

      {canResend ? (
        <Pressable onPress={handleResend} className="flex-row items-center">
          <Feather name="refresh-ccw" size={16} color="#4f46e5" />
          <Text className="ml-2 text-indigo-600 font-semibold text-sm">
            ขอรหัสใหม่อีกครั้ง
          </Text>
        </Pressable>
      ) : (
        <View className="flex-row items-center">
          <Text className="text-gray-400 font-medium text-sm">
            ส่งรหัสใหม่ได้ใน {formatTime()}
          </Text>
        </View>
      )}
    </View>
  );
}
