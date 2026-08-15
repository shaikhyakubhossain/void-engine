"use client";

import { useToast } from "@/hooks";

import { Toast } from "./Toast";

import styles from "./ToastContainer.module.scss";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}