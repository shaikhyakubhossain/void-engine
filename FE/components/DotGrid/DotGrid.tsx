"use client";

import { useEffect, useRef } from "react";
import styles from "./DotGrid.module.scss";

interface DotGridProps {
  rows?: number;
  cols?: number;
}

const RADIUS = 180;

export default function DotGrid({
  rows = 42,
  cols = 84,
}: DotGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const dots = Array.from(
      grid.querySelectorAll<HTMLElement>(`.${styles.dot}`)
    );

    let mouseX = -9999;
    let mouseY = -9999;
    let raf = 0;

    const update = () => {
      const rect = grid.getBoundingClientRect();

      for (const dot of dots) {
        const x = Number(dot.dataset.x);
        const y = Number(dot.dataset.y);

        const dx = mouseX - x;
        const dy = mouseY - y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const intensity = Math.max(
          0,
          1 - distance / RADIUS
        );

        dot.style.setProperty(
          "--active",
          intensity.toString()
        );
      }

      raf = requestAnimationFrame(update);
    };

    const move = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect();

      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", move);

    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className={styles.grid}
      style={
        {
          "--rows": rows,
          "--cols": cols,
        } as React.CSSProperties
      }
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;

        return (
          <span
            key={i}
            className={styles.dot}
            data-x={`${((col + 0.5) / cols) * 100}%`}
            data-y={`${((row + 0.5) / rows) * 100}%`}
          />
        );
      })}
    </div>
  );
}