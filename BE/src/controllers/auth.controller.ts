import type { Request, Response } from "express";

import { AuthService } from "../services/auth/auth.service.js";


import { createErrorResponse } from "../dto/common.dto.js";
import { ErrorCode } from "../constants/errorCodes.js";
import { AuthError } from "../errors/AuthError.js";
import type { RegisterDto } from "../dto/auth/register.dto.js";
import type { LoginDto } from "../dto/auth/login.dto.js";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

export async function register(
  req: Request,
  res: Response,
) {
  const data = req.body as RegisterDto;

  try {
    const user = await AuthService.register(data);

    return res.status(201).json({
      user,
    });
  } catch (error: unknown) {
    if (error instanceof AuthError) {
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

export async function login(
  req: Request,
  res: Response,
) {
  const data = req.body as LoginDto;

  try {
    const user = await AuthService.login(data);

    return res.status(200).json({
      user,
    });
  } catch (error: unknown) {
    if (error instanceof AuthError) {
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

export async function getCurrentUser(
  req: Request,
  res: Response,
) {
  const userId = (req as AuthenticatedRequest).userId;

  try {
    const user = await AuthService.getCurrentUser(userId);

    return res.status(200).json({
      user,
    });
  } catch (error: unknown) {
    if (error instanceof AuthError) {
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