import { ChannelCard } from "@/components/Channel/ChannelCard";
import { db } from "@/utils/instanddb";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { user } = db.useAuth();

  const handleLogout = async () => {
    try {
      await db.auth.signOut();
      router.replace("/(auth)");
    } catch (err) {
      console.log("logout error", err);
    }
  };

  const { data, isLoading, error } = db.useQuery({ channels: {} });

  if (isLoading) {
    return <Text>loading</Text>;
  }
  if (error) {
    return <Text>something has problem!!</Text>;
  }
  const { channels } = data;

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-10">
        {/* TOP SECTION */}
        <View className="flex-1">
          <Text className="text-gray-500 mb-8">Hi {user?.email}</Text>

          <Text className="text-base font-medium mb-3">Channels</Text>

          <TouchableOpacity
            onPress={() => router.push("/(app)/channel")}
            className="bg-blue-400 py-3 rounded-lg mb-3"
          >
            <Text className="text-white text-center">Open Channel</Text>
          </TouchableOpacity>

          <View className="   flex-1 my-2 bg-white shadow-2xl p-4 rounded-md">
            <Text className="m-2">Channel Online 🟢</Text>
            {channels.length == 0 ? (
              <Text>No Channel</Text>
            ) : (
              <View>
                {channels.map((item) => (
                  <ChannelCard channel={item.name} key={item.id} />
                ))}
              </View>
            )}
          </View>
        </View>

        {/* BOTTOM SECTION */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 py-3 rounded-2xl mb-6"
        >
          <Text className="text-center text-gray-200 ">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
