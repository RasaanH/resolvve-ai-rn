import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { mockMessages } from "@/constants/MockData";
import { useState } from "react";
import { GiftedChat, Bubble, IMessage } from "react-native-gifted-chat";
import { AppColors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

const navigateToAbout = () => {
  router.navigate("/about");
};

export const Chat = () => {
  const [messageList, setMessageList] = useState(mockMessages);
  const send = (messages: IMessage[]) => {
    console.log({ messages });
    setMessageList([...messages, ...messageList]);
    /**
     * await response and block new messages
     * When message comes back - render new message list
     * Hanlde errors in catch
     */
  };
  return (
    <TabsProvider defaultIndex={0}>
      <Tabs
        style={{
          backgroundColor: AppColors.DarkGrey,
        }}
        tabLabelStyle={{
          color: "white",
        }}
        theme={{
          colors: {
            primary: AppColors.DarkNavy,
            onSurface: "white",
          },
        }}
        mode="fixed"
        disableSwipe={true}
      >
        <TabScreen label="Conservative" icon="elephant">
          <View style={styles.backgroundForChat}></View>
        </TabScreen>
        <TabScreen label="Liberal" icon="donkey">
          <View
            style={{
              backgroundColor: AppColors.DarkGrey,
              flex: 1,
              paddingTop: 15,
            }}
          >
            <GiftedChat
              messages={messageList}
              alignTop={true}
              renderDay={() => null}
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
