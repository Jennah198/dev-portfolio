"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, FileText, Command, Send } from "lucide-react";
import AccentSwatch from "@/components/AccentSwatch";
import { sections, site } from "@/lib/data";
import { cn } from "@/lib/utils";

export const OPEN_PALETTE_EVENT = "open-command-palette";

/** Theme switch wrapped in a View Transition where supported, so the change cross-fades. */
export function useThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      setTheme(next);
      return;
    }
    const transition = document.startViewTransition(() => setTheme(next));
    // Rapid toggles skip the previous transition; that rejection is expected.
    transition.ready.catch(() => {});
  }, [resolvedTheme, setTheme]);
}

export default function Navbar({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const toggleTheme = useThemeToggle();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section: the last section whose top has passed the upper third of the viewport.
  useEffect(() => {
    if (!home) return;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [home]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto max-w-6xl rounded-lg border border-border/80 bg-background/70 py-2 pl-3 pr-2 backdrop-blur-xl transition-shadow duration-300 sm:pl-4 lg:px-[1.9375rem]",
          scrolled || open
            ? "shadow-[0_12px_32px_-14px_color-mix(in_srgb,var(--primary-900)_28%,transparent)]"
            : "shadow-none"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <a
            href={home ? "#top" : "/"}
            className="flex items-center gap-2.5 text-foreground"
            onClick={() => setOpen(false)}
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-serif text-[15px] italic leading-none text-primary-foreground"
            >
              NW
            </span>
            <span className="font-serif text-[1.3rem] leading-none tracking-tight">
              Nezira <span className="italic text-accent-text">Worku</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={href(s.id)}
                  aria-current={active === s.id ? "true" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm transition-colors",
                    active === s.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {s.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-rose to-lilac transition-opacity duration-300",
                      active === s.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
              className="hidden h-9 items-center gap-1 rounded-md border border-border bg-card/60 px-2.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
              aria-label="Open command palette"
              aria-keyshortcuts="Control+K Meta+K"
            >
              <Command className="h-3.5 w-3.5" aria-hidden="true" />K
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card/60 text-foreground transition-colors hover:border-primary-300"
              aria-label="Toggle dark mode"
            >
              <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
              <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
            </button>

            <AccentSwatch className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card/60 transition-colors hover:border-primary-300" />

            <a
              href={href("contact")}
              className="hidden h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.18)] transition-colors hover:bg-primary-600 sm:inline-flex"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Contact me
            </a>

            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card/60 text-foreground lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          hidden={!open}
          className="lg:hidden"
        >
          <ul className="mt-3 grid gap-1 border-t border-border/70 pt-3">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={href(s.id)}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-md px-3 py-3 text-base text-foreground hover:bg-lilac-soft"
                >
                  {s.label}
                  {active === s.id && <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-3 text-base font-medium text-primary-foreground"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Résumé
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
