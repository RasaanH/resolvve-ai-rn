import { useEffect, useState } from "react";
import { Keyboard, View, KeyboardAvoidingView, Platform } from "react-native";
import { AppColors } from "@/constants/Colors";
import { GiftedChat, Bubble, IMessage } from "react-native-gifted-chat";
import { ChatModes, EmptyChat } from "./EmptyChat";
import { InputToolbar, Send } from "react-native-gifted-chat";
import { Spaces } from "@/constants/Spacing";
import { MaterialIcons } from "@expo/vector-icons";
import { TypingIndicator } from "../TypingIndicator";

export type SendFn = (messages: IMessage[]) => Promise<void>;

interface ChatBodyProps {
  messageList: IMessage[];
  send: SendFn;
  mode: ChatModes;
  isTyping: boolean;
}

const customtInputToolbar = (props: any) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "white",
        borderTopColor: "#E8E8E8",
        borderTopWidth: 1,
        padding: Spaces.S,
        borderRadius: 8,
        marginHorizontal: Spaces.M,
      }}
    />
  );
};

const renderSend = (props: any, isTyping: boolean) => {
  const iconColor = isTyping ? AppColors.Grey : AppColors.Black;
  return (
    <Send disabled={isTyping} {...props}>
      <View
        style={{
          marginBottom: 5,
          marginRight: 5,
        }}
      >
        <MaterialIcons size={25} color={iconColor} name="send" />
      </View>
    </Send>
  );
};

export const ChatBody = ({
  messageList,
  mode,
  send,
  isTyping,
}: ChatBodyProps) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const renderingFooter = () => {
    if (!isTyping) {
      return <View style={{ display: "none" }}></View>;
    }
    return <TypingIndicator />;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? 0 : keyboardHeight / 2 + 15
      }
    >
      <GiftedChat
        messages={messageList}
        renderFooter={renderingFooter}
        placeholder="Message"
        alignTop={true}
        renderDay={() => null}
        renderChatEmpty={() => (
          <EmptyChat keyboardHeight={0} send={send} mode={mode} />
        )}
        renderInputToolbar={(props) => customtInputToolbar(props)}
        renderSend={(props) => renderSend(props, isTyping)}
        inverted={messageList.length !== 0}
        renderAvatarOnTop={true}
        renderTime={() => null}
        listViewProps={{
          contentContainerStyle: {
            flexGrow: 1,
            justifyContent: "flex-start",
            paddingBottom: 0,
          },
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: AppColors.Black,
                },
                left: {
                  color: "white",
                  paddingTop: 0,
                  marginTop: 0,
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: "transparent",
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingBottom: 5,
                  paddingTop: 0,
                },
                right: {
                  backgroundColor: AppColors.LightGrey,
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
    </KeyboardAvoidingView>
  );
};
