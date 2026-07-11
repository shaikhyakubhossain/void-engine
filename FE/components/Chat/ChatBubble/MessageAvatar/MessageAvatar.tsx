import VoidLogo from "@/components/VoidLogo/VoidLogo";
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
        return <VoidLogo size={30} />;

      case "system":
        return "S";

      default:
        return "?";
    }
  };

  return (
    <div
      className={`${styles.avatar} ${
        role === "user"
          ? styles.user
          : role === "assistant"
            ? styles.assistant
            : styles.system
      }`}
    >
      {getLabel()}
    </div>
  );
};

export default MessageAvatar;
