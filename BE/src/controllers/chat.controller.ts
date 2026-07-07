import type { Request, Response } from "express";

import { chat } from "../services/chat.service.js";
import { createErrorResponse } from "../dto/common.dto.js";
import { ErrorCode } from "../constants/errorCodes.js";
import { AIProviderError } from "../errors/AIProviderError.js";

export async function sendMessage(req: Request, res: Response) {
  const { messages, timeZone } = req.body;

  const currentMessage = messages[messages.length - 1];

  try {
    const stream = chat({
      message: currentMessage.content,
      timeZone,
    });

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of stream) {
      res.write(chunk);
    }

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
