import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar home={false} />
      <main id="main" className="mx-auto flex min-h-dvh max-w-3xl flex-col items-start justify-center px-4 py-32 sm:px-6">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent-text">Error 404</p>
        <h1 className="mt-4 font-serif text-display tracking-[-0.02em]">
          This page took a <em className="text-gradient pr-2">different</em> path.
        </h1>
        <p className="mt-6 max-w-lg text-lead text-muted-foreground">
          The link may be old or mistyped. Everything I&apos;ve built is a click away on the home page.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary-600"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back home
          </Link>
          <Link
            href="/#work"
            className="inline-flex h-12 items-center rounded-full border border-border bg-card/70 px-6 text-sm font-medium"
          >
            See my work
          </Link>
        </div>
        <p className="mt-10 font-mono text-xs text-muted-foreground">
          Tip: press <kbd className="rounded border border-border px-1.5">⌘ K</kbd> to jump anywhere.
        </p>
      </main>
    </>
  );
}
