import {
  Copy,
  RotateCcw,
} from "lucide-react";

import styles from "./MessageActions.module.scss";

const MessageActions = () => {
  return (
    <div className={styles.actions}>
      <button
        className={styles.button}
        aria-label="Copy message"
      >
        <Copy size={16} />
      </button>

      <button
        className={styles.button}
        aria-label="Regenerate response"
      >
        <RotateCcw size={16} />
      </button>
    </div>
  );
};

export default MessageActions;