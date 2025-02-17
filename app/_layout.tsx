import { PaperProvider } from "react-native-paper";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { router } from "expo-router";
import { IconButton } from "react-native-paper";
import { useRef, useState } from "react";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

export default function RootLayout() {
  const signUpText = "Sign Up / Login";
  const logoutText = "Log Out";
  const isSigningInAnonymously = useRef(false);
  const [authPageName, setAuthPageName] = useState(signUpText);
  const auth = getAuth();

  const user = auth.currentUser;
  onAuthStateChanged(auth, async (authState) => {
    if (!auth.currentUser && isSigningInAnonymously.current === false) {
      isSigningInAnonymously.current = true;
      await signInAnonymously(auth);
      isSigningInAnonymously.current = false;
      return;
    }
    if (authState?.isAnonymous) {
      setAuthPageName(signUpText);
      return;
    }
    setAuthPageName(logoutText);
    router.navigate("/");
  });
  return (
    <PaperProvider>
      <Drawer
        screenOptions={{
          drawerStyle: {},
          drawerLabelStyle: { fontSize: 16 },
          headerShown: true,
        }}
      >
        <Drawer.Screen
          name="redirecthome"
          options={{
            drawerLabel: "Reset Chat",
            title: "Reset Chat",
            headerLeft: () => (
              <IconButton
                icon="keyboard-backspace"
                size={25}
                iconColor="black"
                onPress={() => router.navigate("/")}
              />
            ),
            swipeEdgeWidth: 0,
          }}
        />
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Balance GPT",
            title: "BalanceGPT",
            headerLeft: () => <DrawerToggleButton />,
            swipeEdgeWidth: 0,
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="subscription"
          options={{
            drawerLabel: "Subscription",
            title: "Subscription",
            headerLeft: () => (
              <IconButton
                icon="keyboard-backspace"
                size={25}
                iconColor="black"
                onPress={() => router.navigate("/")}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: "About",
            title: "About",
            headerLeft: () => (
              <IconButton
                icon="keyboard-backspace"
                size={25}
                iconColor="black"
                onPress={() => router.navigate("/")}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="signup"
          options={{
            drawerLabel: authPageName,
            title: "Authentication",
            headerLeft: () => (
              <IconButton
                icon="keyboard-backspace"
                size={25}
                iconColor="black"
                onPress={() => router.navigate("/")}
              />
            ),
          }}
        />
      </Drawer>
    </PaperProvider>
  );
}
