import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

import HookUser from "@/types/types";

async function createUserAndProfile(user: HookUser) {
  try {
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      displayName: user.displayName ?? "",
      email: user.email,
      photoUrl:
        user.photoURL ??
        "https://ik.imagekit.io/cisocodes/the-hook/the-hook-logo-on-white",
      providerId: user.providerId,
    });
    await addDoc(collection(db, "profiles"), {
      uid: user.uid,
      username: user.username,
    });
  } catch (error) {
    throw error;
  }
}

export { createUserAndProfile };
