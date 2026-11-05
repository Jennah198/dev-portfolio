"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@/lib/data";

const AUTOPLAY_MS = 4500;

/**
 * Edge-to-edge screenshot slider: swipe/scroll-snap on touch, arrows + dots
 * everywhere. Autoplays only while on screen, pauses on hover/focus, and never
 * autoplays for people who prefer reduced motion.
 */
export function ProjectSlider({
  images,
  title,
  sizes,
  priority = false,
  className = "",
}: {
  images: ProjectImage[];
  title: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const count = images.length;

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const next = (i + count) % count;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    },
    [count]
  );

  // Keep the dots in sync with swipes and smooth scrolls.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / Math.max(el.clientWidth, 1)));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (count < 2 || paused || !visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [count, paused, visible, index, go]);

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      // Callers position it (usually `absolute inset-0`); fall back to `relative` so controls still anchor.
      className={`group/slider overflow-hidden ${className || "relative"}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      <div
        ref={track}
        className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="relative h-full w-full shrink-0 snap-start"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={sizes}
              priority={priority && i === 0}
              className="object-cover"
              style={{ objectPosition: `${img.focus ?? "left"} top` }}
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          {[
            { dir: -1, label: "Previous screenshot", Icon: ChevronLeft, pos: "left-3" },
            { dir: 1, label: "Next screenshot", Icon: ChevronRight, pos: "right-3" },
          ].map(({ dir, label, Icon, pos }) => (
            <button
              key={label}
              type="button"
              onClick={() => go(index + dir)}
              aria-label={label}
              className={`absolute ${pos} top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/45 text-white backdrop-blur-sm transition-opacity duration-200 hover:bg-black/65 focus-visible:opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/slider:opacity-100`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </button>
          ))}

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/40 px-2 py-1.5 backdrop-blur-sm">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show screenshot ${i + 1}: ${img.alt}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-5 bg-white" : "w-1.5 bg-white/60 hover:bg-white/90"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
