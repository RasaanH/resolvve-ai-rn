import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import { AppColors } from "@/constants/Colors";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.background}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  messageList: {
    display: "flex",
    flexDirection: "column",
  },
  background: {
    backgroundColor: AppColors.DarkGrey,
    flex: 1,
  },
});
