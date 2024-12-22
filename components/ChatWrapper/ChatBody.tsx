import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { AppColors } from "@/constants/Colors";
import { GiftedChat, Bubble, IMessage } from "react-native-gifted-chat";
import { ChatModes, EmptyChat } from "./EmptyChat";

export type SendFn = (messages: IMessage[]) => Promise<void>;

interface ChatBodyProps {
  messageList: IMessage[];
  send: SendFn;
  mode: ChatModes;
}

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
  );
};
