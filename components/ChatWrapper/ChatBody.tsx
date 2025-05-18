import { useEffect, useState } from "react";
import { Keyboard, View, KeyboardAvoidingView, Platform } from "react-native";
import { AppColors } from "@/constants/Colors";
import {
  GiftedChat,
  Bubble,
  IMessage,
  InputToolbar,
  Send,
  MessageText,
} from "react-native-gifted-chat";
import { ChatModes, EmptyChat } from "./EmptyChat";
import Markdown from "react-native-markdown-display";
import { Text } from "react-native-paper";

import { Spaces } from "@/constants/Spacing";
import { MaterialIcons } from "@expo/vector-icons";
import Spinner from "react-native-spinkit";

export type SendFn = (messages: IMessage[]) => Promise<void>;

interface ChatBodyProps {
  messageList: IMessage[];
  send: SendFn;
  mode: ChatModes;
  isTyping: boolean;
}

const customtInputToolbar = (props: any) => {
  const iosContainerStyle = {marginBottom: 30}
  const iosTextInputStyle = {padding: 0}
  const containerStyle = {
    backgroundColor: AppColors.OffDarkGrey,
    borderWidth: 0,
    borderTopWidth: 0,
    marginTop: 5,
    paddingHorizontal: Spaces.S,
    paddingVertical: Spaces.Xxs,
    borderColor: AppColors.White,
    borderRadius: 12,
    marginHorizontal: Spaces.M,}
  const textInputStyle = {
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: "transparent",
    color: AppColors.White,
  };
  const platformContainerStyle = Platform.OS === 'ios' ? {...containerStyle, ...iosContainerStyle} : containerStyle;
  const platformTextInputStyle = Platform.OS === 'ios' ? {...textInputStyle, ...iosTextInputStyle} : textInputStyle;
  return (
    <InputToolbar
      {...props}
      containerStyle={platformContainerStyle}
      textInputStyle={platformTextInputStyle}
      placeholderTextColor={AppColors.Grey}
    />
  );
};

const renderSend = (props: any, isTyping: boolean) => {
  const iconColor = isTyping ? AppColors.Grey : AppColors.OffWhite;
  return (
    <Send
      disabled={isTyping}
      {...props}
      containerStyle={{ borderWidth: 0, paddingBottom: Spaces.S }}
    >
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
    return (
      <View
        style={{
          paddingLeft: Spaces.XL,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: Spaces.M,
        }}
      >
        <Spinner
          type="Circle"
          color={AppColors.Grey}
          size={12}
          isVisible={true}
        />
        <Text
          style={{ color: AppColors.Grey, lineHeight: 22, fontStyle: "italic" }}
        >
          Thinking
        </Text>
      </View>
    );
  };

   return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? keyboardHeight > 0 ? "height" : 'padding' : "height"}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? keyboardHeight/2 - 40: keyboardHeight / 2 + 10
      }
    >
      <GiftedChat
        messages={messageList}
        renderFooter={renderingFooter}
        placeholder="Message"
        alignTop={true}
        isKeyboardInternallyHandled={false}
        renderDay={() => null}
        renderChatEmpty={() => (
          <EmptyChat keyboardHeight={0} send={send} mode={mode} />
        )}
        renderMessageText={(props) => {
          const {
            currentMessage: { text, system, user },
          } = props;
          if (user._id === 224687234) {
            // or if user message
            return (
              <MessageText customTextStyle={{ fontSize: 16 }} {...props} />
            );
          }
          return (
            <Markdown
              style={{
                body: {
                  // color: "white",
                  fontSize: 16,
                  lineHeight: 22,
                  // backgroundColor: "green",
                  padding: 5,
                  paddingTop: 0,
                },
                paragraph: { marginTop: 0, marginBottom: 2, color: "white" },
                code_inline: {
                  color: "black",
                },
                bullet_list: { color: "white" },
                ordered_list: {
                  color: "white",
                },
                heading3: { color: "white" },
                heading4: { color: "white" },
                heading5: { color: "white" },
                heading6: { color: "white" },
                heading2: { color: "white", fontSize: 20 },
                heading1: { color: "white" },
                table: { color: "white" },
                blockquote: {
                  backgroundColor: "#2D2D2D",
                  borderRadius: 3,
                },
              }}
            >
              {text}
            </Markdown>
          );
        }}
        renderInputToolbar={(props) => customtInputToolbar(props)}
        renderSend={(props) => renderSend(props, isTyping)}
        inverted={messageList.length !== 0}
        renderAvatarOnTop={true}
        renderTime={() => null}
        // messagesContainerStyle={{
        //   display: "flex",
        //   justifyContent: "flex-start",
        //   flex: 1,
        // }}
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
                  // backgroundColor: "purple",
                  alignSelf: "stretch",
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingBottom: 5,
                  paddingTop: 3,
                },
                right: {
                  backgroundColor: AppColors.OffWhite,
                  padding: 5,
                  marginBottom: 1,
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
