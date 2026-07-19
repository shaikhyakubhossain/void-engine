import { STORAGE_KEYS } from "@/constants/storage";
import type { Conversation } from "@/types";

export class ConversationStorage {
  static loadAll(): Conversation[] {
    return this.read();
  }

  static load(id: string): Conversation | null {
    return this.read().find((conversation) => conversation.id === id) ?? null;
  }

  static save(conversation: Conversation): void {
    const conversations = this.read();

    const index = conversations.findIndex(
      (item) => item.id === conversation.id,
    );

    if (index === -1) {
      conversations.push(conversation);
    } else {
      conversations[index] = conversation;
    }

    this.write(this.sort(conversations));
  }

  static remove(id: string): void {
    const conversations = this.read().filter(
      (conversation) => conversation.id !== id,
    );

    this.write(conversations);
  }

  private static read(): Conversation[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);

    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw) as Conversation[];
    } catch (error) {
      console.error("Failed to read conversations:", error);

      return [];
    }
  }

  private static write(conversations: Conversation[]): void {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
  }

  private static sort(conversations: Conversation[]): Conversation[] {
    return conversations.sort((a, b) => b.updatedAt - a.updatedAt);
  }
}
