import type { ChatMessage } from "../message";

export interface CreateMessageRequest {
  conversationId?: string;
  messages: ChatMessage[];
  provider: string;
  model: string;
}

export interface CreateMessageResponse {
  message: ChatMessage;
}
