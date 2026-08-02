"use client";
import {
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Pin,
  PinOff,
  Trash2,
} from "lucide-react";
import styles from "./ConversationList.module.scss";
import { useChat } from "@/hooks/useChat";
import { ChatSessionService } from "@/session/ChatSessionService";
import Menu from "@/components/UI/Menu/Menu";
import { ConversationService } from "@/services/conversation/ConversationService";
import { useRouter } from "next/navigation";
import { ConversationManager } from "@/services/conversation/ConversationManager";
import { Conversation } from "@/types";
import type { ReactNode } from "react";

interface ConversationListProps {
  conversations: Conversation[];

  title?: ReactNode;
}

type ConversationMenuAction = "rename" | "pin" | "delete";

const ICON_SIZE = 16;

const ConversationList = ({ title, conversations }: ConversationListProps) => {
  const { loadConversation } = useChat();
  const router = useRouter();

  const getMenuItems = (pinned: boolean) => [
    {
      id: "rename",
      label: "Rename",
      icon: <Pencil size={ICON_SIZE} />,
    },
    {
      id: "pin",
      label: pinned ? "Unpin" : "Pin",
      icon: <Pin size={ICON_SIZE} />,
    },
    {
      id: "separator",
      separator: true,
    },
    {
      id: "delete",
      label: "Delete",
      icon: <Trash2 size={ICON_SIZE} />,
      danger: true,
    },
  ];

  const handleMenuSelect = (
    conversationId: string,
    action: ConversationMenuAction,
  ) => {
    switch (action) {
      case "rename":
        ConversationService.rename(conversationId);
        break;

      case "pin":
        ConversationManager.togglePin(conversationId);
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

  if (conversations.length === 0) {
    return <div className={styles.empty}>No conversations yet.</div>;
  }

  return (
    <div className={styles.list}>
      {title && <h3 className={styles.sectionTitle}>{title}</h3>}
      {conversations.map((conversation) => (
        <div key={conversation.id} className={styles.listItem}>
          <button
            type="button"
            className={styles.item}
            onClick={() =>
              ChatSessionService.openConversation(
                conversation.id,
                loadConversation,
                router,
              )
            }
          >
            <MessageCircle size={20} />

            <span className={`${styles.title} truncate`}>
              {conversation.title}
            </span>
          </button>
          {conversation.pinned && (
            <button
              type="button"
              className={styles.pinOffButton}
              onClick={(event) => {
                event.stopPropagation();

                ConversationManager.togglePin(conversation.id);
              }}
              aria-label="Unpin conversation"
            >
              <PinOff size={14} className={styles.pin} />
            </button>
          )}
          <Menu
            className={styles.menu}
            items={getMenuItems(conversation.pinned)}
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

export default ConversationList;
