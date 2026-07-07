import { randomUUID } from "crypto";

export interface ChatMessageDto {
  id: string;
  role: "assistant";
  content: string;
}

export interface CreateMessageResponse {
  message: ChatMessageDto;
}

export function createMessageResponse(
  content: string,
) {
  return {
    success: true,
    data: {
      message: {
        id: randomUUID(),
        role: "assistant",
        content,
      },
    },
  };
}