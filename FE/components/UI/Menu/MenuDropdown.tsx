import type { MenuItem } from "./Menu.types";

import styles from "./Menu.module.scss";

interface MenuDropdownProps {
  items: MenuItem[];

  placement: "top" | "bottom";

  onSelect(id: string): void;
}

const MenuDropdown = ({ items, placement, onSelect }: MenuDropdownProps) => {
  return (
    <div
      className={`${styles.dropdown} ${
        placement === "top" ? styles.top : styles.bottom
      }`}
    >
      {items.map((item) => {
        if (item.separator) {
          return <div key={item.id} className={styles.separator} />;
        }

        return (
          <button
            key={item.id}
            type="button"
            disabled={item.disabled}
            className={`${styles.menuItem} ${item.danger ? styles.danger : ""}`}
            onClick={() => onSelect(item.id)}
          >
            {item.icon && <span className={styles.icon}>{item.icon}</span>}

            <span className={styles.label}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MenuDropdown;
