import { Chat } from "../components/chat";
import { initializeApp, getApps } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
} from "firebase/auth";
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

if (getApps().length === 0) {
  initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

const auth = getAuth();
// move this stuff into an auth context
if (!auth.currentUser?.uid) {
  signInAnonymously(auth)
    .then((credentials) => {
      console.log("anonymous auth credentials", credentials);
    })
    .catch((err) => {
      console.log("error signing in anonymously.", err);
    });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    const { uid } = user;
    console.log("successful signin");
    // ...
  } else {
    console.log("At this point, there is no user");
  }
});

export default function Index({ navigation }: any) {
  return <Chat />;
}
