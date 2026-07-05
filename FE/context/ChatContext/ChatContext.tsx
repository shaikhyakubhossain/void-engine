"use client";
import type { PropsWithChildren } from "react";
import type { ChatContextType } from "./actions/chat.types";
import type { ChatMessage } from "@/types";
import { createContext, useMemo, useReducer, useCallback } from "react";
import { INITIAL_CHAT_STATE } from "./ChatContext.constants";
import { chatReducer } from "./ChatContext.reducer";
import { ChatActions } from "./actions/chat.actions";
import { ChatService } from "@/services";

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: PropsWithChildren) => {
  const [chat, dispatch] = useReducer(chatReducer, INITIAL_CHAT_STATE);

  const setInput = useCallback((value: string) => {
    dispatch(ChatActions.setInput(value));
  }, []);

  const clearChat = useCallback(() => {
    dispatch(ChatActions.clearChat());
  }, []);

  const sendMessage = useCallback(async () => {
  const trimmedInput = chat.input.trim();

  if (!trimmedInput) {
    return;
  }

  const userMessage: ChatMessage = {
    id: crypto.randomUUID(),
    role: "user",
    content: trimmedInput,
  };

  dispatch(ChatActions.addMessage(userMessage));
  dispatch(ChatActions.setInput(""));
  dispatch(ChatActions.setLoading(true));

  try {
    const response = await ChatService.createMessage({
      conversationId: chat.conversationId,
      messages: [...chat.messages, userMessage],
    });

    if (!response.success) {
      dispatch(ChatActions.setError(response.error.message));
      return;
    }

    dispatch(ChatActions.addMessage(response.data.message));
  } catch (error) {
    dispatch(
      ChatActions.setError(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      ),
    );
  } finally {
    dispatch(ChatActions.setLoading(false));
  }
}, [chat]);

  const value = useMemo(
    () => ({
      chat,
      setInput,
      sendMessage,
      clearChat,
    }),
    [chat, setInput, sendMessage, clearChat],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
