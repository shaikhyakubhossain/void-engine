import type {
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
} from "./auth.types";

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Something went wrong. Please try again.",
    );
  }

  return data as T;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    return parseResponse<AuthResponse>(response);
  },

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    return parseResponse<AuthResponse>(response);
  },

  async me(): Promise<AuthResponse> {
    const response = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
    });

    return parseResponse<AuthResponse>(response);
  },

  async logout(): Promise<void> {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(
        data?.message || "Failed to log out.",
      );
    }
  },
};