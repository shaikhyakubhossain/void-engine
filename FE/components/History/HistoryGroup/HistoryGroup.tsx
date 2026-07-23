"use client";

import HistoryCard from "../HistoryCard";

import type { HistoryGroupProps } from "./HistoryGroup.types";

import styles from "./HistoryGroup.module.scss";

const HistoryGroup = ({
  title,
  conversations,
}: HistoryGroupProps) => {
  if (conversations.length === 0) {
    return null;
  }

  return (
    <section className={styles.group}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.line} />
      </header>

      <div className={styles.list}>
        {conversations.map((conversation) => (
          <HistoryCard
            key={conversation.id}
            conversation={conversation}
          />
        ))}
      </div>
    </section>
  );
};

export default HistoryGroup;