import { DAY, HOUR, MINUTE, WEEK } from "./constants";

export class DateFormatter {
  static formatRelative(timestamp: number): string {
    const now = Date.now();

    const diff = now - timestamp;

    if (diff < MINUTE) {
      return "Just now";
    }

    if (diff < HOUR) {
      const minutes = Math.floor(diff / MINUTE);

      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }

    if (diff < DAY) {
      const hours = Math.floor(diff / HOUR);

      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    if (diff < 2 * DAY) {
      return "Yesterday";
    }

    if (diff < WEEK) {
      const days = Math.floor(diff / DAY);

      return `${days} day${days === 1 ? "" : "s"} ago`;
    }

    return new Date(timestamp).toLocaleDateString();
  }
}
