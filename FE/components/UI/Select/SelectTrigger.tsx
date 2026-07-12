"use client";

import { ChevronDown } from "lucide-react";

import styles from "./Select.module.scss";

import type { SelectTriggerProps } from "./Select.types";

const SelectTrigger = ({
  label,
  placeholder,
  disabled,
  isOpen,
  onClick,
}: SelectTriggerProps) => {
  return (
    <button
      type="button"
      className={styles.trigger}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{label || placeholder}</span>

      <ChevronDown
        size={18}
        className={`${styles.icon} ${isOpen ? styles.open : ""}`}
      />
    </button>
  );
};

export default SelectTrigger;