import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { mockMessages } from "@/constants/MockData";
import { useState } from "react";
import { GiftedChat, Bubble, IMessage } from "react-native-gifted-chat";
import { AppColors } from "@/constants/Colors";
import { mockChatCall } from "@/utility-functions/utils";

const navigateToAbout = () => {
  router.navigate("/about");
};

export const Chat = () => {
  const [messageList, setMessageList] = useState(mockMessages);
  const send = async (messages: IMessage[]) => {
    const newMessages = [...messages, ...messageList];
    setMessageList([...newMessages]);
    try {
      const responseMessages = await mockChatCall([...newMessages]);
      setMessageList([...responseMessages]);
    } catch (err) {
      console.log("something went wrong", err);
      return [...newMessages];
    }
  };
  const onTabChange = () => {
    setMessageList([]);
  };
  return (
    <TabsProvider defaultIndex={0} onChangeIndex={onTabChange}>
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
          <View style={styles.backgroundForChat}>
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
        <TabScreen label="Liberal" icon="donkey">
          <View style={styles.backgroundForChat}>
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
    backgroundColor: AppColors.DarkGrey,
    flex: 1,
    paddingTop: 15,
  },
});
