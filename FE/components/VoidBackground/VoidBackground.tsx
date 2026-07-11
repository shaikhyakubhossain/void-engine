"use client";

import { useEffect, useRef } from "react";

import Renderer from "@/lib/void/Renderer";

import styles from "./VoidBackground.module.scss";

export default function VoidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new Renderer(canvas);

    renderer.start();

    return () => {
      renderer.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
    />
  );
}