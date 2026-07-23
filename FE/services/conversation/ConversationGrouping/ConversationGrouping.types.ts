import type { Conversation } from "@/types";

export interface ConversationGroup {
  title: string;

  conversations: Conversation[];
}