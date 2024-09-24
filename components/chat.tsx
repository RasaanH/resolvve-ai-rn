import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { View } from "react-native";
import { MessageInput } from "./messageInput";
import { mockMessages } from "@/constants/MockData";
import { useState } from "react";
import { Message as MessageType } from "@/constants/Types";
import { v4 as uuidv4 } from "uuid";
import { Message } from "./message";

const navigateToAbout = () => {
  router.navigate("/about");
};

export const Chat = () => {
  const [messageList, setMessageList] = useState(mockMessages);
  const messageListJSX = messageList.map((message: MessageType) => {
    const key = uuidv4();
    return (
      <Message
        key={key}
        messageText={message?.messageText}
        userMessage={message?.userMessage}
      />
    );
  });
  return (
    <TabsProvider defaultIndex={0}>
      <Tabs mode="fixed" disableSwipe={true}>
        <TabScreen label="Conservative" icon="compass">
          <View>{messageListJSX}</View>
        </TabScreen>
        <TabScreen label="Liberal" icon="bag-suitcase">
          <View>{messageListJSX}</View>
        </TabScreen>
      </Tabs>
      <MessageInput />
      <Button style={{ display: "none" }} onPress={() => navigateToAbout()}>
        To About
      </Button>
    </TabsProvider>
  );
};
