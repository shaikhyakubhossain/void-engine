"use client";
import type { HistoryCardProps } from "./HistoryCard.types";
import { MessageCircle } from "lucide-react";
import styles from "./HistoryCard.module.scss";
import { DateFormatter } from "@/utils/date/DateFormatter";
import { ConversationService } from "@/services/conversation/ConversationService";
import { useRouter } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import { ChatSessionService } from "@/session/ChatSessionService";

const HistoryCard = ({ conversation }: HistoryCardProps) => {
  const router = useRouter();

  const { loadConversation } = useChat();

  const preview = ConversationService.getPreview(conversation);
  const relativeDate = DateFormatter.formatRelative(conversation.updatedAt);
  return (
    <button
      type="button"
      className={styles.card}
      onClick={() =>
        ChatSessionService.openConversation(
          conversation.id,
          loadConversation,
          router,
        )
      }
    >
      <div className={styles.icon}>
        <MessageCircle size={18} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{conversation.title}</h3>

          <span className={styles.time}>{relativeDate}</span>
        </div>

        <p className={styles.preview}>{preview}</p>
      </div>
    </button>
  );
};

export default HistoryCard;
