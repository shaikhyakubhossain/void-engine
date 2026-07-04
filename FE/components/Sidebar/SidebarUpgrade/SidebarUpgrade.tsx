import { Crown } from "lucide-react";

import styles from "./SidebarUpgrade.module.scss";

import type { SidebarUpgradeProps } from "./SidebarUpgrade.types";

const SidebarUpgrade = ({
  title = "Upgrade to Pro",
  description = "Unlock premium AI models and advanced features.",
  onUpgrade,
}: SidebarUpgradeProps) => {
  return (
    <section className={styles.sidebarUpgrade}>
  {/* <div className={styles.icon}>
    <Crown size={22} />
  </div>

  <h3 className={styles.title}>{title}</h3>

  <p className={styles.description}>
    {description}
  </p>

  <button className={styles.button}>
    Upgrade Now
  </button> */}
</section>
  );
};

export default SidebarUpgrade;