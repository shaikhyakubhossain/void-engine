import { z } from "zod";

export const MessageRoleSchema = z.enum([
  "user",
  "assistant",
  "system",
]);

export const ChatMessageSchema = z.object({
  id: z.string(),

  role: MessageRoleSchema,

  content: z.string(),

  createdAt: z.string().optional(),
});

export type ChatMessageSchemaType =
  z.infer<typeof ChatMessageSchema>;