import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { SendFn } from "./ChatBody";
import { AppColors } from "@/constants/Colors";
import { Spaces } from "@/constants/Spacing";
interface PromptBubbleProps {
  text: string;
  onClick: SendFn;
}
export const PromptBubble = ({ text, onClick }: PromptBubbleProps) => (
  <Button
    mode="elevated"
    textColor={AppColors.Black}
    style={styles.buttonContainer}
    labelStyle={styles.buttonLabel}
  >
    {text}
  </Button>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    borderWidth: 3,
    borderRadius: 100,
    backgroundColor: AppColors.White,
    margin: Spaces.S,
    color: AppColors.Black,
    padding: 0,
  },
  buttonLabel: {
    padding: 0,
    marginVertical: Spaces.S,
    marginHorizontal: Spaces.L,
  },
});
