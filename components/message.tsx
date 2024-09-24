import { Message as MessageType } from "@/constants/Types";
import { StyleSheet, View } from "react-native";
export const Message = ({ messageText, userMessage }: MessageType) => {
  const style = userMessage ? userStyles : systemStyles;
  return <View style={style.messageWrapper}>{messageText}</View>;
};

const userStyles = StyleSheet.create({
  messageWrapper: {
    color: "#808080",
  },
});

const systemStyles = StyleSheet.create({
  messageWrapper: {
    color: "#808080",
  },
});
