import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Lock } from "lucide-react";
import { caseStudies, githubProfile, isTodo, moreProjects } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Fact, showTodos } from "@/components/TodoNote";
import { GithubIcon } from "@/components/icons";

export default function Work() {
  return (
    <section aria-labelledby="work-title" id="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        id="work-title"
        index="01"
        eyebrow="Selected work"
        title={
          <>
            Systems and sites, <em className="text-accent-text">built to be used</em>.
          </>
        }
        intro="Three projects that show how I work across ERP backends and modern frontends."
      />

      <ol className="grid gap-8">
        {caseStudies.map((p, i) => (
          <Reveal as="li" key={p.slug}>
            <article className="gradient-border group grid overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur md:grid-cols-12">
              <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-lilac-soft p-4 sm:p-6 md:col-span-6 dark:from-primary-900/40">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  width={p.image.width}
                  height={p.image.height}
                  sizes="(min-width: 1152px) 560px, (min-width: 768px) 50vw, 100vw"
                  className="h-full w-full rounded-xl object-cover object-top shadow-lg transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-col p-6 sm:p-8 md:col-span-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} · {p.context}
                </p>
                <h3 className="mt-3 font-serif text-h3 text-foreground">
                  <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0 md:after:content-none">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{p.summary}</p>

                <dl className="mt-6 grid gap-3 border-t border-border pt-5 text-sm">
                  {(showTodos || !isTodo(p.role)) && (
                    <div className="flex gap-3">
                      <dt className="w-16 shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground">Role</dt>
                      <dd className="text-foreground">
                        <Fact value={p.role} />
                      </dd>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <dt className="w-16 shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground">Stack</dt>
                    <dd>
                      <ul className="flex flex-wrap gap-1.5">
                        {p.stack.map((t) => (
                          <li key={t} className="rounded-full border border-lilac/50 bg-lilac-soft px-2.5 py-0.5 text-xs text-lilac-text">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-7">
                  <Link
                    href={`/work/${p.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-600"
                  >
                    Read case study <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-foreground"
                    >
                      <span className="link-draw pb-0.5">{l.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-accent-text" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ))}
                  {p.nda && (
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                      <Lock className="h-3 w-3" aria-hidden="true" /> NDA
                    </span>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>

      <div className="mt-20">
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-serif text-h3">More projects</h3>
          <a
            href={githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="link-draw pb-0.5">More on GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-accent-text" aria-hidden="true" />
          </a>
        </Reveal>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {moreProjects.map((p, i) => (
            <Reveal as="li" key={p.href} delay={(i % 4) * 0.04}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-border group flex h-full items-start justify-between gap-3 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="text-[15px] font-medium leading-snug text-foreground">{p.name}</span>
                <ArrowUpRight
                  className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-text"
                  aria-hidden="true"
                />
                <span className="sr-only">on GitHub (opens in a new tab)</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
