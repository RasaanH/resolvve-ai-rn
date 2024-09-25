import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#262222",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen options={{ headerTitle: "About" }} name="about" />
        <Stack.Screen
          options={{
            headerTitle: "BalanceGPT",
            headerTitleStyle: {
              color: "white",
            },
          }}
          name="index"
        />
      </Stack>
    </PaperProvider>
  );
}
