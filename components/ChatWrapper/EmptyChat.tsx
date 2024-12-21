import { AppColors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import { Spaces } from "@/constants/Spacing";
import { SendFn } from "./ChatBody";
import { conservativePrompts, liberalPrompts } from "./ChatConstants";
import { PromptBubble } from "./PromptBubble";

export enum ChatModes {
  liberal = "liberal",
  conservative = "conservative",
}
interface EmptyChatProps {
  mode: ChatModes;
  send: SendFn;
}

export const EmptyChat = ({
  mode = ChatModes.conservative,
  send,
}: EmptyChatProps) => {
  const prompts =
    mode === ChatModes.conservative ? conservativePrompts : liberalPrompts;

  const promptBubbles = prompts.map((prompt) => (
    <PromptBubble key={prompt} text={prompt} onClick={send} />
  ));

  return <View style={styles.textContainer}>{promptBubbles}</View>;
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingTop: Spaces.XL,
    transform: [{ scaleY: -1 }],
  },
});
