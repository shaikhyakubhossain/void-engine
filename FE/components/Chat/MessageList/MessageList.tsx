import styles from "./MessageList.module.scss";
import ChatBubble from "../ChatBubble";
import type { MessageListProps } from "./MessageList.types";

const MessageList = ({
  messages,
}: MessageListProps) => {
  return (
    <section className={styles.messageList}>
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          message={message}
        />
      ))}
    </section>
  );
};

export default MessageList;