export type NotificationType = "response_complete";

export interface Notification {
  id: string;

  type: NotificationType;

  conversationId: string;

  title: string;

  message: string;

  createdAt: number;

  read: boolean;
}