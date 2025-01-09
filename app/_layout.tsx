import { PaperProvider } from "react-native-paper";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { router } from "expo-router";
import { IconButton } from "react-native-paper";
import { useState } from "react";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

export default function RootLayout() {
  const [authPageName, setAuthPageName] = useState("Sign Up");
  const auth = getAuth();
  const user = auth.currentUser;
  console.log({ user });
  onAuthStateChanged(auth, (authState) => {
    if (!auth.currentUser) {
      signInAnonymously(auth);
      return;
    }
    if (authState?.isAnonymous) {
      setAuthPageName("Sign Up");
      return;
    }
    setAuthPageName("Log Out");
    router.navigate("/");
  });
  return (
    <PaperProvider>
      <Drawer
        screenOptions={{
          drawerStyle: {},
          headerShown: true,
        }}
      >
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
            unmountOnBlur: true,
            title: authPageName,
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
