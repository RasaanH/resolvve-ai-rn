import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import { useEffect } from "react";
import { Button, Portal, Modal, Text } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { View, StyleSheet, Keyboard } from "react-native";
import { defaultMessage } from "@/constants/MockData";
import { useState, useRef, useCallback } from "react";
import { useFocusEffect, router } from "expo-router";
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
  const [modalButtonText, setModalButtonText] = useState("Sign In");
  const anonBodyMessage =
    "Sign in and subscribe to BalanceGPT Plus to continue.";
  const signedInBodyMessage = "Subscribe to BalanceGPT Plus to continue.";
  const [modalBodyText, setModalBodyText] = useState(anonBodyMessage);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: Spaces.M,
    justifyContent: "space-between",
    gap: 26,
  };

  const thread_id = useRef("");
  const tabRef = useRef(0);

  const functions = getFunctions();
  const chatService = httpsCallable<any, ChatServiceResponse>(
    functions,
    "chatService"
  );

  useFocusEffect(
    // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
    useCallback(() => {
      setMessageList(defaultMessage);
      thread_id.current = "";
      // Return function is invoked whenever the route gets out of focus.
      return () => {};
    }, [])
  );

  const send = async (messages: IMessage[]) => {
    const originalTabRef = Number(tabRef.current);
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
        showModal();
        return;
      }
      if (originalTabRef !== tabRef.current) {
        console.log("user changed tabs before response, ending early");
        return;
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
    tabRef.current = index;
    setIsTyping(false);
  };

  const handleModalButtonPress = () => {
    const route = modalButtonText === "Sign In" ? "/signup" : "/subscription";
    hideModal();
    router.navigate(route);
  };

  const mode = tabIndex === 0 ? ChatModes.conservative : ChatModes.liberal;

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user?.isAnonymous === false) {
      setModalButtonText("Subscribe");
      setModalBodyText(signedInBodyMessage);
    }
  }, [user]);

  return (
    <TabsProvider defaultIndex={tabIndex} onChangeIndex={onTabChange}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          dismissable={true}
          contentContainerStyle={containerStyle}
        >
          <Text variant="headlineSmall">Max free usage reached</Text>
          <Text variant="bodyLarge">{modalBodyText}.</Text>
          <Button
            buttonColor={AppColors.PaywallBlue}
            mode="contained"
            style={{
              borderRadius: Spaces.M,
              paddingVertical: Spaces.Xs,
              paddingHorizontal: Spaces.M,
            }}
            onPress={handleModalButtonPress}
          >
            {modalButtonText}
          </Button>
        </Modal>
      </Portal>
      <Tabs
        style={{
          backgroundColor: AppColors.DarkGrey,
          marginVertical: Spaces.Xs,
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
