"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Award, ChevronLeft, ChevronRight, Expand, Trophy, X } from "lucide-react";
import { certificates } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Awards() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const visible = certificates;
  const current = openIndex === null ? null : visible[openIndex];

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (openIndex !== null && !d.open) d.showModal();
    if (openIndex === null && d.open) d.close();
  }, [openIndex]);

  function open(i: number, el: HTMLElement) {
    opener.current = el;
    setOpenIndex(i);
  }

  function close() {
    setOpenIndex(null);
    opener.current?.focus();
  }

  const step = (dir: 1 | -1) =>
    setOpenIndex((i) => (i === null ? i : (i + dir + visible.length) % visible.length));

  return (
    <>
      <ul className="grid grid-cols-1 border-t border-border md:grid-cols-2 md:gap-x-12">
        {visible.map((c, i) => (
          <li key={c.title} className="border-b border-border">
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={(e) => open(i, e.currentTarget)}
              className="group flex w-full items-center gap-4 py-4 text-left"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
                  c.featured
                    ? "border-primary-200 bg-primary-50 text-accent-text dark:border-primary-800 dark:bg-primary-900/40"
                    : "border-border bg-card text-muted-foreground"
                )}
              >
                {c.featured ? <Trophy className="h-4 w-4" /> : <Award className="h-4 w-4" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-foreground transition-colors group-hover:text-accent-text">
                  {c.title}
                </span>
                <span className="block truncate text-sm text-muted-foreground">{c.issuer}</span>
              </span>
              <span className="hidden shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:block">
                {c.category}
              </span>
              <Expand
                className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-text"
                aria-hidden="true"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-labelledby="lightbox-title"
        onClose={() => openIndex !== null && close()}
        onClick={(e) => e.target === e.currentTarget && close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto w-[min(64rem,calc(100vw-2rem))] max-w-none rounded-3xl border border-border bg-card p-0 text-foreground shadow-2xl"
      >
        {current && (
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
              <div>
                <h3 id="lightbox-title" className="font-serif text-xl">{current.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {current.issuer} · {current.category}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="relative bg-surface">
              <Image
                src={current.image.src}
                alt={`${current.title} certificate`}
                width={current.image.width}
                height={current.image.height}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="mx-auto max-h-[70vh] w-auto object-contain p-4"
              />
              {visible.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90"
                    aria-label="Previous certificate"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90"
                    aria-label="Next certificate"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
            <p className="px-5 py-3 text-center font-mono text-xs text-muted-foreground">
              {(openIndex ?? 0) + 1} / {visible.length} · ← → to browse · Esc to close
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
