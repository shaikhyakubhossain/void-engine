import type { Toast } from "@/context/ToastContext";

export interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}