"use client";
import { useConversations } from "@/hooks/useConversations";
import HistoryHeader from "./HistoryHeader";
import { ConversationGrouping } from "@/services/conversation/ConversationGrouping/ConversationGrouping";
import HistoryGroup from "./HistoryGroup";
import styles from "./History.module.scss";

const History = () => {
  const conversations = useConversations();

  const groups = ConversationGrouping.group(conversations);

  return (
    <div className={styles.history}>
      <HistoryHeader />
      <div className={styles.historyGroupsContainer}>
        {groups.map((group) => (
          <HistoryGroup
            key={group.title}
            title={group.title}
            conversations={group.conversations}
          />
        ))}
      </div>
    </div>
  );
};

export default History;
