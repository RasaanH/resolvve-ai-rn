import { IMessage } from "react-native-gifted-chat";
import { v4 as uuidv4 } from "uuid";
import { systemUser } from "@/constants/MockData";

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
