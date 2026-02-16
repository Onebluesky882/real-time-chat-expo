import React from "react";
import { Button, View } from "react-native";

type SignOutProp = {
  handleSignOut: () => void;
};

const SignOut = ({ handleSignOut }: SignOutProp) => {
  return (
    <View>
      <Button title="Logout" onPress={handleSignOut} />
    </View>
  );
};

export default SignOut;
