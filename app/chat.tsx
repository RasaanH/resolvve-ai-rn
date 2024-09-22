import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import { Text } from "react-native";

export const Chat = () => {
  return (
    <TabsProvider defaultIndex={0}>
      <Tabs>
        <TabScreen label="Conservative" icon="compass">
          <Text>Hello! I'm a Conservative</Text>
        </TabScreen>
        <TabScreen label="Liberal" icon="bag-suitcase">
          <Text>Hello! I'm a Liberal</Text>
        </TabScreen>
      </Tabs>
    </TabsProvider>
  );
};
