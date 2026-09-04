"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import type {
  AuthContextValue,
  AuthStatus,
  AuthUser,
} from "./AuthContext.types";
import {
  authService,
  LoginCredentials,
  SignupCredentials,
} from "@/services/auth";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const login = useCallback(async (credentials: LoginCredentials) => {
    setStatus("loading");

    try {
      const response = await authService.login(credentials);

      setUser(response.user);
      setStatus("authenticated");
    } catch (error) {
      setUser(null);
      setStatus("unauthenticated");

      throw error;
    }
  }, []);

  const signup = useCallback(async (credentials: SignupCredentials) => {
    setStatus("loading");

    try {
      const response = await authService.signup(credentials);

      setUser(response.user);
      setStatus("authenticated");
    } catch (error) {
      setUser(null);
      setStatus("unauthenticated");

      throw error;
    }
  }, []);

  const refresh = useCallback(async () => {
  try {
    setStatus("loading");

    const response = await authService.me();

    setUser(response.user);
    setStatus("authenticated");
  } catch {
    setUser(null);
    setStatus("unauthenticated");
  }
}, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      login,
      signup,
      refresh,
    }),
    [user, status, login, signup, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
