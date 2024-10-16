import { PaperProvider } from "react-native-paper";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { router } from "expo-router";
import { IconButton } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Drawer
        screenOptions={{
          drawerStyle: {
            width: "20%",
          },
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
            drawerLabel: "Sign Up",
            title: "Sign Up",
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
