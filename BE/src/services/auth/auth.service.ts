import { ErrorCode } from "../../constants/index.js";
import type { AuthResponseDto, AuthUserDto } from "../../dto/auth/auth-response.dto.js";
import type { LoginDto } from "../../dto/auth/login.dto.js";
import type { RegisterDto } from "../../dto/auth/register.dto.js";
import { AuthError } from "../../errors/AuthError.js";
import { UserModel } from "../../models/User.js";
import { generateToken } from "../../utils/jwt.js";
import { comparePassword, hashPassword } from "../../utils/password.js";

export class AuthService {
  static async register(data: RegisterDto): Promise<AuthUserDto> {
    const email = data.email.trim().toLowerCase();

    const existingUser = await UserModel.findOne({
      email,
    });

    if (existingUser) {
      throw new AuthError(
        ErrorCode.EMAIL_ALREADY_EXISTS,
        409,
        "A user with this email already exists.",
      );
    }

    const passwordHash = await hashPassword(data.password);

    const user = await UserModel.create({
      name: data.name.trim(),
      email,
      passwordHash,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  static async login(data: LoginDto): Promise<AuthResponseDto> {
    const email = data.email.trim().toLowerCase();

    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      throw new AuthError(
        ErrorCode.INVALID_CREDENTIALS,
        401,
        "Invalid email or password.",
      );
    }

    const isPasswordValid = await comparePassword(
      data.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new AuthError(
        ErrorCode.INVALID_CREDENTIALS,
        401,
        "Invalid email or password.",
      );
    }

    const token = generateToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  static async getCurrentUser(userId: string): Promise<AuthUserDto> {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AuthError(
      ErrorCode.UNAUTHORIZED,
      401,
      "User not found.",
    );
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
}
