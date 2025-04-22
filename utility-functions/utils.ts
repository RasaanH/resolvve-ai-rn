import { IMessage } from "react-native-gifted-chat";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { systemUser, regularUser } from "@/constants/MockData";
import {
  ValidatePasswordArgs,
  SignUpValidationObj,
  OpenAiMessage,
  OpenAiMessageContent,
  OpenAiMessageRole,
  ChatServiceResponseOutput,
} from "@/constants/Types";

import { ChatModes } from "@/components/ChatWrapper/EmptyChat";

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
  signUp,
}: ValidatePasswordArgs): SignUpValidationObj => {
  const responseObj: SignUpValidationObj = {
    email: null,
    password: null,
    confirmPassword: null,
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = (email: string) => emailRegex.test(email.trim());
  if (password.length < 8) {
    responseObj.password = "Password must be at least 8 characters long";
  }
  if (password !== confirmPassword) {
    responseObj.confirmPassword = "Passwords do not match";
  }
  if (!isValidEmail(email)) {
    responseObj.email = "Invlaid email address";
  }
  if (!signUp) {
    return {
      ...responseObj,
      password: null,
      confirmPassword: null,
    };
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

export const openAiToUiMessages = (
  output: ChatServiceResponseOutput[]
): IMessage[] => {
  const correctData = output.find((item) => item?.content?.length > 0) || {
    content: [],
    id: "",
  };
  const { content, id } = correctData;
  const newMessageText =
    typeof content?.[0]?.text === "string"
      ? content[0].text
      : content?.[0].text.value;
  return [
    {
      _id: id,
      text: newMessageText,
      createdAt: new Date(),
      user: systemUser,
    },
  ];
};

export const getAssistantFromTabIndex = (tabIndex: number): ChatModes => {
  const assistants: Record<number, ChatModes> = {
    0: ChatModes.conservative,
    1: ChatModes.liberal,
  };
  return assistants?.[tabIndex] || ChatModes.liberal;
};
