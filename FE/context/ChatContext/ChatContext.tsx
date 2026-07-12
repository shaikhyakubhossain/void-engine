"use client";
import type { PropsWithChildren } from "react";
import type { ChatContextType } from "./actions/chat.types";
import type { ChatMessage } from "@/types";
import {
  createContext,
  useMemo,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import { INITIAL_CHAT_STATE } from "./ChatContext.constants";
import { chatReducer } from "./ChatContext.reducer";
import { ChatActions } from "./actions/chat.actions";
import { ChatService, LLMService } from "@/services";

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: PropsWithChildren) => {
  const [chat, dispatch] = useReducer(chatReducer, INITIAL_CHAT_STATE);

  useEffect(() => {
    const initializeLLM = async () => {
      try {
        const llmState = await LLMService.initialize();

        console.log("Initialized:", llmState);

        dispatch(ChatActions.setLLMState(llmState));
      } catch (error) {
        console.error("Failed to initialize LLMs:", error);

        dispatch(
          ChatActions.setError(
            error instanceof Error
              ? error.message
              : "Failed to load AI models.",
          ),
        );
      }
    };

    void initializeLLM();
  }, []);

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
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
      };

      dispatch(ChatActions.addMessage(assistantMessage));

      const reader = await ChatService.streamMessage({
        conversationId: chat.conversationId,

        provider: chat.llm.selectedProvider ?? "gemini",

        model: chat.llm.selectedModel ?? "gemini-2.5-flash",

        messages: [...chat.messages, userMessage],
      });

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, {
          stream: true,
        });

        dispatch(ChatActions.updateMessageContent(assistantMessage.id, chunk));
      }
    } catch (error) {
      console.error("Error sending message:", error);

      dispatch(
        ChatActions.addMessage({
          id: crypto.randomUUID(),
          role: "system",
          content:
            error instanceof Error ? error.message : "Something went wrong.",
        }),
      );

      dispatch(
        ChatActions.setError(
          error instanceof Error ? error.message : "Something went wrong.",
        ),
      );
    } finally {
      dispatch(ChatActions.setLoading(false));
    }
  }, [chat]);

  const setSelectedProvider = useCallback((provider: string) => {
    dispatch(ChatActions.setSelectedProvider(provider));
  }, []);

  const setSelectedModel = useCallback((model: string) => {
    dispatch(ChatActions.setSelectedModel(model));
  }, []);

  const value = useMemo(
    () => ({
      chat,
      setInput,
      sendMessage,
      clearChat,
      setSelectedProvider,
      setSelectedModel,
    }),
    [
      chat,
      setInput,
      sendMessage,
      clearChat,
      setSelectedProvider,
      setSelectedModel,
    ],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
