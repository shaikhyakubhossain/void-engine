import type { PropsWithChildren } from "react";

import styles from "./Menu.module.scss";

interface MenuTriggerProps extends PropsWithChildren {
  onClick(): void;
}

const MenuTrigger = ({
  children,
  onClick,
}: MenuTriggerProps) => {
  return (
    <button
      type="button"
      className={styles.trigger}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MenuTrigger;