import { ErrorCode } from "../../constants";
import type { AuthResponseDto, AuthUserDto } from "../../dto/auth/auth-response.dto";
import type { LoginDto } from "../../dto/auth/login.dto";
import type { RegisterDto } from "../../dto/auth/register.dto";
import { AuthError } from "../../errors/AuthError";
import { User } from "../../models/User";
import { generateToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/password";

export class AuthService {
  static async register(data: RegisterDto): Promise<AuthUserDto> {
    const email = data.email.trim().toLowerCase();

    const existingUser = await User.findOne({
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

    const user = await User.create({
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

    const user = await User.findOne({
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
  const user = await User.findById(userId);

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
