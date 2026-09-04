import type { Request, Response } from "express";

import { chat } from "../services/chat.service.js";
import { saveConversation } from "../services/conversation/conversation.service.js";
import { createErrorResponse } from "../dto/common.dto.js";
import { ErrorCode } from "../constants/errorCodes.js";
import { AIProviderError } from "../errors/AIProviderError.js";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

export async function sendMessage(req: Request, res: Response) {
  const userId = (req as AuthenticatedRequest).userId;

  const {
    conversationId,
    messages,
    provider = "gemini",
    model = "gemini-2.5-flash",
    timeZone,
  } = req.body;

  const currentMessage = messages[messages.length - 1];

  let assistantContent = "";

  try {
    const stream = chat({
      provider,
      model,
      message: currentMessage.content,
      timeZone,
    });

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const event of stream) {
      if (event.type === "text.delta") {
        assistantContent += event.content;
      }

      res.write(JSON.stringify(event) + "\n");
    }

    const conversation = await saveConversation({
      userId,
      conversationId,
      userMessage: {
        id: crypto.randomUUID(),
        content: currentMessage.content,
      },
      assistantMessage: {
        id: crypto.randomUUID(),
        content: assistantContent,
        provider,
        model,
      },
    });

    if (!conversation) {
      return res
        .status(404)
        .json(
          createErrorResponse(ErrorCode.NOT_FOUND, "Conversation not found."),
        );
    }

    res.write(
      JSON.stringify({
        type: "done",
      }) + "\n",
    );

    res.end();
  } catch (error: unknown) {
    if (error instanceof AIProviderError) {
      return res
        .status(error.status)
        .json(createErrorResponse(error.code, error.message));
    }

    return res
      .status(500)
      .json(
        createErrorResponse(
          ErrorCode.INTERNAL_SERVER_ERROR,
          "An unexpected error occurred.",
        ),
      );
  }
}
