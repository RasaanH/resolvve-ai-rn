import { IMessage } from "react-native-gifted-chat";
import "../assets/images/adaptive-icon.png";
export const regularUser = {
  _id: 224687234,
  name: "You",
};
export const systemUser = {
  _id: 916515277,
  name: "GPT",
  avatar: require("../assets/images/Gram.png"),
};
export const mockMessages: IMessage[] = [
  {
    _id: 2246872341,
    text: "Hello there",
    createdAt: new Date(),
    user: regularUser,
  },
  {
    _id: 9165152772,
    text: "Im doing well, ty",
    createdAt: new Date(),
    user: systemUser,
  },
  {
    _id: 2246872343,
    text: "glad to hear it",
    createdAt: new Date(),
    user: regularUser,
  },
  {
    _id: 9165152774,
    text: "Likewise",
    createdAt: new Date(),
    user: systemUser,
  },
  {
    _id: 2246872345,
    text: "How old are you, chatbot?",
    createdAt: new Date(),
    user: regularUser,
  },
];

export const defaultMessage: IMessage[] = [
  {
    _id: 9165152772,
    text: "How can I help you?",
    createdAt: new Date(),
    user: systemUser,
  },
];
