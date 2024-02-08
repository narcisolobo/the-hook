import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { FirebaseError } from "firebase/app";

import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
} from "firebase/auth";
import { auth as fbAuth, googleAuthProvider } from "@/lib/firebase";
import { createUserAndProfile } from "@/lib/firestore";
import HookUser from "@/types/types";

type UserContextType = {
  auth: User | null;
  current: HookUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  auth: null,
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

type Props = {
  children: ReactNode;
};

function UserProvider({ children }: Props) {
  const router = useRouter();
  const [auth, setAuth] = useState<User | null>(null);
  const [hookUser, setHookUser] = useState<HookUser | null>(null);

  async function signIn(email: string, password: string) {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        fbAuth,
        email,
        password,
      );
      if (userCredentials.user) {
        setAuth(userCredentials.user);
        setHookUser(
          new HookUser(
            userCredentials.user.uid,
            userCredentials.user.email as string,
            userCredentials.user.providerId,
          ),
        );
        router.push("/dashboard");
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      await fbSignOut(fbAuth);
      setAuth(null);
      setHookUser(null);
      router.push("/");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function signUp(email: string, password: string) {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        fbAuth,
        email,
        password,
      );
      if (userCredentials.user) {
        setAuth(userCredentials.user);
        const hookUser: HookUser = {
          uid: userCredentials.user.uid,
          displayName: userCredentials.user.displayName ?? undefined,
          email: userCredentials.user.email as string,
          photoURL: userCredentials.user.photoURL ?? undefined,
          providerId: userCredentials.user.providerId,
        };
        setHookUser(
          new HookUser(
            hookUser.uid,
            hookUser.email,
            hookUser.providerId,
            hookUser.displayName,
            hookUser.username,
            hookUser.photoURL,
          ),
        );
        await createUserAndProfile(hookUser);
        router.push("/dashboard");
      }
    } catch (error) {
      throw error;
    }
  }

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(fbAuth, googleAuthProvider);
      if (result.user) {
        setAuth(result.user);
        const hookUser: HookUser = {
          uid: result.user.uid,
          displayName: result.user.displayName ?? undefined,
          email: result.user.email as string,
          photoURL: result.user.photoURL ?? undefined,
          providerId: result.user.providerId,
        };
        setHookUser(
          new HookUser(
            hookUser.uid,
            hookUser.email,
            hookUser.providerId,
            hookUser.displayName,
            hookUser.username,
            hookUser.photoURL,
          ),
        );
        await createUserAndProfile(hookUser);
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      }
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fbAuth, (user) => {
      if (user) {
        setAuth(user);
        const hookUser: HookUser = {
          uid: user.uid,
          displayName: user.displayName ?? undefined,
          email: user.email as string,
          photoURL: user.photoURL ?? undefined,
          providerId: user.providerId,
        };
        setHookUser(
          new HookUser(
            hookUser.uid,
            hookUser.email,
            hookUser.providerId,
            hookUser.displayName,
            hookUser.username,
            hookUser.photoURL,
          ),
        );
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{
        auth,
        current: hookUser,
        signIn,
        signOut,
        signUp,
        signInWithGoogle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { useUser, type UserContextType };
export default UserProvider;
