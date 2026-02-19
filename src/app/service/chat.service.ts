import { db } from "@/utils/instanddb";
import { id } from "@instantdb/react-native";

export default async function sendMessage(
  text: string,
  profileId: string,
  channelId: string,
) {
  if (!text.trim()) return;

  db.transact([
    db.tx.messages[id()]
      .update({
        content: text.trim(),
        timestamp: Date.now(),
      })
      .link({
        author: profileId,
        channel: channelId,
      }),
  ]);
}

