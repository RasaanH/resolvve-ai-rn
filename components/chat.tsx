import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { View, StyleSheet, Keyboard } from "react-native";
import { defaultMessage } from "@/constants/MockData";
import { useState, useRef } from "react";
import { IMessage } from "react-native-gifted-chat";
import { AppColors } from "@/constants/Colors";
import { Spaces } from "@/constants/Spacing";
import { ChatBody } from "./ChatWrapper/ChatBody";
import { ChatModes } from "./ChatWrapper/EmptyChat";
import { getFunctions, httpsCallable } from "firebase/functions";
import {
  openAiToUiMessages,
  uiToOpenAiMessages,
  getAssistantFromTabIndex,
} from "@/utility-functions/utils";
import { ChatServiceResponse } from "@/constants/Types";

const navigateToAbout = () => {
  router.navigate("/about");
};

export const Chat = () => {
  const [messageList, setMessageList] = useState(defaultMessage);
  const [tabIndex, setTabIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const thread_id = useRef("");

  const functions = getFunctions();
  const chatService = httpsCallable<any, ChatServiceResponse>(
    functions,
    "chatService"
  );

  const send = async (messages: IMessage[]) => {
    const newMessages = [...messages, ...messageList];
    setMessageList([...newMessages]);
    const newMessage = newMessages[0];
    const message = uiToOpenAiMessages([newMessage])[0];
    const assistantName = getAssistantFromTabIndex(tabIndex);
    Keyboard.dismiss();
    try {
      setIsTyping(true);
      const responseMessages = await chatService({
        assistantName,
        message,
        thread_id: thread_id.current,
      });
      const {
        data: { messages, threadId },
      } = responseMessages;
      if (messages.length === 0 && threadId === "") {
        return router.navigate("/subscription");
      }
      thread_id.current = threadId;
      console.log("data from response", JSON.stringify({ messages, threadId }));
      const newMessages = openAiToUiMessages(messages);
      setMessageList([...newMessages]);
    } catch (err) {
      console.log("something went wrong", err);
    } finally {
      setIsTyping(false);
    }
  };
  const onTabChange = (index: number) => {
    setMessageList(defaultMessage);
    thread_id.current = "";
    setTabIndex(index);
  };

  const mode = tabIndex === 0 ? ChatModes.conservative : ChatModes.liberal;

  return (
    <TabsProvider defaultIndex={tabIndex} onChangeIndex={onTabChange}>
      <Tabs
        style={{
          backgroundColor: AppColors.DarkGrey,
          marginVertical: Spaces.S,
        }}
        tabLabelStyle={{
          color: "white",
          fontSize: 16,
        }}
        tabHeaderStyle={{
          borderBottomColor: AppColors.White,
          borderBottomWidth: Spaces.Xxs,
          backgroundColor: AppColors.DarkGrey,
        }}
        theme={{
          colors: {
            primary: AppColors.DarkGrey,
            onSurface: "white",
          },
        }}
        mode="fixed"
        disableSwipe={true}
      >
        <TabScreen label="MAGA">
          <View style={styles.backgroundForChat}>
            {tabIndex === 0 && (
              <ChatBody
                isTyping={isTyping}
                messageList={messageList}
                send={send}
                mode={mode}
              />
            )}
          </View>
        </TabScreen>
        <TabScreen label="Liberal">
          <View style={styles.backgroundForChat}>
            {tabIndex === 1 && (
              <ChatBody
                isTyping={isTyping}
                messageList={messageList}
                send={send}
                mode={mode}
              />
            )}
          </View>
        </TabScreen>
      </Tabs>
      <Button style={{ display: "none" }} onPress={() => navigateToAbout()}>
        To About
      </Button>
    </TabsProvider>
  );
};

const styles = StyleSheet.create({
  messageList: {
    display: "flex",
    flexDirection: "column",
  },
  backgroundForChat: {
    backgroundColor: AppColors.DarkGrey,
    flex: 1,
    paddingVertical: 15,
  },
});
