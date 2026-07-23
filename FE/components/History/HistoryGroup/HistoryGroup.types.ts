import type { Conversation } from "@/types";

export interface HistoryGroupProps {
  title: string;

  conversations: Conversation[];
}