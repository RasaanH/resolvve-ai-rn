import { View, Image, StyleSheet } from "react-native";
import { AppColors } from "@/constants/Colors";
import { Spaces } from "@/constants/Spacing";
import { Button } from "react-native-paper";
import { router } from "expo-router";
import { useCallback, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useFocusEffect } from "expo-router";
import { getAuth } from "firebase/auth";
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
  const context = useContext(AuthContext);
  useFocusEffect(
    // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
    useCallback(() => {
      const auth = getAuth();
      console.log({ context });
      const managementUrl = context?.purchasesCustomerInfo?.managementUrl || "";
      const activeSubscriptions =
        context?.purchasesCustomerInfo?.activeSubscriptions || [];
      console.log({
        managementUrl,
        activeSubscriptions,
      });
      const user = auth.currentUser;
      if (user?.isAnonymous) {
        router.navigate("/signup");
        return;
      }
      if (activeSubscriptions.length > 0) {
        // later if we have more sub products we could check the specific entitlement
        console.log("has active plus subscription");
        return;
      }
      presentPaywall();
      router.navigate("/");
      return () => {};
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.image}
        source={require("../assets/images/Paywall.png")}
      /> */}
      <Button
        style={styles.button}
        labelStyle={styles.buttonContent}
        textColor={AppColors.White}
        buttonColor={AppColors.DarkNavy}
        mode="elevated"
      >
        Fake button
      </Button>
      <Button
        style={styles.button}
        labelStyle={styles.buttonContent}
        textColor={AppColors.White}
        buttonColor={AppColors.Danger}
        mode="elevated"
      >
        Cancel Subscription
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  image: {
    resizeMode: "contain",
    width: "80%",
    marginBottom: Spaces.M,
  },
  button: {
    margin: Spaces.M,
    borderRadius: Spaces.S,
    padding: Spaces.S,
    zIndex: 500,
  },
  buttonContent: {
    fontSize: 16,
  },
});
