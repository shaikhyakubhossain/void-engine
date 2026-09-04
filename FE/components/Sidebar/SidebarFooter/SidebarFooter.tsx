"use client";

import Image from "next/image";
import { ChevronUp } from "lucide-react";

import styles from "./SidebarFooter.module.scss";
import type { SidebarFooterProps } from "./SidebarFooter.types";
import { useRouter } from "next/navigation";

const SidebarFooter = ({
  name,
  email,
  avatar,
}: SidebarFooterProps) => {

  const router = useRouter();

  return (
    <footer className={styles.sidebarFooter}>
      <button className={styles.profileButton} onClick={() => !email && router.push("/login")}>
        <div className={styles.avatar}>
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              width={48}
              height={48}
            />
          ) : (
            <span>{name.charAt(0).toUpperCase()}</span>
          )}
        </div>

        <div className={styles.userInfo}>
          <span className={styles.name}>{name}</span>
          <span className={styles.email}>{email}</span>
        </div>

        <ChevronUp size={18} />
      </button>
    </footer>
  );
};

export default SidebarFooter;