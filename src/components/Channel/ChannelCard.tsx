import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type ChannelCardProp = {
  channel: string;
  id: string;
};

export const ChannelCard = ({ channel, id }: ChannelCardProp) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push(`/${id}`)}
      className="bg-white p-4 rounded-xl mb-3 shadow-sm border border-gray-100"
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-medium text-gray-800">{channel}</Text>

        <Text className="text-gray-400 text-sm">›</Text>
      </View>
    </TouchableOpacity>
  );
};
