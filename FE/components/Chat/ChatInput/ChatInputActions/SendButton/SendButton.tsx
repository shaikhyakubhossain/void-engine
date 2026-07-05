import { ArrowUp, Square } from "lucide-react";

import styles from "./SendButton.module.scss";

interface SendButtonProps {
  disabled?: boolean;
  loading?: boolean;

  onClick: () => void;
}

const SendButton = ({
  disabled = false,
  loading = false,
  onClick,
}: SendButtonProps) => {
  return (
    <button
      type="button"
      className={styles.button}
      disabled={disabled}
      aria-label={loading ? "Stop generating" : "Send message"}
      onClick={onClick}
    >
      {loading ? <Square size={18} /> : <ArrowUp size={18} />}
    </button>
  );
};

export default SendButton;