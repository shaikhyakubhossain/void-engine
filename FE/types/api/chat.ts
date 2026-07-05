import type { ChatMessage } from "../message";

export interface CreateMessageRequest {
  conversationId?: string;
  messages: ChatMessage[];
}

export interface CreateMessageResponse {
  message: ChatMessage;
}