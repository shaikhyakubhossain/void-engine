"use client";

import { ReactNode } from "react";
import styles from "./Tooltip.module.scss";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  disabled?: boolean;
  className?: string;
}

export default function Tooltip({
  content,
  children,
  position = "top",
  disabled = false,
  className = "",
}: TooltipProps) {
  if (disabled) return <>{children}</>;

  return (
    <span
      className={`${styles.tooltipWrapper} ${className}`}
      data-position={position}
    >
      {children}

      <span className={styles.tooltip} role="tooltip">
        <span className={styles.glitch} data-text={content}>
          {content}
        </span>
      </span>
    </span>
  );
}