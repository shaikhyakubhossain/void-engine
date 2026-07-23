import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";

import styles from "./Sidebar.module.scss";
import HistorySection from "./HistorySection";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <SidebarHeader />
      <SidebarNav />
      <HistorySection />
      <SidebarFooter
        name="Guest"
        email=''
      />
    </aside>
  );
};

export default Sidebar;