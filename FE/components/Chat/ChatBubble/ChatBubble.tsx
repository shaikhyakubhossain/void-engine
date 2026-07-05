import styles from "./ChatBubble.module.scss";

import MessageAvatar from "./MessageAvatar";
import MessageContent from "./MessageContent";
import MessageActions from "./MessageActions";

import type { ChatBubbleProps } from "./ChatBubble.types";

const ChatBubble = ({
  message,
}: ChatBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <article
      className={`${styles.chatBubble} ${
        isUser ? styles.user : styles.assistant
      }`}
    >
      <MessageAvatar role={message.role} />

      <div className={styles.body}>
        <MessageContent
          role={message.role}
          content={message.content}
        />

        {!isUser && <MessageActions />}
      </div>
    </article>
  );
};

export default ChatBubble;