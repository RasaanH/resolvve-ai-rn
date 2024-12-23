import { AppColors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import { Spaces } from "@/constants/Spacing";
import { SendFn } from "./ChatBody";
import { conservativePrompts, liberalPrompts } from "./ChatConstants";
import { PromptBubble } from "./PromptBubble";
import { Text } from "react-native-paper";

export enum ChatModes {
  liberal = "liberal",
  conservative = "conservative",
}
interface EmptyChatProps {
  mode: ChatModes;
  send: SendFn;
  keyboardHeight: number;
}

export const EmptyChat = ({
  mode = ChatModes.conservative,
  send,
  keyboardHeight,
}: EmptyChatProps) => {
  const prompts =
    mode === ChatModes.conservative ? conservativePrompts : liberalPrompts;

  const promptBubbles = prompts.map((prompt) => (
    <PromptBubble key={prompt} text={prompt} onClick={send} />
  ));

  return (
    <View style={{ ...styles.container, paddingBottom: 40 + keyboardHeight }}>
      <Text style={styles.text}>Let's Talk</Text>
      <View style={styles.promptBublesContainer}>{promptBubbles}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  promptBublesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Spaces.XL,
    transform: [{ scaleY: -1 }],
    marginHorizontal: 20,
  },
  text: {
    color: AppColors.White,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scaleY: -1 }],
    textAlign: "center",
    fontSize: 27,
  },
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    justifyContent: "center",
  },
});
