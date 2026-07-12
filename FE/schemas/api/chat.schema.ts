import { z } from "zod";

import { ChatMessageSchema } from "../common/message.schema";

export const CreateMessageRequestSchema = z.object({
  conversationId: z.string().optional(),
  provider: z.string(),
  model: z.string(),
  messages: z.array(ChatMessageSchema).min(1),
});

export type CreateMessageRequest = z.infer<typeof CreateMessageRequestSchema>;
