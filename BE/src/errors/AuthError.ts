import { ErrorCode } from "../constants/errorCodes.js";

export class AuthError extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly status: number,
    message: string,
  ) {
    super(message);

    this.name = "AuthError";
  }
}