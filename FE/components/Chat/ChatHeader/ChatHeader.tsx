import { Bell, Grid2X2, EllipsisVertical } from "lucide-react";

import styles from "./ChatHeader.module.scss";

const ChatHeader = () => {
  return (
    <header className={styles.chatHeader}>
      <button className={styles.iconButton} aria-label="Workspace">
        <Grid2X2 size={20} />
      </button>

      <button className={styles.iconButton} aria-label="Notifications">
        <Bell size={20} />
      </button>

      <button className={styles.iconButton} aria-label="More">
        <EllipsisVertical size={20} />
      </button>
    </header>
  );
};

export default ChatHeader;