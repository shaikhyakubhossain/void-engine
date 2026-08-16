import type { Request, Response } from "express";

import { ErrorCode } from "../constants/errorCodes.js";
import { createErrorResponse } from "../dto/common.dto.js";
import { createConversation, deleteConversation, getConversation, getUserConversations, updateConversationTitle } from "../services/conversation.service.js";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

export async function create(
  req: Request,
  res: Response,
) {
  const userId = (req as AuthenticatedRequest).userId;

  const { title, messages } = req.body;

  try {
    const conversation = await createConversation({
      userId,
      title,
      messages,
    });

    return res.status(201).json({
      conversation,
    });
  } catch (error: unknown) {
    console.error("Failed to create conversation:", error);

    return res
      .status(500)
      .json(
        createErrorResponse(
          ErrorCode.INTERNAL_SERVER_ERROR,
          "Failed to create conversation.",
        ),
      );
  }
}

export async function getAll(
  req: Request,
  res: Response,
) {
  const userId = (req as AuthenticatedRequest).userId;

  try {
    const conversations =
      await getUserConversations(userId);

    return res.status(200).json({
      conversations,
    });
  } catch (error: unknown) {
    console.error(
      "Failed to fetch conversations:",
      error,
    );

    return res
      .status(500)
      .json(
        createErrorResponse(
          ErrorCode.INTERNAL_SERVER_ERROR,
          "Failed to fetch conversations.",
        ),
      );
  }
}

export async function getOne(
  req: Request,
  res: Response,
) {
  const userId = (req as AuthenticatedRequest).userId;
  const { id } = req.params;

  try {
    const conversation = await getConversation(
      userId,
      id as string,
    );

    if (!conversation) {
      return res
        .status(404)
        .json(
          createErrorResponse(
            ErrorCode.NOT_FOUND,
            "Conversation not found.",
          ),
        );
    }

    return res.status(200).json({
      conversation,
    });
  } catch (error: unknown) {
    console.error(
      "Failed to fetch conversation:",
      error,
    );

    return res
      .status(500)
      .json(
        createErrorResponse(
          ErrorCode.INTERNAL_SERVER_ERROR,
          "Failed to fetch conversation.",
        ),
      );
  }
}

export async function updateTitle(
  req: Request,
  res: Response,
) {
  const userId = (req as AuthenticatedRequest).userId;
  const { id } = req.params;
  const { title } = req.body;

  if (
    typeof title !== "string" ||
    !title.trim()
  ) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          ErrorCode.VALIDATION_ERROR,
          "A valid title is required.",
        ),
      );
  }

  try {
    const conversation =
      await updateConversationTitle(
        userId,
        id as string,
        title,
      );

    if (!conversation) {
      return res
        .status(404)
        .json(
          createErrorResponse(
            ErrorCode.NOT_FOUND,
            "Conversation not found.",
          ),
        );
    }

    return res.status(200).json({
      conversation,
    });
  } catch (error: unknown) {
    console.error(
      "Failed to update conversation:",
      error,
    );

    return res
      .status(500)
      .json(
        createErrorResponse(
          ErrorCode.INTERNAL_SERVER_ERROR,
          "Failed to update conversation.",
        ),
      );
  }
}

export async function remove(
  req: Request,
  res: Response,
) {
  const userId = (req as AuthenticatedRequest).userId;
  const { id } = req.params;

  try {
    const conversation =
      await deleteConversation(userId, id as string);

    if (!conversation) {
      return res
        .status(404)
        .json(
          createErrorResponse(
            ErrorCode.NOT_FOUND,
            "Conversation not found.",
          ),
        );
    }

    return res.status(204).send();
  } catch (error: unknown) {
    console.error(
      "Failed to delete conversation:",
      error,
    );

    return res
      .status(500)
      .json(
        createErrorResponse(
          ErrorCode.INTERNAL_SERVER_ERROR,
          "Failed to delete conversation.",
        ),
      );
  }
}