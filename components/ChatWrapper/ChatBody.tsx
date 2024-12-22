import { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import { AppColors } from "@/constants/Colors";
import { GiftedChat, Bubble, IMessage } from "react-native-gifted-chat";
import { ChatModes, EmptyChat } from "./EmptyChat";
import { InputToolbar, Send } from "react-native-gifted-chat";
import { Spaces } from "@/constants/Spacing";
import { MaterialIcons } from "@expo/vector-icons";

export type SendFn = (messages: IMessage[]) => Promise<void>;

interface ChatBodyProps {
  messageList: IMessage[];
  send: SendFn;
  mode: ChatModes;
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

const renderSend = (props: any) => {
  return (
    <Send {...props}>
      <View
        style={{
          marginBottom: 5,
          marginRight: 5,
        }}
      >
        <MaterialIcons size={25} color={AppColors.Black} name="send" />
      </View>
    </Send>
  );
};

export const ChatBody = ({ messageList, mode, send }: ChatBodyProps) => {
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

  return (
    <GiftedChat
      messages={messageList}
      placeholder="Message"
      alignTop={true}
      renderDay={() => null}
      renderChatEmpty={() => (
        <EmptyChat keyboardHeight={keyboardHeight} send={send} mode={mode} />
      )}
      renderInputToolbar={(props) => customtInputToolbar(props)}
      renderSend={(props) => renderSend(props)}
      inverted={messageList.length !== 0}
      renderAvatarOnTop={true}
      renderTime={() => null}
      listViewProps={{
        contentContainerStyle: {
          flexGrow: 1,
          justifyContent: "flex-start",
          paddingBottom: keyboardHeight,
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
              },
            }}
            wrapperStyle={{
              left: {
                backgroundColor: "transparent",
                padding: 5,
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
  );
};
