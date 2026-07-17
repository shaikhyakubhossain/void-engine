export type TextDeltaEvent = {
  type: "text.delta";
  content: string;
};

export type DoneEvent = {
  type: "done";
};

export type ConversationCreatedEvent = {
  type: "conversation.created";
  conversationId: string;
};

export type ChatEvent =
  | TextDeltaEvent
  | DoneEvent
  | ConversationCreatedEvent;