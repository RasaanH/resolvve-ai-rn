import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { mockMessages } from "@/constants/MockData";
import { useState } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { AppColors } from "@/constants/Colors";

const navigateToAbout = () => {
  router.navigate("/about");
};

const send = (messages: any) => {
  console.log({ messages });
};

export const Chat = () => {
  const [messageList, setMessageList] = useState(mockMessages);
  return (
    <TabsProvider defaultIndex={0}>
      <Tabs
        theme={{ colors: { primary: AppColors.DarkNavy } }}
        mode="fixed"
        disableSwipe={true}
      >
        <TabScreen label="Conservative" icon="compass">
          <View style={styles.backgroundForChat}></View>
        </TabScreen>
        <TabScreen label="Liberal" icon="bag-suitcase">
          <View style={{ backgroundColor: AppColors.DarkGrey, flex: 1 }}>
            <GiftedChat
              messages={messageList}
              renderAvatarOnTop={true}
              renderTime={() => null}
              renderBubble={(props) => {
                return (
                  <Bubble
                    {...props}
                    textStyle={{
                      right: {
                        color: "white",
                      },
                      left: {
                        color: "white",
                      },
                    }}
                    wrapperStyle={{
                      left: {
                        backgroundColor: "transparent",
                        padding: 5,
                      },
                      right: {
                        backgroundColor: AppColors.DarkNavy,
                        padding: 5,
                      },
                    }}
                  />
                );
              }}
              onSend={(messages) => send(messages)}
              user={{
                _id: 224687234,
              }}
            />
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
    // backgroundColor: "#1D3D47",
    backgroundColor: "blue",
  },
});
