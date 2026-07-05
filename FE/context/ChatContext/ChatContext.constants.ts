import type { ChatState } from "./actions/chat.types";

export const INITIAL_CHAT_STATE: ChatState = {
  conversationId: undefined,
  messages: [],
  input: "",
  loading: false,
  error: null,
};