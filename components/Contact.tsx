"use client";

import { useState, type FormEvent } from "react";
import { Check, Copy, Loader2, Send } from "lucide-react";
import { site, socials } from "@/lib/data";
import { SocialIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";

type Status = { kind: "idle" | "sending" | "success" } | { kind: "error"; message: string };

const MIN_MESSAGE = 10;
const MAX_MESSAGE = 5000;

export default function Contact() {
  const phone = socials.find((s) => s.icon === "phone");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard can be blocked; the visible text is still selectable */
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const contact = String(data.get("contact") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (contact.length < 3) {
      setStatus({ kind: "error", message: "Please add your email or Telegram username." });
      return;
    }
    if (message.length < MIN_MESSAGE) {
      setStatus({ kind: "error", message: `Please write at least ${MIN_MESSAGE} characters.` });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, message, company: data.get("company") }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Failed to send the message. Please try again.");
      }
      form.reset();
      setStatus({ kind: "success" });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Failed to send the message." });
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/80 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25";

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-surface/90 p-6 sm:p-10 lg:p-14">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="text-accent-text">07</span> — Contact
            </p>
            <h2 id="contact-title" className="mt-4 font-serif text-h2 tracking-tight">
              Ready to bring your next <em className="text-accent-text">vision</em> to life?
            </h2>
            <p className="mt-5 max-w-md text-lead text-muted-foreground">
              I&apos;m currently open to new opportunities and collaborations. Drop me a message and
              I&apos;ll get back to you.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="w-16 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Email</span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="text-[17px] text-foreground underline decoration-border underline-offset-[6px] transition-colors hover:decoration-primary"
                >
                  {site.email}
                </a>
                <button
                  type="button"
                  onClick={() => copy(site.email)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary-300 hover:text-foreground"
                >
                  {copied ? <Check className="h-4 w-4 text-success" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                  {copied ? "Copied" : "Copy"}
                  <span className="sr-only"> email address</span>
                </button>
                <span role="status" className="sr-only">
                  {copied ? "Copied to clipboard" : ""}
                </span>
              </div>
            </div>

            {phone && (
              <div className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-3">
                <span className="w-16 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Phone</span>
                <a
                  href={phone.href}
                  className="text-[17px] text-foreground underline decoration-border underline-offset-[6px] transition-colors hover:decoration-primary"
                >
                  {phone.handle}
                </a>
              </div>
            )}

            <ul className="mt-8 flex flex-wrap gap-2">
              {socials
                .filter((s) => s.href.startsWith("http"))
                .map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.handle}
                      className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-3.5 text-sm font-semibold text-foreground shadow-[0_6px_20px_-12px_color-mix(in_srgb,var(--primary-900)_30%,transparent)] transition-[border-color,transform] hover:-translate-y-0.5 hover:border-primary-300"
                    >
                      <SocialIcon icon={s.icon} className="h-[18px] w-[18px]" />
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5" aria-describedby="form-status">
              <div>
                <label htmlFor="contact-field" className="mb-2 block text-sm font-medium text-foreground">
                  Your email or Telegram username
                </label>
                <input
                  id="contact-field"
                  name="contact"
                  type="text"
                  autoComplete="email"
                  required
                  minLength={3}
                  maxLength={200}
                  placeholder="you@company.com or @username"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="message-field" className="mb-2 block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message-field"
                  name="message"
                  rows={6}
                  required
                  minLength={MIN_MESSAGE}
                  maxLength={MAX_MESSAGE}
                  placeholder="Tell me about the role or project…"
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="company-field">Company</label>
                <input id="company-field" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <button
                type="submit"
                disabled={status.kind === "sending"}
                className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status.kind === "sending" ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="h-4 w-4" aria-hidden="true" />
                )}
                {status.kind === "sending" ? "Sending…" : "Send message"}
              </button>

              <p id="form-status" role="status" aria-live="polite" className="min-h-6 text-sm">
                {status.kind === "success" && (
                  <span className="text-success">Thank you! Your message is on its way.</span>
                )}
                {status.kind === "error" && <span className="text-destructive">{status.message}</span>}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
