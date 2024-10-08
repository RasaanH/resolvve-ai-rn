import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { AppColors } from "@/constants/Colors";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseApp } from ".";
import { validateSignUp } from "@/utility-functions/utils";
import { Text } from "react-native-paper";
import { SignUpValidationObj } from "@/constants/Types";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [errorSnackbarVisible, setErrorSnackbarVisible] = useState(false);
  const defaultErrorMessage = {
    password: null,
    email: null,
    confirmPassword: null,
  };
  const [errorMessage, setErrorMessage] =
    useState<SignUpValidationObj>(defaultErrorMessage);
  const [confirmPassword, setConfirmPassword] = useState("");

  const showSnackbar = () => {
    setSnackBarVisible(true);
    setTimeout(() => {
      setSnackBarVisible(false);
    }, 2000);
  };

  const showErrorSnackbar = () => {
    setErrorSnackbarVisible(true);
    setTimeout(() => {
      setErrorSnackbarVisible(false);
    }, 4000);
  };

  const auth = getAuth(firebaseApp);

  const createEmailUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
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
        showErrorSnackbar();
      });
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value && confirmPassword && password) {
      setIsValid(true);
      setErrorMessage(defaultErrorMessage);
      return;
    }
    setIsValid(false);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (email && confirmPassword && value) {
      setIsValid(true);
      setErrorMessage(defaultErrorMessage);
      return;
    }
    setIsValid(false);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (email && value && password) {
      setIsValid(true);
      setErrorMessage(defaultErrorMessage);
      return;
    }
    setIsValid(false);
  };

  const handleSubmit = () => {
    const responseObj = validateSignUp({ password, confirmPassword, email });
    const validForm = Object.values(responseObj).every(
      (value) => value === null
    );
    if (validForm) {
      setErrorMessage(defaultErrorMessage);
      createEmailUser();
    } else {
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
      <Snackbar
        visible={errorSnackbarVisible}
        onDismiss={() => {}}
        action={{
          label: "close",
          onPress: () => {
            setErrorSnackbarVisible(false);
          },
        }}
      >
        Error Signing Up
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
