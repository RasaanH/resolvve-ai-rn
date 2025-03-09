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
import app from "@/constants/firebaseConfig";

export const AuthContext = createContext({});

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

  const auth = getAuth(app);
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUser(user);
      if (!user.isAnonymous) {
        try {
          await Purchases.logIn(user.uid);
          console.info("successful login");
        } catch (err) {
          console.log("error logging in to purchases", err);
        }
      }
    } else {
      setUser(undefined);
      try {
        await Purchases.logOut();
        console.info("successful logout");
      } catch (err) {
        console.log("error logging out of purchases", err);
      }
    }
  });
  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
