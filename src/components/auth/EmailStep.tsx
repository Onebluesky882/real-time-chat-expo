import { Button, Text, TextInput, View } from "react-native";

type EmailStepProps = {
  email: string;
  onChangeEmail: (email: string) => void;
  onSubmit: () => void;
};

export const EmailStep = ({
  onSubmit,
  onChangeEmail,
  email,
}: EmailStepProps) => {
  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <View className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <Text className="text-gray-600 text-center p-4 font-bold">
          Login by Email
        </Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          className="w-full border border-gray-300 rounded-xl px-4 py-4 mb-4 text-gray-800"
          onChangeText={onChangeEmail}
          value={email}
        />

        <View className="rounded-xl overflow-hidden">
          <Button title="Send Email" onPress={onSubmit} />
        </View>
      </View>
    </View>
  );
};
