import type { LoginCredentials, SignupCredentials } from "@/services/auth";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;

  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;

  refresh: () => Promise<void>;
}
