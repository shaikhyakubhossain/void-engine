export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
}

export interface ToastOptions {
  title?: string;
  duration?: number;
}

export interface ToastContextValue {
  toasts: Toast[];

  toast: {
    show: (
      type: ToastType,
      message: string,
      options?: ToastOptions
    ) => void;

    success: (
      message: string,
      options?: ToastOptions
    ) => void;

    error: (
      message: string,
      options?: ToastOptions
    ) => void;

    warning: (
      message: string,
      options?: ToastOptions
    ) => void;

    info: (
      message: string,
      options?: ToastOptions
    ) => void;
  };

  removeToast: (id: string) => void;

  clearToasts: () => void;
}