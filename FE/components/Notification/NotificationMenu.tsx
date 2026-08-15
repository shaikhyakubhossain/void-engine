"use client";

import { useNotifications } from "@/hooks/useNotifications";

import styles from "./NotificationMenu.module.scss";
import { NotificationManager } from "@/services/notification/NotificationManager";
import { DateFormatter } from "@/utils/date/DateFormatter";

const NotificationMenu = () => {
  const notifications = useNotifications();

  return (
    <div className={styles.menu}>
      <div className={styles.header}>
        <h3>Notifications</h3>

        {notifications.some((notification) => !notification.read) && (
          <button
            type="button"
            className={styles.markAllButton}
            onClick={() => NotificationManager.markAllAsRead()}
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className={styles.empty}>No notifications yet.</div>
      ) : (
        <div className={styles.list}>
          {notifications.map((notification) => (
            <button
              type="button"
              key={notification.id}
              className={`${styles.item} ${
                !notification.read ? styles.unread : ""
              }`}
              onClick={() => {
                NotificationManager.markAsRead(notification.id);
              }}
            >
              {!notification.read && (
                <span className={styles.unreadIndicator} aria-hidden="true" />
              )}
              <div className={styles.content}>
                <div className={styles.itemHeader}>
                  <strong>{notification.title}</strong>

                  <span className={styles.time}>
                    {DateFormatter.formatRelative(notification.createdAt)}
                  </span>
                </div>

                <p>{notification.message}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;
