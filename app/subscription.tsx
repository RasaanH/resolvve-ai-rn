import { View, Image, StyleSheet, Linking } from "react-native";
import { balanceGptPrivacyLink } from "@/constants/generalConstants";
import { AppColors } from "@/constants/Colors";
import { Spaces } from "@/constants/Spacing";
import { Button, Text } from "react-native-paper";
import { router } from "expo-router";
import { useCallback, useContext, useRef, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useFocusEffect } from "expo-router";
import { getAuth } from "firebase/auth";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";
import Purchases from "react-native-purchases";

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
  const userUid = context?.user?.uid;
  const [loadingCustomerInfo, setLoadingCustomerInfo] = useState(false);
  const managementUrlRef = useRef("");
  const openLink = () => {
    const url = managementUrlRef.current || balanceGptPrivacyLink;
    console.log("cancel URl", url);
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
    router.navigate("/");
  };
  const getLatestCustomerInfo = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user?.isAnonymous) {
        router.navigate("/signup");
        return;
      }
      setLoadingCustomerInfo(true);
      const latestPurchaseCustomerInfo = await Purchases.getCustomerInfo();
      console.log("latestPurchaseCustomerInfo", latestPurchaseCustomerInfo);
      const managementUrl = latestPurchaseCustomerInfo?.managementURL || "";
      managementUrlRef.current = managementUrl;
      const activeSubscriptions =
        latestPurchaseCustomerInfo?.activeSubscriptions || [];
      console.log({
        managementUrl,
        activeSubscriptions,
      });
      if (activeSubscriptions.length > 0) {
        // later if we have more sub products we could check the specific entitlement
        console.log("has active plus subscription");
        return;
      }
      setLoadingCustomerInfo(false);
      presentPaywall();
      router.navigate("/");
    } catch (err) {
      console.error("Error getting latest customer info", err);
      setLoadingCustomerInfo(false);
    }
  };
  useFocusEffect(
    // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
    useCallback(() => {
      getLatestCustomerInfo();
      return () => {};
    }, [userUid])
  );

  if (loadingCustomerInfo) {
    return <View style={styles.greyBackground}></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/Paywall.png")}
        />
      </View>
      <View style={styles.bottomPortion}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText} variant="headlineSmall">
            You are currently subscribed!
          </Text>
          <Text variant="bodyLarge">
            If you would like to cancel your subscription, push the button
            below. You will retain Plus benefits until the end of the pay
            period.
          </Text>
        </View>

        <Button
          style={styles.button}
          labelStyle={styles.buttonContent}
          textColor={AppColors.White}
          buttonColor={AppColors.Danger}
          mode="elevated"
          onPress={openLink}
        >
          Cancel Subscription
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  greyBackground: {
    backgroundColor: AppColors.DarkGrey,
    flex: 1,
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    flex: 1.5,
  },
  textContainer: {
    justifyContent: "space-between",
  },
  button: {
    borderRadius: Spaces.S,
    padding: Spaces.S,
    zIndex: 500,
  },
  buttonContent: {
    fontSize: 16,
  },
  headerText: {
    fontWeight: 700,
    marginBottom: Spaces.M,
    marginTop: Spaces.Xs,
  },
  bottomPortion: {
    justifyContent: "space-between",
    margin: Spaces.L,
    marginTop: Spaces.Xs,
    flex: 1,
  },
});
