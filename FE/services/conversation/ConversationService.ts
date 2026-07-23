import { Conversation } from "@/types/conversation";
import { ConversationManager } from "./ConversationManager";
import { ChatMessage } from "@/types/message";
import { PREVIEW_MAX_LENGTH, PREVIEW_ROLE_PRIORITY } from "@/constants/conversation";

export class ConversationService {
  static rename(conversationId: string): void {
    const title = prompt("Rename conversation");

    if (!title?.trim()) {
      return;
    }

    ConversationManager.rename(conversationId, title.trim());
  }

  static remove(conversationId: string): void {
    ConversationManager.remove(conversationId);
  }

  static pin(conversationId: string): void {
    console.log("Pin", conversationId);
  }

  static getPreview(conversation: Conversation): string {
    const normalize = (text: string) =>
      text.replace(/\s+/g, " ").trim();

    const truncate = (text: string) =>
      text.length > PREVIEW_MAX_LENGTH
        ? `${text.slice(0, PREVIEW_MAX_LENGTH)}...`
        : text;

    for (const role of PREVIEW_ROLE_PRIORITY) {
      const message = conversation.messages.find((message) => {
        return (
          message.role === role &&
          normalize(message.content).length > 0
        );
      });

      if (message) {
        return truncate(normalize(message.content));
      }
    }

    return "";
  }
}
