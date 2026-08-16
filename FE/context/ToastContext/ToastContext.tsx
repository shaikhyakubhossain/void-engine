"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  Toast,
  ToastContextValue,
  ToastOptions,
  ToastType,
} from "./ToastContext.types";

import { DEFAULT_TOAST_DURATION, DEFAULT_TOAST_POSITION, MAX_TOASTS } from "./ToastContext.constants";
import { ToastContainer } from "@/components/UI/Toast/ToastContainer";

export const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const show = useCallback(
    (type: ToastType, message: string, options?: ToastOptions) => {
      const toast: Toast = {
        id: crypto.randomUUID(),
        type,
        message,
        title: options?.title,
        duration: options?.duration ?? DEFAULT_TOAST_DURATION,
        position: options?.position ?? DEFAULT_TOAST_POSITION,
      };

      setToasts((current) => [...current, toast].slice(-MAX_TOASTS));
    },
    [],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      toasts,

      toast: {
        show,

        success: (message, options) => show("success", message, options),

        error: (message, options) => show("error", message, options),

        warning: (message, options) => show("warning", message, options),

        info: (message, options) => show("info", message, options),
      },

      removeToast,
      clearToasts,
    }),
    [toasts, show, removeToast, clearToasts],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <ToastContainer />
    </ToastContext.Provider>
  );
}
