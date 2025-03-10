import { View } from "react-native";
import { router } from "expo-router";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";

const presentPaywallIfNeeded = async () => {
  try {
    // Present paywall for current offering:
    const paywallResult: PAYWALL_RESULT =
      await RevenueCatUI.presentPaywallIfNeeded({
        requiredEntitlementIdentifier: "pro",
      });
    console.log(paywallResult);
    return paywallResult;
  } catch (err) {
    console.log("error presenting paywall", err);
  }
};

const presentPaywall = async () => {
  // Present paywall for current offering:
  const paywallResult = await RevenueCatUI.presentPaywall();
  // or if you need to present a specific offering:

  switch (paywallResult) {
    case PAYWALL_RESULT.NOT_PRESENTED:
    case PAYWALL_RESULT.ERROR:
    case PAYWALL_RESULT.CANCELLED:
      return false;
    case PAYWALL_RESULT.PURCHASED:
    case PAYWALL_RESULT.RESTORED:
      return true;
    default:
      return false;
  }
};

export default function Subscription() {
  useFocusEffect(
    // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
    useCallback(() => {
      presentPaywall();
      router.navigate("/");

      return () => {};
    }, [])
  );

  return <View></View>;
}
