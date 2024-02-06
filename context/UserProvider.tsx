import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { FirebaseError } from "firebase/app";

import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
} from "firebase/auth";
import { auth, googleAuthProvider } from "@/lib/firebase";
import { createUser } from "@/lib/firestore";
import { HookUser } from "@/types/types";

type UserContextType = {
  current: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  current: null,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
  signInWithGoogle: async () => {},
});

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider.");
  }
  return context;
}

interface Props {
  children: ReactNode;
}

function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  async function signIn(email: string, password: string) {
    console.log("🚀 ~ signIn");
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (userCredentials.user) {
        setUser(userCredentials.user);
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      await fbSignOut(auth);
      setUser(null);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function signUp(email: string, password: string) {
    console.log("🚀 ~ signUp");
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (userCredentials.user) {
        setUser(userCredentials.user);
        const hookUser: HookUser = {
          uid: userCredentials.user.uid,
          displayName: userCredentials.user.displayName ?? undefined,
          email: userCredentials.user.email as string,
          photoURL: userCredentials.user.photoURL ?? undefined,
          providerId: userCredentials.user.providerId,
        };
        await createUser(hookUser);
      }
    } catch (error) {
      throw error;
    }
  }

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      if (result.user) {
        setUser(result.user);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{ current: user, signIn, signOut, signUp, signInWithGoogle }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { useUser, type UserContextType };
export default UserProvider;
