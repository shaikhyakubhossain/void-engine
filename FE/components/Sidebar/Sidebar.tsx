import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarUpgrade from "./SidebarUpgrade";
import SidebarFooter from "./SidebarFooter";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <SidebarHeader />
      <SidebarNav />
      <SidebarFooter
        name="test"
        email="testing@123.com"
      />
    </aside>
  );
};

export default Sidebar;