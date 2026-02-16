import { db } from "@/utils/instanddb";
import { Redirect } from "expo-router";

export default function Index() {
  return (
    <>
      <db.SignedIn>
        <Redirect href="/(app)" />
      </db.SignedIn>

      <db.SignedOut>
        <Redirect href="/(auth)" />
      </db.SignedOut>
    </>
  );
}
