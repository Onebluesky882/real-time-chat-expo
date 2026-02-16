import { db } from "@/utils/instanddb";
import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function index() {
  const handleLogout = async () => {
    await db.auth.signOut();
    router.replace("/sign-in");
  };
  return (
    <View>
      <Text>index</Text>
      <Button title="logout" onPress={handleLogout} />
    </View>
  );
}
