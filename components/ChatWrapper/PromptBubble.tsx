import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { SendFn } from "./ChatBody";
import { AppColors } from "@/constants/Colors";
import { Spaces } from "@/constants/Spacing";
import { regularUser } from "@/constants/MockData";
interface PromptBubbleProps {
  text: string;
  onClick: SendFn;
}
export const PromptBubble = ({ text, onClick }: PromptBubbleProps) => (
  <Button
    mode="outlined"
    textColor={AppColors.Black}
    style={styles.buttonContainer}
    labelStyle={styles.buttonLabel}
    onPress={() =>
      onClick([
        {
          _id: 2246872341,
          text: text,
          createdAt: new Date(),
          user: regularUser,
        },
      ])
    }
  >
    {text}
  </Button>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    margin: Spaces.S,
    color: AppColors.White,
    padding: 0,
  },
  buttonLabel: {
    padding: 0,
    color: AppColors.White,
    width: "100%",
    fontSize: 16,
  },
});
