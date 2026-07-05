"use client";

import { useEffect, useRef } from "react";

import styles from "./ChatTextarea.module.scss";

import { MAX_TEXTAREA_HEIGHT } from "../ChatInput.constants";

interface ChatTextareaProps {
  value: string;
  placeholder: string;
  disabled: boolean;

  onChange: (value: string) => void;
  onSubmit: () => void;
}

const ChatTextarea = ({
  value,
  placeholder,
  disabled,
  onChange,
  onSubmit,
}: ChatTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";

    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      MAX_TEXTAREA_HEIGHT
    )}px`;
  }, [value]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key !== "Enter") return;

    if (event.shiftKey) return;

    event.preventDefault();

    if (!value.trim()) return;

    onSubmit();
  };

  return (
    <textarea
      ref={textareaRef}
      className={styles.textarea}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      rows={1}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default ChatTextarea;