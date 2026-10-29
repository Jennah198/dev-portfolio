"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, FileText, Command } from "lucide-react";
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
          "mx-auto max-w-6xl rounded-2xl border px-4 py-2.5 transition-[background-color,border-color,box-shadow] duration-300 sm:px-5 lg:px-[1.9375rem]",
          scrolled || open
            ? "border-border/70 bg-background/75 shadow-[0_8px_30px_-12px_rgb(85_2_37/0.18)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <a
            href={home ? "#top" : "/"}
            className="font-serif text-[1.45rem] leading-none tracking-tight text-foreground"
            onClick={() => setOpen(false)}
          >
            Nezira <span className="italic text-accent-text">Worku</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={href(s.id)}
                  aria-current={active === s.id ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-sm transition-colors",
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
              className="hidden h-10 items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
              aria-label="Open command palette"
              aria-keyshortcuts="Control+K Meta+K"
            >
              <Command className="h-3.5 w-3.5" aria-hidden="true" />K
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition-colors hover:border-primary-300"
              aria-label="Toggle dark mode"
            >
              <Moon className="h-[18px] w-[18px] dark:hidden" aria-hidden="true" />
              <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden="true" />
            </button>

            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-600 sm:inline-flex"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Résumé
            </a>

            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground lg:hidden"
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
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-base text-foreground hover:bg-lilac-soft"
                >
                  {s.label}
                  {active === s.id && <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />}
                </a>
              </li>
            ))}
            <li className="sm:hidden">
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-base font-medium text-primary-foreground"
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
