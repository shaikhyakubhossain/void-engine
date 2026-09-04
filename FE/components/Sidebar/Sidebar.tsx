"use client";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";

import styles from "./Sidebar.module.scss";
import HistorySection from "./HistorySection";
import { useAuth } from "@/hooks/useAuth";

const Sidebar = () => {

  const { user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <SidebarHeader />
      <SidebarNav />
      <HistorySection />
      <SidebarFooter
        name={user?.name || "Guest"}
        email={user?.email || ''}
      />
    </aside>
  );
};

export default Sidebar;