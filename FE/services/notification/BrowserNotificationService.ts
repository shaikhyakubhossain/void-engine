export class BrowserNotificationService {
  static isSupported(): boolean {
    return (
      typeof window !== "undefined" &&
      "Notification" in window
    );
  }

  static async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) {
      return "denied";
    }

    if (Notification.permission !== "default") {
      return Notification.permission;
    }

    return Notification.requestPermission();
  }

  static async show(
    title: string,
    options?: NotificationOptions,
  ): Promise<Notification | null> {
    if (!this.isSupported()) {
      return null;
    }

    const permission = await this.requestPermission();

    if (permission !== "granted") {
      return null;
    }

    return new Notification(title, options);
  }
}