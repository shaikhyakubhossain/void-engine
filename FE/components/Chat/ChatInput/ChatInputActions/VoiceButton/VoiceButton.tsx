import { Mic } from "lucide-react";

import styles from "./VoiceButton.module.scss";

interface VoiceButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

const VoiceButton = ({
  disabled = false,
  onClick,
}: VoiceButtonProps) => {
  return (
    <button
      type="button"
      className={styles.button}
      disabled={disabled}
      aria-label="Voice input"
      onClick={onClick}
    >
      <Mic size={18} />
    </button>
  );
};

export default VoiceButton;