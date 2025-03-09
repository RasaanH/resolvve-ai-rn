import { router } from "expo-router";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { View } from "react-native";

export default function RedirectHome() {
  useFocusEffect(
    // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
    useCallback(() => {
      router.navigate("/");
      // Return function is invoked whenever the route gets out of focus.
      return () => {};
    }, [])
  );
  return <View></View>;
}
