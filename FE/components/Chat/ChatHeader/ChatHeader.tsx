"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Grid2X2, EllipsisVertical } from "lucide-react";

import styles from "./ChatHeader.module.scss";
import NotificationMenu from "@/components/Notification/NotificationMenu";
import { useNotifications } from "@/hooks/useNotifications";

const ChatHeader = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = useNotifications();

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isNotificationsOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationsOpen]);

  return (
    <header className={styles.chatHeader}>
      <button className={styles.iconButton} aria-label="Workspace">
        <Grid2X2 size={20} />
      </button>

      <div ref={notificationRef} className={styles.notificationWrapper}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Notifications"
          aria-expanded={isNotificationsOpen}
          onClick={() => setIsNotificationsOpen((open) => !open)}
        >
          <Bell size={20} />

          {unreadCount > 0 && (
            <span className={styles.notificationBadge}>
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>

        {isNotificationsOpen && <NotificationMenu />}
      </div>

      <button className={styles.iconButton} aria-label="More">
        <EllipsisVertical size={20} />
      </button>
    </header>
  );
};

export default ChatHeader;
