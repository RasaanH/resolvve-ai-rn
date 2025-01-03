import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { View, StyleSheet, Keyboard } from "react-native";
import { defaultMessage } from "@/constants/MockData";
import { useState } from "react";
import { IMessage } from "react-native-gifted-chat";
import { AppColors } from "@/constants/Colors";
import { Spaces } from "@/constants/Spacing";
import { ChatBody } from "./ChatWrapper/ChatBody";
import { ChatModes } from "./ChatWrapper/EmptyChat";
import { getFunctions, httpsCallable } from "firebase/functions";
import { openAiToUiMessages } from "@/utility-functions/utils";

const navigateToAbout = () => {
  router.navigate("/about");
};

export const Chat = () => {
  const [messageList, setMessageList] = useState(defaultMessage);
  const [tabIndex, setTabIndex] = useState(0);

  const functions = getFunctions();
  const chatService = httpsCallable<any, any[]>(functions, "chatService");

  const send = async (messages: IMessage[]) => {
    const newMessages = [...messages, ...messageList];
    setMessageList([...newMessages]);
    Keyboard.dismiss();
    try {
      const responseMessages = await chatService({
        assistantName: "conservative",
        message: { role: "user", content: "Who is your favorite president?" },
      });
      const { data } = responseMessages;

      console.log("data from response", JSON.stringify(data));
      const newMessages = openAiToUiMessages(data);
      setMessageList([...newMessages]);
    } catch (err) {
      console.log("something went wrong", err);
    }
  };
  const onTabChange = (index: number) => {
    setMessageList(defaultMessage);

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
          fontSize: 15,
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
        <TabScreen label="Conservative" icon="elephant">
          <View style={styles.backgroundForChat}>
            {tabIndex === 0 && (
              <ChatBody messageList={messageList} send={send} mode={mode} />
            )}
          </View>
        </TabScreen>
        <TabScreen label="Liberal" icon="donkey">
          <View style={styles.backgroundForChat}>
            {tabIndex === 1 && (
              <ChatBody messageList={messageList} send={send} mode={mode} />
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
