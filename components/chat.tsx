import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import { router } from "expo-router";
import { Button, TextInput } from "react-native-paper";
import { Text, View } from "react-native";

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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginBottom: 10,
        }}
      >
        <TextInput
          style={{
            width: "80%",
            borderTopRightRadius: 100,
            borderTopLeftRadius: 100,
            borderBottomRightRadius: 100,
            borderBottomLeftRadius: 100,
            margin: 5,
            height: 50,
          }}
          activeUnderlineColor="transparent"
          placeholder="Message"
        />
        <Button>Send</Button>
      </View>
      <Button style={{ display: "none" }} onPress={() => navigateToAbout()}>
        To About
      </Button>
    </TabsProvider>
  );
};
