import { Tabs } from "expo-router"; // ✅ เปลี่ยนจาก Stack เป็น Tabs

export default function _layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="[channel]" options={{ title: "Home" }} />
    </Tabs>
  );
}
