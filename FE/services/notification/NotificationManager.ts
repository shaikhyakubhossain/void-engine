import type { Notification } from "@/types";
import { NotificationStorage } from "../storage/NotificationStorage";


type Listener = (notifications: Notification[]) => void;

export class NotificationManager {
  private static listeners = new Set<Listener>();

  static getAll(): Notification[] {
    return NotificationStorage.loadAll();
  }

  static getUnread(): Notification[] {
    return this.getAll().filter(
      (notification) => !notification.read,
    );
  }

  static add(notification: Notification): void {
    NotificationStorage.save(notification);

    this.notify();
  }

  static markAsRead(id: string): void {
    const notification = this.getAll().find(
      (notification) => notification.id === id,
    );

    if (!notification || notification.read) {
      return;
    }

    NotificationStorage.save({
      ...notification,
      read: true,
    });

    this.notify();
  }

  static markAllAsRead(): void {
    const notifications = this.getAll();

    for (const notification of notifications) {
      if (!notification.read) {
        NotificationStorage.save({
          ...notification,
          read: true,
        });
      }
    }

    this.notify();
  }

  static remove(id: string): void {
    NotificationStorage.remove(id);

    this.notify();
  }

  static clear(): void {
    NotificationStorage.clear();

    this.notify();
  }

  static subscribe(listener: Listener): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private static notify(): void {
    const notifications = this.getAll();

    this.listeners.forEach((listener) => {
      listener(notifications);
    });
  }
}