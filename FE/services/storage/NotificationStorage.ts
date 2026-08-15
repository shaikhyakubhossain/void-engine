import { STORAGE_KEYS } from "@/constants/storage";
import type { Notification } from "@/types";

export class NotificationStorage {
  static loadAll(): Notification[] {
    if (typeof window === "undefined") {
      return [];
    }

    const stored = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);

    if (!stored) {
      return [];
    }

    try {
      return JSON.parse(stored) as Notification[];
    } catch {
      return [];
    }
  }

  static save(notification: Notification): void {
    const notifications = this.loadAll();

    const existingIndex = notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (existingIndex >= 0) {
      notifications[existingIndex] = notification;
    } else {
      notifications.unshift(notification);
    }

    localStorage.setItem(
      STORAGE_KEYS.NOTIFICATIONS,
      JSON.stringify(notifications),
    );
  }

  static remove(id: string): void {
    const notifications = this.loadAll().filter(
      (notification) => notification.id !== id,
    );

    localStorage.setItem(
      STORAGE_KEYS.NOTIFICATIONS,
      JSON.stringify(notifications),
    );
  }

  static clear(): void {
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
  }
}