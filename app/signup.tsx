import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { AppColors } from "@/constants/Colors";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { validateSignUp } from "@/utility-functions/utils";
import { Text } from "react-native-paper";
import { SignUpValidationObj } from "@/constants/Types";
import { Spaces } from "@/constants/Spacing";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [errorSnackbarVisible, setErrorSnackbarVisible] = useState(false);
  const [signUpMode, setSignUpMode] = useState(true);
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

  const swapMode = () => {
    setSignUpMode((prevMode) => !prevMode);
  };

  const showErrorSnackbar = () => {
    setErrorSnackbarVisible(true);
    setTimeout(() => {
      setErrorSnackbarVisible(false);
    }, 4000);
  };

  const auth = getAuth();

  const swapButtonText = signUpMode ? "Login" : "Sign Up";

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

  const loginWithEmail = async () => {
    if (!email || !password) {
      return;
    }
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log({ userCredentials });
    } catch (err) {
      console.log("error signing in", err);
      showErrorSnackbar();
    }
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
    const responseObj = validateSignUp({
      password,
      confirmPassword,
      email,
      signUp: signUpMode,
    });
    const validForm = Object.values(responseObj).every(
      (value) => value === null
    );
    if (validForm) {
      setErrorMessage(defaultErrorMessage);
      if (!signUpMode) {
        return loginWithEmail();
      }
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
  const displaySignUp = isValid ? "flex" : "none";
  return (
    <View style={styles.background}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Balance GPT</Text>
      </View>
      <View style={styles.bodyContainer}>
        <TextInput
          label="Email"
          mode="outlined"
          textColor={AppColors.White}
          activeOutlineColor={AppColors.White}
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
          mode="outlined"
          textColor={AppColors.White}
          activeOutlineColor={AppColors.White}
          placeholderTextColor={"blue"}
          value={password}
          onSubmitEditing={handleSubmit}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
        />
        {signUpMode && (
          <TextInput
            label="Confirm Password"
            mode="outlined"
            textColor={AppColors.White}
            activeOutlineColor={AppColors.White}
            value={confirmPassword}
            style={[
              styles.input,
              !!errorMessage?.confirmPassword ? styles.invalidInput : null,
            ]}
            onChangeText={handleConfirmPasswordChange}
            onSubmitEditing={handleSubmit}
            secureTextEntry={true}
          />
        )}
        <View>
          {errorMessage ? (
            <Text style={styles.error}>{errorString}</Text>
          ) : null}
        </View>
        <View>
          <Button
            icon="account-plus-outline"
            mode="elevated"
            onPress={handleSubmit}
            disabled={signUpMode ? !isValid : !(email && password)}
            textColor={AppColors.Black}
            style={{ ...styles.buttons, display: displaySignUp }}
          >
            Continue
          </Button>
          <Button
            icon="login"
            mode="elevated"
            onPress={swapMode}
            textColor={AppColors.Black}
            style={styles.buttons}
          >
            {swapButtonText}
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
    justifyContent: "center",
    alignItems: "center",
    padding: Spaces.XL,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  input: {
    marginVertical: Spaces.M,
    backgroundColor: AppColors.DarkGrey,
  },
  invalidInput: {
    borderColor: "red",
  },
  headerText: {
    color: AppColors.White,
    fontSize: 32,
    textAlign: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spaces.XXL,
  },
  bodyContainer: {
    width: "90%",
  },
  buttons: {
    marginVertical: Spaces.M,
  },
});
