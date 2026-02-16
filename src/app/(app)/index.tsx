import { db } from "@/utils/instanddb";
import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function index() {
  const handleLogout = async () => {
    await db.auth.signOut();
    router.replace("/(auth)");
  };

  const user = db.useAuth().user;
  return (
    <View className="flex border">
      <Text>{user?.email}</Text>
      <Button title="logout" onPress={handleLogout} />
    </View>
  );
}
