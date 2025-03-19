import React, { useState, createContext, useEffect } from "react";
import { Platform } from "react-native";
import Purchases from "react-native-purchases";
import {
  public_google_play_key,
  public_apple_key,
} from "@/constants/purchases";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// @ts-ignore
import { User } from "firebase/auth";
import { useDebouncedCallback } from "use-debounce";
import app from "@/constants/firebaseConfig";

export const AuthContext = createContext({});

const debouncedTimeout = 750;

export const AuthProvider = (props: any) => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    if (Platform.OS === "ios") {
      Purchases.configure({ apiKey: public_apple_key });
    }
    if (Platform.OS === "android") {
      Purchases.configure({ apiKey: public_google_play_key });
    }
  }, []);

  const debouncedLogin = useDebouncedCallback(async (userUid: string) => {
    await Purchases.logIn(userUid);
    console.info("successfully logged in to purchases");
  }, debouncedTimeout);

  const debouncedLogout = useDebouncedCallback(async () => {
    await Purchases.logOut();
    console.info("successfully logged out of purchases");
  }, debouncedTimeout);

  const auth = getAuth(app);
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUser(user);
      if (!user.isAnonymous) {
        try {
          await debouncedLogin(user.uid);
        } catch (err) {
          console.log("error logging in to purchases", err);
        }
        return;
      }
      const appUserId = await Purchases.getAppUserID();
      const includesAnonymous = /rcanonymousid/i;
      if (includesAnonymous.test(appUserId) === false) {
        try {
          await debouncedLogout();
        } catch (err) {
          console.log("error logging out of purchases", err);
        }
      }
    } else {
      setUser(undefined);
    }
  });
  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
