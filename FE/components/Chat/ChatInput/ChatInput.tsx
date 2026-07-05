import styles from "./ChatInput.module.scss";

import ChatTextarea from "./ChatTextarea";

import type { ChatInputProps } from "./ChatInput.types";
import ChatInputActions from "./ChatInputActions";

const ChatInput = ({
  value,
  placeholder = "Ask anything...",
  disabled = false,
  loading = false,
  onChange,
  onSubmit,
}: ChatInputProps) => {
  return (
    <footer className={styles.chatInput}>
      <div className={styles.container}>
        <ChatTextarea
          value={value}
          placeholder={placeholder}
          disabled={disabled || loading}
          onChange={onChange}
          onSubmit={onSubmit}
        />

        <ChatInputActions
          disabled={disabled}
          loading={loading}
          onSubmit={onSubmit}
        />
      </div>
    </footer>
  );
};

export default ChatInput;
