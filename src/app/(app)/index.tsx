import { ChannelCard } from "@/components/Channel/ChannelCard";
import { CreateChannel } from "@/components/Channel/CreateChannel";
import { ChannelLoading } from "@/components/ChannelLoading";
import { db } from "@/utils/instanddb";
import { Redirect, router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

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

  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);
  if (!user) {
    return <Redirect href="/(auth)" />;
  }
  if (isLoading) {
    return  <ChannelLoading />
  }
  if (error) {
    return <Text>something has problem!!</Text>;
  }
  const { channels } = data;

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-4 mt-4">
        {/* TOP SECTION */}
        <View className="flex-1">
          <View className=" flex-row items-center justify-between">
            <Text className="text-gray-500 mb-2">Hi {user?.email}</Text>
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-red-500  px-2 py-1 rounded-md "
            >
              <Text className="text-center text-gray-100 ">Logout</Text>
            </TouchableOpacity>
          </View>

          <CreateChannel handleNewChannel={() => {}} />
          <View className="   flex-1 my-2 bg-white shadow-2xl p-4 rounded-md">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center ">
                <Text className="m-2">Channel Online</Text>

                <Animated.View
                  style={{ opacity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
              </View>

              <Text className="text-gray-500">Active : 127</Text>
            </View>
            {channels.length == 0 ? (
              <Text>No Channel</Text>
            ) : (
              <View>
                {channels.map((item) => (
                  <ChannelCard channel={item.name} key={item.id} id={item.id} />
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
