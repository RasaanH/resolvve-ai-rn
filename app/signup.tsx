import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { AppColors } from "@/constants/Colors";
import { firebaseApp } from "./index";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { validateSignUp } from "@/utility-functions/utils";
import { Text } from "react-native-paper";
import { SignUpValidationObj } from "@/constants/Types";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const defaultErrorMessage = {
    password: null,
    email: null,
    confirmPassword: null,
  };
  const [errorMessage, setErrorMessage] =
    useState<SignUpValidationObj>(defaultErrorMessage);
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = getAuth(firebaseApp);

  const showSnackbar = () => {
    setSnackBarVisible(true);
    setTimeout(() => {
      setSnackBarVisible(false);
    }, 2000);
  };

  const createEmailUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("user credential", userCredential);
        const user = userCredential.user;
        showSnackbar();
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

  const passwordsMatch = (password1: string, password2: string) =>
    password1 === password2;

  const handleEmailChange = (value: string) => {
    const samePasswords = passwordsMatch(password, confirmPassword);
    setEmail(value);
    if (value && confirmPassword && password && samePasswords) {
      setIsValid(true);
      setErrorMessage(defaultErrorMessage);
      return;
    }
    setIsValid(false);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const samePasswords = passwordsMatch(value, confirmPassword);
    console.log({ value, confirmPassword });

    if (email && confirmPassword && value && samePasswords) {
      setIsValid(true);
      setErrorMessage(defaultErrorMessage);
      return;
    }
    setIsValid(false);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    const samePasswords = passwordsMatch(value, password);

    if (email && value && password && samePasswords) {
      setIsValid(true);
      setErrorMessage(defaultErrorMessage);
      return;
    }
    setIsValid(false);
    setErrorMessage((prevState) => {
      return { ...prevState, confirmPassword: "Passwords do not match" };
    });
  };

  const handleSubmit = () => {
    const responseObj = validateSignUp({ password, confirmPassword, email });
    const validForm = Object.values(responseObj).every(
      (value) => value === null
    );
    if (validForm) {
      // Perform the submission or next step
      setErrorMessage(defaultErrorMessage);
      console.log("Password is valid and form is submitted");
      createEmailUser();
    } else {
      console.log("error response object", responseObj);
      setErrorMessage(responseObj);
    }
  };
  const errorString = Object.values(errorMessage).reduce((message, value) => {
    if (!value) {
      return message;
    }
    if (!message) {
      return value;
    }
    return `${message}, ${value}`;
  });
  return (
    <View style={styles.background}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={handleEmailChange}
        onSubmitEditing={handleSubmit}
        style={[
          styles.input,
          !!errorMessage?.email ? styles.invalidInput : null,
        ]}
      />
      <TextInput
        style={[
          styles.input,
          !!errorMessage?.password ? styles.invalidInput : null,
        ]}
        label="Password"
        value={password}
        onSubmitEditing={handleSubmit}
        onChangeText={handlePasswordChange}
        secureTextEntry={true}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        style={[
          styles.input,
          !!errorMessage?.confirmPassword ? styles.invalidInput : null,
        ]}
        onChangeText={handleConfirmPasswordChange}
        onSubmitEditing={handleSubmit}
        secureTextEntry={true}
      />
      <View>
        {errorMessage ? <Text style={styles.error}>{errorString}</Text> : null}
      </View>
      <View>
        <Button
          icon="account-plus-outline"
          mode="elevated"
          onPress={handleSubmit}
          disabled={!isValid}
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
      <Snackbar
        visible={snackBarVisible}
        onDismiss={() => {}}
        action={{
          label: "close",
          onPress: () => {
            setSnackBarVisible(false);
          },
        }}
      >
        You've succesfully signed up!
      </Snackbar>
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
  error: {
    color: "red",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  invalidInput: {
    borderColor: "red",
  },
});
