import { ActivityIndicator, Text, View } from "react-native";

export const ChannelLoading = () => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <View className="bg-white px-6 py-5 rounded-2xl shadow-sm border border-gray-100 items-center">
        <ActivityIndicator size="small" />
        <Text className="mt-3 text-gray-600 text-sm">Loading channel...</Text>
      </View>
    </View>
  );
};
