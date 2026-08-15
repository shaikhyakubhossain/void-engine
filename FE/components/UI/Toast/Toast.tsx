"use client";

import { useEffect } from "react";

import type { ToastProps } from "./Toast.types";
import { TOAST_ICONS } from "./Toast.constants";

import styles from "./Toast.module.scss";

export function Toast({
  toast,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (toast.duration === 0) {
      return;
    }

    const timeout = window.setTimeout(() => {
      onClose(toast.id);
    }, toast.duration);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [toast.id, toast.duration, onClose]);

  return (
    <article
      className={`${styles.toast} ${styles[toast.type]}`}
      role="alert"
    >
      <div className={styles.scanline} />

      <div className={styles.icon}>
        {TOAST_ICONS[toast.type]}
      </div>

      <div className={styles.content}>
        {toast.title && (
          <span className={styles.title}>
            {toast.title}
          </span>
        )}

        <span className={styles.message}>
          {toast.message}
        </span>
      </div>

      <button
        type="button"
        className={styles.close}
        onClick={() => onClose(toast.id)}
        aria-label="Close notification"
      >
        ×
      </button>

      {toast.duration !== 0 && (
        <div
          className={styles.progress}
          style={{
            animationDuration: `${toast.duration}ms`,
          }}
        />
      )}
    </article>
  );
}