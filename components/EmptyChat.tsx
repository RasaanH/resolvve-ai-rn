import { AppColors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
export const EmptyChat = () => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>What's going on?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { color: AppColors.White },
  textContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
