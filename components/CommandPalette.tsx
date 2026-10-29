"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Copy, ExternalLink, FileText, Keyboard, Moon, Palette, Printer, Search } from "lucide-react";
import { isTodo, sections, site, socials } from "@/lib/data";
import { OPEN_PALETTE_EVENT, useThemeToggle } from "@/components/Navbar";
import { nextAccent } from "@/components/AccentSwatch";
import { cn } from "@/lib/utils";

type Action = {
  id: string;
  label: string;
  group: "Go to" | "Actions" | "Links";
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
};

// Looked up by id (not a ref) so action closures stay pure for the React compiler.
const openHelp = () => (document.getElementById("shortcuts-dialog") as HTMLDialogElement | null)?.showModal();

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));

export default function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const toggleTheme = useThemeToggle();
  const palette = useRef<HTMLDialogElement>(null);
  const help = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState("");

  const actions = useMemo<Action[]>(() => {
    const goTo = (id: string) => {
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
      } else {
        router.push(`/#${id}`);
      }
    };
    const copyTarget = isTodo(site.email) ? socials.find((s) => s.icon === "telegram")?.handle : site.email;
    const notify = (msg: string) => {
      setToast(msg);
      setTimeout(() => setToast(""), 2200);
    };

    return [
      ...sections.map<Action>((s) => ({
        id: `go-${s.id}`,
        label: s.label,
        group: "Go to",
        hint: s.key.toUpperCase(),
        icon: ArrowRight,
        run: () => goTo(s.id),
      })),
      { id: "theme", label: "Toggle dark mode", group: "Actions", hint: "T", icon: Moon, run: toggleTheme },
      { id: "accent", label: "Change accent colour", group: "Actions", icon: Palette, run: nextAccent },
      {
        id: "resume",
        label: "Open résumé",
        group: "Actions",
        hint: "R",
        icon: FileText,
        run: () => window.open(site.resumeUrl, "_blank", "noopener,noreferrer"),
      },
      ...(copyTarget
        ? [
            {
              id: "copy",
              label: isTodo(site.email) ? "Copy Telegram username" : "Copy email",
              group: "Actions" as const,
              icon: Copy,
              run: () =>
                navigator.clipboard
                  .writeText(copyTarget)
                  .then(() => notify(`Copied ${copyTarget}`))
                  .catch(() => notify("Couldn't access the clipboard")),
            },
          ]
        : []),
      { id: "print", label: "Print as one-page CV", group: "Actions", icon: Printer, run: () => window.print() },
      {
        id: "shortcuts",
        label: "Keyboard shortcuts",
        group: "Actions",
        hint: "?",
        icon: Keyboard,
        run: openHelp,
      },
      ...socials
        .filter((s) => s.href.startsWith("http"))
        .map<Action>((s) => ({
          id: `link-${s.label}`,
          label: `${s.label} · ${s.handle}`,
          group: "Links",
          icon: ExternalLink,
          run: () => window.open(s.href, "_blank", "noopener,noreferrer"),
        })),
    ];
  }, [pathname, router, toggleTheme]);

  const results = actions.filter((a) => a.label.toLowerCase().includes(query.trim().toLowerCase()));

  function openPalette() {
    help.current?.close();
    setQuery("");
    setSelected(0);
    if (!palette.current?.open) palette.current?.showModal();
    requestAnimationFrame(() => input.current?.focus());
  }

  function runAction(a: Action) {
    palette.current?.close();
    // Let the dialog close (and restore scroll lock) before acting.
    requestAnimationFrame(a.run);
  }

  useEffect(() => {
    const onOpen = () => openPalette();
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (palette.current?.open) palette.current.close();
        else openPalette();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      if (palette.current?.open || help.current?.open) return;

      if (e.key === "?") {
        e.preventDefault();
        help.current?.showModal();
        return;
      }
      if (e.key === "/") {
        e.preventDefault();
        openPalette();
        return;
      }
      const key = e.key.toLowerCase();
      const match = actions.find((a) => a.hint?.toLowerCase() === key && a.hint !== "?");
      if (match) {
        e.preventDefault();
        match.run();
      }
    };
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, [actions]);

  const groups = (["Go to", "Actions", "Links"] as const)
    .map((g) => ({ g, items: results.filter((r) => r.group === g) }))
    .filter((x) => x.items.length > 0);

  return (
    <>
      <dialog
        ref={palette}
        aria-label="Command palette"
        onClick={(e) => e.target === e.currentTarget && palette.current?.close()}
        className="mx-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] max-w-none rounded-2xl border border-border bg-card p-0 text-foreground shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <input
            ref={input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelected((s) => Math.min(s + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelected((s) => Math.max(s - 1, 0));
              } else if (e.key === "Enter" && results[selected]) {
                e.preventDefault();
                runAction(results[selected]);
              }
            }}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[selected] ? `cmd-${results[selected].id}` : undefined}
            aria-label="Type a command or search"
            placeholder="Type a command or search…"
            className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">Esc</kbd>
        </div>
        <ul id="palette-list" role="listbox" aria-label="Commands" className="max-h-[50vh] overflow-y-auto p-2">
          {groups.map(({ g, items }) => (
            <li key={g} role="presentation">
              <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{g}</p>
              <ul role="presentation">
                {items.map((a) => {
                  const index = results.indexOf(a);
                  const Icon = a.icon;
                  return (
                    <li
                      key={a.id}
                      id={`cmd-${a.id}`}
                      role="option"
                      aria-selected={index === selected}
                      onMouseMove={() => setSelected(index)}
                      onClick={() => runAction(a)}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
                        index === selected ? "bg-lilac-soft text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span className="flex-1">{a.label}</span>
                      {a.hint && (
                        <kbd className="rounded-md border border-border px-1.5 font-mono text-[11px]">{a.hint}</kbd>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted-foreground">No results</li>}
        </ul>
      </dialog>

      <dialog
        ref={help}
        id="shortcuts-dialog"
        aria-labelledby="shortcuts-title"
        onClick={(e) => e.target === e.currentTarget && help.current?.close()}
        className="m-auto w-[min(28rem,calc(100vw-2rem))] max-w-none rounded-2xl border border-border bg-card p-6 text-foreground shadow-2xl"
      >
        <h2 id="shortcuts-title" className="font-serif text-2xl">Keyboard shortcuts</h2>
        <dl className="mt-5 grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-2.5 text-sm">
          {[
            ["⌘ K / Ctrl K", "Command palette"],
            ["/", "Command palette"],
            ...sections.map((s) => [s.key.toUpperCase(), `Go to ${s.label}`]),
            ["T", "Toggle dark mode"],
            ["R", "Open résumé"],
            ["?", "This help"],
            ["Esc", "Close"],
          ].map(([k, label]) => (
            <div key={k + label} className="contents">
              <dt>
                <kbd className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs">{k}</kbd>
              </dt>
              <dd className="text-muted-foreground">{label}</dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          onClick={() => help.current?.close()}
          className="mt-6 rounded-full border border-border px-4 py-2 text-sm"
        >
          Close
        </button>
      </dialog>

      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center">
        {toast && (
          <span className="rounded-full bg-foreground px-4 py-2 text-sm text-background shadow-lg">{toast}</span>
        )}
      </div>
    </>
  );
}
