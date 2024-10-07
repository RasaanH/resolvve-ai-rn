import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import { AppColors } from "@/constants/Colors";
import { firebaseApp } from "./index";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "react-native-paper";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = getAuth(firebaseApp);
  const createEmailUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("user credential", userCredential);
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error signing up user with email and password", {
          errorCode,
          errorMessage,
        });
      });
  };
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
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
      />
      <View>
        <Button
          icon="account-plus-outline"
          mode="elevated"
          onPress={() => console.log("Pressed")}
        >
          Continue
        </Button>
        <Button
          icon="login"
          mode="elevated"
          onPress={() => console.log("Pressed")}
        >
          Login
        </Button>
      </View>
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
