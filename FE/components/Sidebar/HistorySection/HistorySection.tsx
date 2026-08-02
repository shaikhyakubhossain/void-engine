"use client";

import { SquareArrowOutUpRight, History, Pin } from "lucide-react";
import { useRouter } from "next/navigation";

import SidebarSection from "../SidebarSection/SidebarSection";
import ConversationList from "../ConversationList";
import { useConversations } from "@/hooks/useConversations";
import styles from "./HistorySection.module.scss";

const HistorySection = () => {
  const router = useRouter();
  const conversations = useConversations();

  const pinnedConversations = conversations.filter(
    (conversation) => conversation.pinned,
  );

  const recentConversations = conversations.filter(
    (conversation) => !conversation.pinned,
  );

  return (
    <SidebarSection
      title="History"
      icon={History}
      action={
        <SquareArrowOutUpRight
          size={18}
          onClick={() => router.push("/history")}
        />
      }
    >
      <div className={styles.historySection}>
        {pinnedConversations.length > 0 && (
          <ConversationList
            conversations={pinnedConversations}
            title={
              <>
                <Pin size={14} />
                <span>Pinned</span>
              </>
            }
          />
        )}

        <ConversationList
          conversations={recentConversations.slice(0, 4)}
          title="Recent"
        />
      </div>
    </SidebarSection>
  );
};

export default HistorySection;
