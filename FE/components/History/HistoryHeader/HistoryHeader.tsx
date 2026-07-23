"use client";

import styles from "./HistoryHeader.module.scss";

const HistoryHeader = () => {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>History</h1>

        <p className={styles.description}>
          Browse and manage your previous conversations.
        </p>
      </div>
    </header>
  );
};

export default HistoryHeader;