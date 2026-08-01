import { ConversationManager } from "@/services/conversation/ConversationManager";
import { Conversation } from "@/types/conversation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export class ChatSessionService {
  static startNewChat(clearChat: () => void) {
    clearChat();
  }

  static openConversation(
    conversationId: string,
    loadConversation: (conversation: Conversation) => void,
    router: AppRouterInstance,
  ) {
    const conversation = ConversationManager.get(conversationId);

    if (!conversation) {
      return;
    }

    loadConversation(conversation);

    router.push("/");
  }
}
