"use client";

import { useEffect, useRef } from "react";

interface CursorGridProps {
  color?: string;
  cellSize?: number;
  radius?: number;
  lineWidth?: number;
}

/**
 * Grid lines revealed in a soft spotlight around the cursor.
 * Writes CSS variables instead of React state, so moving the mouse
 * doesn't re-render. Hidden on touch devices and under reduced motion.
 */
export default function CursorGrid({
  color = "#E91E63",
  cellSize = 72,
  radius = 160,
  lineWidth = 1,
}: CursorGridProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        ref.current?.style.setProperty("--x", `${e.clientX}px`);
        ref.current?.style.setProperty("--y", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const mask = `radial-gradient(${radius}px circle at var(--x, -1000px) var(--y, -1000px), black 0%, transparent 100%)`;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-decorative
      className="pointer-events-none fixed inset-0 -z-10 hidden md:block"
      style={{
        backgroundImage: `linear-gradient(to right, ${color}30 ${lineWidth}px, transparent ${lineWidth}px), linear-gradient(to bottom, ${color}30 ${lineWidth}px, transparent ${lineWidth}px)`,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
