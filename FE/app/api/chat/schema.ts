import { z } from "zod";

export const ChatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});

export const SendMessageRequestSchema = z.object({
  conversationId: z.string().optional(),
  provider: z.enum(["gemini", "grok", "openai", "claude", "deepseek"]),
  model: z.string(),
  messages: z.array(ChatMessageSchema),
  timeZone: z.string().optional(),
});

export type SendMessageRequest = z.infer<typeof SendMessageRequestSchema>;
