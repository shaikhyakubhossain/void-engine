import styles from "./MessageAvatar.module.scss";
import { MessageRole } from "@/types";

interface MessageAvatarProps {
  role: MessageRole;
}

const MessageAvatar = ({ role }: MessageAvatarProps) => {
  const getLabel = () => {
    switch (role) {
      case "user":
        return "U";

      case "assistant":
        return "AI";

      case "system":
        return "S";

      default:
        return "?";
    }
  };

  return <div className={styles.avatar}>{getLabel()}</div>;
};

export default MessageAvatar;
