"use client";

import { ChevronDown } from "lucide-react";

import styles from "./Select.module.scss";

import type { SelectTriggerProps } from "./Select.types";

const SelectTrigger = ({
  label,
  placeholder,
  disabled,
  isOpen,
  icon,
  iconPosition = "left",
  onClick,
}: SelectTriggerProps) => {
  return (
    <button
      type="button"
      className={styles.trigger}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && iconPosition === "left" && (
        <span className={styles.icon}>{icon}</span>
      )}
      <span>{label || placeholder}</span>

      {icon && iconPosition === "right" && (
        <span className={styles.icon}>{icon}</span>
      )}

      <ChevronDown
        size={18}
        className={`${styles.icon} ${isOpen ? styles.open : ""}`}
      />
    </button>
  );
};

export default SelectTrigger;
