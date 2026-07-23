"use client";
import {
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Pin,
  Trash2,
} from "lucide-react";
import styles from "./RecentConversationList.module.scss";
import { useChat } from "@/hooks/useChat";
import { useConversations } from "@/hooks/useConversations";
import { ChatSessionService } from "@/session/ChatSessionService";
import Menu from "@/components/UI/Menu/Menu";
import { useMemo } from "react";
import { ConversationService } from "@/services/conversation/ConversationService";

interface RecentConversationListProps {
  limit?: number;
}

type ConversationMenuAction = "rename" | "pin" | "delete";

const RecentConversationList = ({ limit = 4 }: RecentConversationListProps) => {
  const conversations = useConversations().slice(0, limit);

  const { loadConversation } = useChat();

  const menuItems = useMemo(
    () => [
      {
        id: "rename",
        label: "Rename",
        icon: <Pencil size={16} />,
      },
      {
        id: "pin",
        label: "Pin",
        icon: <Pin size={16} />,
      },

      {
        id: "separator",
        separator: true,
      },

      {
        id: "delete",
        label: "Delete",
        icon: <Trash2 size={16} />,
        danger: true,
      },
    ],
    [],
  );

  const handleMenuSelect = (
    conversationId: string,
    action: ConversationMenuAction,
  ) => {
    switch (action) {
      case "rename":
        ConversationService.rename(conversationId);
        break;

      case "pin":
        ConversationService.pin(conversationId);
        break;

      case "delete": {
        const confirmed = confirm("Delete this conversation?");
        if (!confirmed) {
          return;
        }
        ConversationService.remove(conversationId);
        break;
      }
    }
  };

  console.log(
    conversations.map((c) => ({
      id: c.id,
      title: c.title,
    })),
  );

  if (conversations.length === 0) {
    return <div className={styles.empty}>No conversations yet.</div>;
  }

  return (
    <div className={styles.list}>
      {conversations.map((conversation) => (
        <div key={conversation.id} className={styles.listItem}>
          <button
            type="button"
            className={styles.item}
            onClick={() =>
              ChatSessionService.loadConversation(
                conversation.id,
                loadConversation,
              )
            }
          >
            <MessageCircle size={20} />

            <span className={styles.title}>{conversation.title}</span>
          </button>

          <Menu
            className={styles.menu}
            items={menuItems}
            onSelect={(action) =>
              handleMenuSelect(
                conversation.id,
                action as ConversationMenuAction,
              )
            }
          >
            <MoreHorizontal size={16} />
          </Menu>
        </div>
      ))}
    </div>
  );
};

export default RecentConversationList;
