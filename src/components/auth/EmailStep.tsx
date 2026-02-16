import { Button, TextInput, View } from "react-native";

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
    <View>
      <TextInput
        placeholder="Enter your email"
        className="flex-col-1 border rounded-md p-2 py-4 my-2 border-gray-300 text-gray-500 font-semibold"
        onChangeText={onChangeEmail}
        value={email}
      />
      <Button title="send email" onPress={onSubmit} />
    </View>
  );
};
