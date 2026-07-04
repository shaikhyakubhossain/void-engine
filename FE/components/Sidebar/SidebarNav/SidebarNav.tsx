"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./SidebarNav.module.scss";

import { SIDEBAR_NAV_ITEMS } from "./SidebarNav.constants";

const SidebarNav = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebarNav}>
      {SIDEBAR_NAV_ITEMS.map((item) => {
        const Icon = item.icon;

        const isActive = pathname === item.href;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`${styles.navItem} ${
              isActive ? styles.active : ""
            }`}
          >
            <Icon size={20} />

            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarNav;