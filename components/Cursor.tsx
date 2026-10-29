"use client";

import { useEffect, useRef } from "react";

const CLICKABLE = "a, button, summary, select, label[for], [role='button']";
const TYPING = "input, textarea, [contenteditable='true']";

/**
 * Mouse-only cursor: a small rose square trailed by a soft lilac glow.
 * It opens into an outline over anything clickable and steps aside over text
 * fields. Position is written straight to the DOM, so React never re-renders.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    const root = document.documentElement;
    const follow = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0.28;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;

    root.classList.add("has-cursor");

    const tick = () => {
      x += (tx - x) * follow;
      y += (ty - y) * follow;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.2 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!el.hasAttribute("data-visible")) {
        x = tx;
        y = ty;
        el.setAttribute("data-visible", "");
      }
      const target = e.target instanceof Element ? e.target : null;
      el.dataset.mode = target?.closest(TYPING) ? "text" : target?.closest(CLICKABLE) ? "link" : "";
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const hide = () => el.removeAttribute("data-visible");
    const press = () => el.setAttribute("data-down", "");
    const release = () => el.removeAttribute("data-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    root.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      root.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true" data-decorative>
      <span className="cursor-glow" />
      <span className="cursor-dot" />
    </div>
  );
}
