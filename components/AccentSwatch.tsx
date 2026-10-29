"use client";

import { useSyncExternalStore } from "react";

export const ACCENTS = ["rose", "ocean", "teal", "violet", "graphite"] as const;
export type Accent = (typeof ACCENTS)[number];
const DEFAULT: Accent = "rose";

/** Inline <head> script: applies a saved accent before first paint, so it never flashes rose. */
export const accentScript = `try{var a=localStorage.getItem("accent");if(${JSON.stringify(ACCENTS.slice(1))}.indexOf(a)>-1)document.documentElement.dataset.accent=a}catch(e){}`;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-accent"] });
  return () => observer.disconnect();
}

function readAccent(): Accent {
  const value = document.documentElement.dataset.accent as Accent | undefined;
  return value && ACCENTS.includes(value) ? value : DEFAULT;
}

export function setAccent(value: Accent) {
  if (value === DEFAULT) delete document.documentElement.dataset.accent;
  else document.documentElement.dataset.accent = value;
  try {
    localStorage.setItem("accent", value);
  } catch {
    // Storage blocked (private mode): the choice just isn't remembered.
  }
}

export function nextAccent() {
  const current = readAccent();
  setAccent(ACCENTS[(ACCENTS.indexOf(current) + 1) % ACCENTS.length]);
}

/** A square showing the current accent colour; each click moves to the next palette. */
export default function AccentSwatch({ className = "" }: { className?: string }) {
  // The <html> attribute is the source of truth; null during server render.
  const accent = useSyncExternalStore(subscribe, readAccent, () => null);

  return (
    <button
      type="button"
      onClick={nextAccent}
      className={className}
      aria-label={accent ? `Accent colour: ${accent}. Switch to the next colour` : "Change accent colour"}
      title="Change accent colour"
    >
      <span className="accent-swatch block h-4 w-4 rounded-[3px]" aria-hidden="true" />
    </button>
  );
}
