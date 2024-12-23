import { IMessage } from "react-native-gifted-chat";
import { v4 as uuidv4 } from "uuid";
import { systemUser } from "@/constants/MockData";
import { ValidatePasswordArgs, SignUpValidationObj } from "@/constants/Types";

export const mockChatCall = (messages: IMessage[]): Promise<IMessage[]> => {
  const fakeId = uuidv4();
  console.log({ fakeId });
  const fakeReturnMessage: IMessage = {
    _id: uuidv4(),
    text: "Sample gpt response",
    createdAt: new Date(),
    user: systemUser,
  };
  return new Promise((resolve, reject) => {
    const randomMs = Math.random() * 2000;
    setTimeout(() => {
      resolve([fakeReturnMessage, ...messages]);
    }, randomMs);
  });
};

export const validateSignUp = ({
  password,
  confirmPassword,
  email,
}: ValidatePasswordArgs): SignUpValidationObj => {
  const responseObj: SignUpValidationObj = {
    email: null,
    password: null,
    confirmPassword: null,
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = (email: string) => emailRegex.test(email);
  if (password.length < 8) {
    responseObj.password = "Password must be at least 8 characters long";
  }
  if (password !== confirmPassword) {
    responseObj.confirmPassword = "Passwords do not match";
  }
  if (!isValidEmail(email)) {
    responseObj.email = "invlaid email address";
  }
  return responseObj;
};
