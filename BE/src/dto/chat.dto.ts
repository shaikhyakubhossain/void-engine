import { randomUUID } from "crypto";

import type { ApiSuccessResponse } from "./common.dto.js";

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
): ApiSuccessResponse<CreateMessageResponse> {
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