import styles from "./ChatInputActions.module.scss";

import AttachmentButton from "./AttachmentButton";
import VoiceButton from "./VoiceButton";
import SendButton from "./SendButton";

interface ChatInputActionsProps {
  disabled?: boolean;
  loading?: boolean;

  onAttach?: () => void;
  onVoice?: () => void;
  onSubmit: () => void;
}

const ChatInputActions = ({
  disabled = false,
  loading = false,
  onAttach,
  onVoice,
  onSubmit,
}: ChatInputActionsProps) => {
  return (
    <div className={styles.actions}>
      <div className={styles.left}>
        <AttachmentButton
          disabled={disabled}
          onClick={onAttach}
        />

        <VoiceButton
          disabled={disabled}
          onClick={onVoice}
        />
      </div>

      <SendButton
        disabled={disabled}
        loading={loading}
        onClick={onSubmit}
      />
    </div>
  );
};

export default ChatInputActions;