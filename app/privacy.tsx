import { View, Linking } from "react-native";
import { router } from "expo-router";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { balanceGptPrivacyLink } from "@/constants/generalConstants";

export default function Privacy() {
  useFocusEffect(
    // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
    useCallback(() => {
      Linking.openURL(balanceGptPrivacyLink).catch((err) =>
        console.error("An error occurred", err)
      );
      router.navigate("/");
      return () => {};
    }, [])
  );

  return <View></View>;
}
