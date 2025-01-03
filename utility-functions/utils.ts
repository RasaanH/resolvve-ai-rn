import { IMessage } from "react-native-gifted-chat";
import { v4 as uuidv4 } from "uuid";
import { systemUser, regularUser } from "@/constants/MockData";
import {
  ValidatePasswordArgs,
  SignUpValidationObj,
  OpenAiMessage,
  OpenAiMessageContent,
  OpenAiMessageRole,
} from "@/constants/Types";

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

export const uiToOpenAiMessages = (messages: IMessage[]): OpenAiMessage[] => {
  const newMessages = messages.map((value) => {
    const role: OpenAiMessageRole =
      value.user.name === "GPT" ? "assistant" : "user";
    const text = value.text as unknown as OpenAiMessageContent;
    return { role, content: text };
  });
  return newMessages;
};

export const openAiToUiMessages = (messages: OpenAiMessage[]): IMessage[] => {
  const newMessages = messages.map((value) => {
    const messageUid = uuidv4();
    const user = value.role === "assistant" ? systemUser : regularUser;
    console.log("value content", value.content);
    const text = Array.isArray(value.content)
      ? (value.content[0].text as any)?.value
      : value.content.text;
    const createdAt = new Date();
    return { _id: messageUid, text, createdAt, user };
  });
  return newMessages;
};
