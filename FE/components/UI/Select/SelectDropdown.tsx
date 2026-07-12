"use client";

import styles from "./Select.module.scss";

import SelectOption from "./SelectOption";

import type { SelectDropdownProps } from "./Select.types";

const SelectDropdown = ({
  value,
  options,
  placement,
  onSelect,
}: SelectDropdownProps) => {
  return (
    <div
      className={`${styles.dropdown} ${
        placement === "top"
          ? styles.dropdownTop
          : styles.dropdownBottom
      }`}
    >
      {options.map((option) => (
        <SelectOption
          key={option.id}
          option={option}
          selected={option.id === value}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default SelectDropdown;