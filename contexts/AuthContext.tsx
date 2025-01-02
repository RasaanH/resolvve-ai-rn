import React, { useState, createContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// @ts-ignore
import { User } from "firebase/auth";
import app from "@/constants/firebaseConfig";

export const AuthContext = createContext({});

export const AuthProvider = (props: any) => {
  const [user, setUser] = useState<User>();
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      console.log("At this point, there is no user");
      setUser(undefined);
    }
  });
  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
