import { Chat } from "../components/chat";
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth } from "firebase/auth";
// @ts-ignore
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyApb9UpiAmCuH2yuDae63gnITG4gUst9-M",
  authDomain: "resolvve-ai.firebaseapp.com",
  projectId: "resolvve-ai",
  storageBucket: "resolvve-ai.appspot.com",
  messagingSenderId: "1014320675783",
  appId: "1:1014320675783:web:32d315c275550ad32f77e2",
});
let auth;
if (!auth) {
  auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

export default function Index({ navigation }: any) {
  return <Chat />;
}
