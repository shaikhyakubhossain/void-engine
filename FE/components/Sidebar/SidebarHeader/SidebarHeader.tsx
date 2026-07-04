import Image from "next/image";

import styles from "./SidebarHeader.module.scss";

const SidebarHeader = () => {
  return (
    <header className={styles.sidebarHeader}>
      <div className={styles.logo}>
        <Image
          src="/images/logo.svg"
          alt="VoidEngine"
          width={32}
          height={32}
          priority
        />
      </div>

      <div className={styles.content}>
        <h1>VoidEngine</h1>
        <p>Premium Assistant</p>
      </div>
    </header>
  );
};

export default SidebarHeader;