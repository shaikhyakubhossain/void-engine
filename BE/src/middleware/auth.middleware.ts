import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { ErrorCode } from "../constants/errorCodes.js";
import { createErrorResponse } from "../dto/common.dto.js";

interface AuthTokenPayload {
  userId: string;
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return secret;
};

export interface AuthenticatedRequest extends Request {
  userId: string;
}

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json(
        createErrorResponse(
          ErrorCode.UNAUTHORIZED,
          "Authentication required.",
        ),
      );
  }

  const token = authorization.slice("Bearer ".length);

  try {
    const payload = jwt.verify(
      token,
      getJwtSecret(),
    ) as AuthTokenPayload;

    (req as AuthenticatedRequest).userId = payload.userId;

    return next();
  } catch {
    return res
      .status(401)
      .json(
        createErrorResponse(
          ErrorCode.UNAUTHORIZED,
          "Invalid or expired authentication token.",
        ),
      );
  }
}