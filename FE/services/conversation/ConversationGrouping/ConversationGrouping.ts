import type { Conversation } from "@/types";

import type { ConversationGroup } from "./ConversationGrouping.types";

export class ConversationGrouping {
  static group(conversations: Conversation[]): ConversationGroup[] {
    const today: Conversation[] = [];
    const yesterday: Conversation[] = [];
    const last7Days: Conversation[] = [];
    const older: Conversation[] = [];

    for (const conversation of conversations) {
      const updated = new Date(conversation.updatedAt);
      if (this.isToday(updated)) {
        today.push(conversation);
      } else if (this.isYesterday(updated)) {
        yesterday.push(conversation);
      } else if (this.isLast7Days(updated)) {
        last7Days.push(conversation);
      } else {
        older.push(conversation);
      }
    }

    const groups = [
      {
        title: "Today",
        conversations: today,
      },
      {
        title: "Yesterday",
        conversations: yesterday,
      },
      {
        title: "Last 7 Days",
        conversations: last7Days,
      },
      {
        title: "Older",
        conversations: older,
      },
    ];

    return groups.filter((group) => group.conversations.length > 0);
  }

  private static isToday(date: Date): boolean {
    const today = new Date();

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  private static isYesterday(date: Date): boolean {
    const yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1);

    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  }

  private static isLast7Days(date: Date): boolean {
    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return date >= sevenDaysAgo;
  }
}
