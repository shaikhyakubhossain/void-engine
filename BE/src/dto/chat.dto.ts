import { z } from "zod";
import { randomUUID } from "crypto";
import { DEFAULT_MODEL, DEFAULT_PROVIDER } from "../services/llm/defaults.js";
import { AI_PROVIDERS } from "../services/llm/types.js";

// ---------- Request ----------

export const AIProviderSchema = z.enum(AI_PROVIDERS);

export const ChatMessageRequestSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});

export const SendMessageRequestSchema = z.object({
  conversationId: z.string().optional(),

  provider: AIProviderSchema.default(DEFAULT_PROVIDER),

  model: z.string().default(DEFAULT_MODEL),

  messages: z.array(ChatMessageRequestSchema).min(1),

  timeZone: z.string().optional(),
});

export type SendMessageRequest = z.infer<typeof SendMessageRequestSchema>;

// ---------- Response ----------

export interface ChatMessageDto {
  id: string;
  role: "assistant";
  content: string;
}

export interface CreateMessageResponse {
  message: ChatMessageDto;
}

export function createMessageResponse(content: string) {
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
