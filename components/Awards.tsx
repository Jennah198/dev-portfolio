"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Trophy, X, Expand } from "lucide-react";
import { certificates, type CertificateCategory } from "@/lib/data";
import { cn } from "@/lib/utils";

const filters: ("All" | CertificateCategory)[] = ["All", "Hackathons", "Technical", "Leadership"];

export default function Awards() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const visible = certificates.filter((c) => filter === "All" || c.category === filter);
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
      <div role="group" aria-label="Filter certificates" className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/60 text-foreground hover:border-primary-300"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((c, i) => (
          <li key={c.title} className={cn(c.featured && "lg:col-span-2")}>
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className={cn(
                "gradient-border group flex h-full w-full flex-col overflow-hidden rounded-3xl border bg-card/70 text-left",
                c.featured ? "border-primary-300 dark:border-primary-700" : "border-border"
              )}
            >
              <span className="relative block aspect-[4/3] w-full overflow-hidden bg-surface">
                <Image
                  src={c.image.src}
                  alt=""
                  fill
                  sizes={c.featured ? "(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"}
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute right-3 top-3 rounded-full bg-background/85 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <Expand className="h-4 w-4 text-foreground" aria-hidden="true" />
                </span>
              </span>
              <span className="flex flex-1 flex-col gap-1 p-5">
                {c.featured && (
                  <span className="mb-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-primary-foreground">
                    <Trophy className="h-3 w-3" aria-hidden="true" /> Hackathon
                  </span>
                )}
                <span className="font-medium text-foreground">{c.title}</span>
                <span className="text-sm text-muted-foreground">{c.issuer}</span>
              </span>
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
