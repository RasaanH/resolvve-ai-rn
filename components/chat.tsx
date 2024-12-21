import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { View, StyleSheet, Keyboard } from "react-native";
import { mockMessages } from "@/constants/MockData";
import { useState, useEffect } from "react";
import { GiftedChat, Bubble, IMessage } from "react-native-gifted-chat";
import { AppColors } from "@/constants/Colors";
import { Spaces } from "@/constants/Spacing";
import { mockChatCall } from "@/utility-functions/utils";
import { ChatBody } from "./ChatWrapper/ChatBody";

const navigateToAbout = () => {
  router.navigate("/about");
};

export const Chat = () => {
  const [messageList, setMessageList] = useState(mockMessages);
  const [tabIndex, setTabIndex] = useState(0);

  const send = async (messages: IMessage[]) => {
    const newMessages = [...messages, ...messageList];
    setMessageList([...newMessages]);
    Keyboard.dismiss();
    try {
      const responseMessages = await mockChatCall([...newMessages]);
      setMessageList([...responseMessages]);
    } catch (err) {
      console.log("something went wrong", err);
    }
  };
  const onTabChange = (index: number) => {
    if (messageList !== mockMessages) {
      setMessageList([]);
    }
    setTabIndex(index);
  };
  return (
    <TabsProvider defaultIndex={tabIndex} onChangeIndex={onTabChange}>
      <Tabs
        style={{
          backgroundColor: AppColors.DarkGrey,
          borderBottomColor: AppColors.White,
          borderBottomWidth: Spaces.Xxs,
        }}
        tabLabelStyle={{
          color: "white",
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
              <ChatBody messageList={messageList} send={send} />
            )}
          </View>
        </TabScreen>
        <TabScreen label="Liberal" icon="donkey">
          <View style={styles.backgroundForChat}>
            {tabIndex === 1 && (
              <ChatBody messageList={messageList} send={send} />
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
    paddingTop: 15,
  },
});
