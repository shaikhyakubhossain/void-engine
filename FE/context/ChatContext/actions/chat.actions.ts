import type { ChatMessage } from "@/types";

export const ChatActionTypes = {
  SET_INPUT: "SET_INPUT",
  SET_LOADING: "SET_LOADING",
  ADD_MESSAGE: "ADD_MESSAGE",
  SET_MESSAGES: "SET_MESSAGES",
  SET_ERROR: "SET_ERROR",
  CLEAR_CHAT: "CLEAR_CHAT",
  UPDATE_MESSAGE_CONTENT: "UPDATE_MESSAGE_CONTENT",
} as const;


export const setInput = (value: string) => ({
  type: ChatActionTypes.SET_INPUT,
  payload: value,
});

export const setLoading = (loading: boolean) => ({
  type: ChatActionTypes.SET_LOADING,
  payload: loading,
});

export const addMessage = (message: ChatMessage) => ({
  type: ChatActionTypes.ADD_MESSAGE,
  payload: message,
});

export const setMessages = (messages: ChatMessage[]) => ({
  type: ChatActionTypes.SET_MESSAGES,
  payload: messages,
});

export const clearChat = () => ({
  type: ChatActionTypes.CLEAR_CHAT,
});

export const setError = (error: string | null) => ({
  type: ChatActionTypes.SET_ERROR,
  payload: error,
});

export const updateMessageContent = (
  id: string,
  chunk: string,
) => ({
  type: ChatActionTypes.UPDATE_MESSAGE_CONTENT,
  payload: {
    id,
    chunk,
  },
});

export const ChatActions = {
  setInput,
  setLoading,
  addMessage,
  setMessages,
  clearChat,
  setError,
  updateMessageContent,
};