import { useEffect, useState } from "react";
import { Keyboard, View, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { AppColors } from "@/constants/Colors";
import { Button, Portal, Modal, Text } from "react-native-paper";
import { getAuth } from "firebase/auth";
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
        paddingHorizontal: Spaces.S,
        paddingVertical: Spaces.Xs,
        borderRadius: 8,
        marginHorizontal: Spaces.M,
      }}
    />
  );
};

const renderSend = (props: any, isTyping: boolean) => {
  const iconColor = isTyping ? AppColors.Grey : AppColors.Black;
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
  const [modalButtonText, setModalButtonText] = useState("Sign In");
  const [visible, setVisible] = useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    height: "40%",
    borderRadius: Spaces.M,
    justifyContent: "space-between",
  };

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

  const handleModalButtonPress = () => {
    const route = modalButtonText === "Sign In" ? "/signup" : "/subscription";
    hideModal();
    router.navigate(route);
  };

  const auth = getAuth();
  const user = auth.currentUser;

  if (user?.isAnonymous === false) {
    setModalButtonText("Subscribe");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? 0 : keyboardHeight / 2 + 10
      }
    >
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          dismissable={true}
          contentContainerStyle={containerStyle}
        >
          <Text>Example Modal. Click outside this area to dismiss.</Text>
          <Button
            buttonColor={AppColors.PaywallBlue}
            mode="contained"
            onPress={handleModalButtonPress}
          >
            {modalButtonText}
          </Button>
        </Modal>
      </Portal>
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
