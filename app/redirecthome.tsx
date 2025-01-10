import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function RedirectHome() {
  useEffect(() => {
    router.navigate("/");
  }, []);
  return <View></View>;
}
