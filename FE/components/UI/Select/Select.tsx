"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import styles from "./Select.module.scss";

import type { SelectProps } from "./Select.types";

const Select = ({
  value,
  options,
  placeholder = "Select...",
  disabled = false,
  className,
  onChange,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<"top" | "bottom">("bottom");

  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.id === value),
    [options, value],
  );

  const toggleDropdown = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();

      const dropdownHeight = 280; // temporary constant

      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      setPlacement(
        spaceBelow < dropdownHeight && spaceAbove > dropdownHeight
          ? "top"
          : "bottom",
      );
    }

    setIsOpen((open) => !open);
  };

  return (
    <div className={`${styles.select} ${className ?? ""}`}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        disabled={disabled}
        onClick={toggleDropdown}
      >
        <span>{selectedOption?.label ?? placeholder}</span>

        <ChevronDown
          size={18}
          className={`${styles.icon} ${isOpen ? styles.open : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`${styles.dropdown} ${
            placement === "top" ? styles.dropdownTop : styles.dropdownBottom
          }`}
        >
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`${styles.option} ${
                option.id === value ? styles.selected : ""
              }`}
              disabled={option.disabled}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
