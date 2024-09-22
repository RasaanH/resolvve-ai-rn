import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { Text } from "react-native";

const navigateToAbout = () => {
  router.navigate("/about");
};

export const Chat = () => {
  return (
    <TabsProvider defaultIndex={0}>
      <Tabs mode="fixed" disableSwipe={true}>
        <TabScreen label="Conservative" icon="compass">
          <Text>Hello! I'm a Conservative</Text>
        </TabScreen>
        <TabScreen label="Liberal" icon="bag-suitcase">
          <Text>Hello! I'm a Liberal</Text>
        </TabScreen>
      </Tabs>
      <Button onPress={() => navigateToAbout()}>To About</Button>
    </TabsProvider>
  );
};
