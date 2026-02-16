import schema from "@/instant.schema";
import { init } from "@instantdb/react-native";

// ID for app: real-time-chat-app
const APP_ID = process.env.EXPO_PUBLIC_INSTANT_APP_ID;

if (!APP_ID) {
  throw new Error("no app id");
}
export const db = init({ appId: APP_ID, schema });
