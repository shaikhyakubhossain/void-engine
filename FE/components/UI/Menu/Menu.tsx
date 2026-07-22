"use client";

import { useEffect, useRef, useState } from "react";

import type { MenuProps } from "./Menu.types";

import MenuTrigger from "./MenuTrigger";
import MenuDropdown from "./MenuDropdown";

import styles from "./Menu.module.scss";

const Menu = ({
  items,
  children,
  className,
  onSelect,
}: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [placement, setPlacement] = useState<"top" | "bottom">("bottom");

  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();

      const dropdownHeight = 220;

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
    onSelect(id);

    setIsOpen(false);
  };

  return (
    <div
      ref={menuRef}
      className={`${styles.menu} ${className ?? ""}`}
    >
      <div ref={triggerRef}>
        <MenuTrigger onClick={toggleMenu}>
          {children}
        </MenuTrigger>
      </div>

      {isOpen && (
        <MenuDropdown
          items={items}
          placement={placement}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

export default Menu;