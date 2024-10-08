import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { CustomNavigationBar } from "@/components/CustomNavigationBar";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack
        initialRouteName="/"
        screenOptions={{
          header: (props: any) => <CustomNavigationBar {...props} />,
          headerStyle: {
            backgroundColor: "#262222",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          options={{
            headerTitle: "BalanceGPT",
            headerTitleStyle: {
              color: "white",
            },
          }}
          name="index"
        />
        <Stack.Screen options={{ headerTitle: "About" }} name="about" />
        <Stack.Screen options={{ headerTitle: "Sign Up" }} name="signup" />
      </Stack>
    </PaperProvider>
  );
}
