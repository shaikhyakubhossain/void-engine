"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./Select.module.scss";

import SelectTrigger from "./SelectTrigger";
import SelectDropdown from "./SelectDropdown";

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

  const triggerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.id === value),
    [options, value],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();

      const dropdownHeight = 280;

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

  const handleSelect = (id: string) => {
    onChange(id);

    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={`${styles.select} ${className ?? ""}`}>
      <div ref={triggerRef}>
        <SelectTrigger
          label={selectedOption?.label ?? ""}
          placeholder={placeholder}
          disabled={disabled}
          isOpen={isOpen}
          onClick={toggleDropdown}
        />
      </div>

      {isOpen && (
        <SelectDropdown
          value={value}
          options={options}
          placement={placement}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

export default Select;
