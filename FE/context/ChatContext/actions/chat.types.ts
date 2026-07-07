import type { ChatMessage } from "@/types";

import type {
  addMessage,
  clearChat,
  setError,
  setInput,
  setLoading,
  setMessages,
  updateMessageContent,
} from "./chat.actions";

export interface ChatState {
  conversationId?: string;
  messages: ChatMessage[];
  input: string;
  loading: boolean;
  error: string | null;
}

export type ChatAction =
  | ReturnType<typeof setInput>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof addMessage>
  | ReturnType<typeof setMessages>
  | ReturnType<typeof clearChat>
  | ReturnType<typeof setError>
  | ReturnType<typeof updateMessageContent>;

export interface ChatContextType {
  chat: ChatState;

  setInput: (value: string) => void;

  sendMessage: () => Promise<void>;

  clearChat: () => void;
}
