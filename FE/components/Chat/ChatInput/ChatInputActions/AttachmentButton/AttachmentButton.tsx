import { Paperclip } from "lucide-react";

import styles from "./AttachmentButton.module.scss";

interface AttachmentButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

const AttachmentButton = ({
  disabled = false,
  onClick,
}: AttachmentButtonProps) => {
  return (
    <button
      type="button"
      className={styles.button}
      disabled={disabled}
      aria-label="Attach file"
      onClick={onClick}
    >
      <Paperclip size={18} />
    </button>
  );
};

export default AttachmentButton;