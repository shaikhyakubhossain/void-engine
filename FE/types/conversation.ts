import type { ChatMessage } from "./message";

export interface Conversation {
  id: string;

  title: string;

  messages: ChatMessage[];

  createdAt: number;

  updatedAt: number;
}