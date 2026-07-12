"use client";

import styles from "./Select.module.scss";

import type { SelectOptionProps } from "./Select.types";

const SelectOption = ({
  option,
  selected,
  onSelect,
}: SelectOptionProps) => {
  return (
    <button
      type="button"
      className={`${styles.option} ${
        selected ? styles.selected : ""
      }`}
      disabled={option.disabled}
      onClick={() => onSelect(option.id)}
    >
      {option.label}
    </button>
  );
};

export default SelectOption;