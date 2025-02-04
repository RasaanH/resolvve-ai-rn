import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { Platform } from "react-native";

export const firebaseConfig = {
  apiKey: "AIzaSyApb9UpiAmCuH2yuDae63gnITG4gUst9-M",
  authDomain: "resolvve-ai.firebaseapp.com",
  projectId: "resolvve-ai",
  storageBucket: "resolvve-ai.appspot.com",
  messagingSenderId: "1014320675783",
  appId: "1:1014320675783:web:32d315c275550ad32f77e2",
};

const app = initializeApp(firebaseConfig);

if (Platform.OS === "ios" || Platform.OS == "android") {
  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

if (Platform.OS === "web") {
  initializeAuth(app);
}

export default app;
