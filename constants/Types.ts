// types go here
export interface ValidatePasswordArgs {
  password: string;
  confirmPassword: string;
  email: string;
  signUp: boolean;
}

export interface SignUpValidationObj {
  password: string | null;
  confirmPassword: string | null;
  email: string | null;
}

export interface OpenAiMessageContent {
  type: string;
  text:
    | string
    | {
        value: string;
        annotations?: any[];
      };
}

export type OpenAiMessageRole = "user" | "assistant";

export interface OpenAiMessage {
  role: OpenAiMessageRole;
  content: OpenAiMessageContent[] | OpenAiMessageContent;
}

export interface ChatServiceResponse {
  messages: OpenAiMessage[];
  threadId: string;
}
