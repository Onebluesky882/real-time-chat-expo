import { db } from "@/utils/instanddb";
import { id } from "@instantdb/react-native";

export default async function createChannel(name: string) {
  const channelId = id();

  const trimmedName = name.trim();

  if (!trimmedName) return;
  await db.transact([
    db.tx.channels[channelId].update({
      name,
    }),
  ]);

  return channelId;
}
