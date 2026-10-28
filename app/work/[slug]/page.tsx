import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TodoNote, showTodos } from "@/components/TodoNote";
import { caseStudies, isTodo, site } from "@/lib/data";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return {};
  return {
    title: `${study.title} — Case study`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title: `${study.title} · ${site.name}`, description: study.summary, url: `/work/${study.slug}` },
  };
}

const chapters = [
  { key: "problem", title: "The problem" },
  { key: "role", title: "My role" },
  { key: "architecture", title: "Architecture & decisions" },
  { key: "challenges", title: "Challenges" },
  { key: "outcome", title: "Outcome" },
] as const;

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const study = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <Navbar home={false} />
      <main id="main" tabIndex={-1} className="outline-none">
        <article id="top" className="mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All work
          </Link>

          <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
            Case study {String(index + 1).padStart(2, "0")}
          </p>
          <h1 className="mt-4 font-serif text-display tracking-[-0.02em]">{study.title}</h1>
          <p className="mt-6 max-w-2xl text-lead text-muted-foreground">{study.summary}</p>

          <dl className="mt-10 grid gap-6 border-y border-border py-6 text-sm sm:grid-cols-3">
            {(showTodos || !isTodo(study.role)) && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Role</dt>
                <dd className="mt-1.5 text-foreground">
                  {isTodo(study.role) ? <TodoNote text={study.role} /> : study.role}
                </dd>
              </div>
            )}
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Context</dt>
              <dd className="mt-1.5 text-foreground">
                {study.context}
                {study.nda && (
                  <span className="ml-2 inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" aria-hidden="true" /> NDA
                  </span>
                )}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Links</dt>
              <dd className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                {study.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-foreground"
                  >
                    <span className="link-draw pb-0.5">{l.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-accent-text" aria-hidden="true" />
                  </a>
                ))}
              </dd>
            </div>
          </dl>

          <figure className="mt-12 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-50 to-lilac-soft p-4 sm:p-8 dark:from-primary-900/40">
            <Image
              src={study.image.src}
              alt={study.image.alt}
              width={study.image.width}
              height={study.image.height}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 896px) 832px, 100vw"
              className="w-full rounded-xl shadow-xl"
            />
          </figure>

          <div className="mt-16 space-y-14">
            <section aria-labelledby="overview">
              <h2 id="overview" className="font-serif text-h3">Overview</h2>
              <p className="mt-4 text-lead text-muted-foreground">{study.description}</p>
            </section>

            {chapters.map(({ key, title }) => {
              const paragraphs = study.sections[key].filter((p) => showTodos || !isTodo(p));
              if (paragraphs.length === 0) return null;
              return (
                <section key={key} aria-labelledby={`ch-${key}`}>
                  <h2 id={`ch-${key}`} className="font-serif text-h3">{title}</h2>
                  <div className="mt-4 space-y-4 text-lead text-muted-foreground">
                    {paragraphs.map((p) => (isTodo(p) ? <TodoNote key={p} text={p} /> : <p key={p}>{p}</p>))}
                  </div>
                </section>
              );
            })}

            <section aria-labelledby="ch-stack">
              <h2 id="ch-stack" className="font-serif text-h3">Stack</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {study.stack.map((t) => (
                  <li key={t} className="rounded-full border border-lilac/50 bg-lilac-soft px-3 py-1 text-sm text-lilac-text">
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <Link
            href={`/work/${next.slug}`}
            className="gradient-border group mt-20 flex items-center justify-between gap-6 rounded-3xl border border-border bg-card/70 p-6 sm:p-8"
          >
            <span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Next case study</span>
              <span className="mt-2 block font-serif text-h3">{next.title}</span>
            </span>
            <ArrowRight className="h-6 w-6 text-accent-text transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
