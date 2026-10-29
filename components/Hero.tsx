import Image from "next/image";
import { ArrowDown, FileText, MapPin, Mail } from "lucide-react";
import { education, experience, highlights, site } from "@/lib/data";
import { LocalTime } from "@/components/LocalTime";
import { Magnetic } from "@/components/motion/Magnetic";

const latest = experience[0];
const degrees = education.filter((e) => e.kind === "degree");

/** Quick facts under the CTAs, all pulled from lib/data.ts. */
const heroFacts = [
  { label: "Latest role", value: `${latest.role}, ${latest.org.replace(/ PLC$/, "")}` },
  ...degrees.map((d, i) => ({ label: i === 0 ? "Studying" : "Also studying", value: `${d.degree}, ${d.school.match(/\((.+)\)$/)?.[1] ?? d.school}` })),
];

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex h-[100svh] min-h-[36rem] flex-col overflow-x-clip pt-20 sm:pt-24">
      <div className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 items-center gap-10 px-4 py-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8 [@media(max-height:800px)]:mb-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-sm text-foreground">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-success" />
              </span>
              {site.availability}
            </span>
            <span className="relative block w-20 shrink-0 rounded-sm border border-border bg-card p-1 shadow-sm [@media(min-height:800px)]:w-24 sm:w-28 lg:hidden">
              <Image
                src={site.photo.src}
                alt=""
                width={site.photo.width}
                height={site.photo.height}
                sizes="112px"
                className="aspect-[4/5] w-full rounded-[2px] object-cover object-[50%_30%]"
              />
            </span>
          </div>

          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-accent-text sm:mb-5 sm:text-sm [@media(max-height:800px)]:mb-3">
            {site.role}
          </p>

          <h1 id="hero-title" className="font-serif text-display tracking-[-0.02em] text-foreground [@media(max-height:800px)]:text-[clamp(2.6rem,1.6rem+3.6vw,4.75rem)]">
            Nezira Worku
          </h1>

          <p className="mt-4 max-w-xl font-serif text-[clamp(1.45rem,1.1rem+1.4vw,2.2rem)] leading-[1.15] text-foreground sm:mt-6 [@media(max-height:800px)]:mt-3">
            I take your idea from <em className="text-gradient pr-1">concept</em> to production.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9 [@media(max-height:800px)]:mt-6">
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-10px_rgb(212_4_93/0.6)] transition-colors hover:bg-primary-600"
              >
                View my work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
            </Magnetic>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card/70 px-6 text-sm font-medium text-foreground transition-colors hover:border-primary-300"
            >
              <FileText className="h-4 w-4 text-accent-text" aria-hidden="true" />
              Résumé
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-foreground"
            >
              <Mail className="h-4 w-4 text-accent-text" aria-hidden="true" />
              <span className="link-draw pb-0.5">Contact</span>
            </a>
          </div>

          <dl className="mt-8 grid max-w-2xl grid-cols-1 gap-3 border-t border-border pt-5 sm:mt-10 sm:grid-cols-3 sm:gap-6 [@media(max-height:800px)]:mt-6 [@media(max-height:800px)]:pt-4">
            {heroFacts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{f.label}</dt>
                <dd className="mt-1 text-sm leading-snug text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden w-fit justify-self-end lg:col-span-5 lg:mr-3 lg:block">
          <div
            aria-hidden="true"
            data-decorative
            className="absolute -inset-10 bg-[radial-gradient(closest-side,var(--primary-200),color-mix(in_srgb,var(--lilac)_40%,transparent)_55%,transparent)] opacity-60 dark:bg-[radial-gradient(closest-side,var(--primary-800),color-mix(in_srgb,var(--lilac)_22%,transparent)_55%,transparent)] dark:opacity-50"
          />
          {/* Corner brackets */}
          <span aria-hidden="true" data-decorative className="absolute -left-3 -top-3 h-5 w-5 border-l-2 border-t-2 border-primary-400" />
          <span aria-hidden="true" data-decorative className="absolute -right-3 -top-3 h-5 w-5 border-r-2 border-t-2 border-primary-400" />
          <span aria-hidden="true" data-decorative className="absolute -bottom-3 -left-3 h-5 w-5 border-b-2 border-l-2 border-primary-400" />
          <span aria-hidden="true" data-decorative className="absolute -bottom-3 -right-3 h-5 w-5 border-b-2 border-r-2 border-primary-400" />
          <figure className="relative rounded-md border border-border bg-card p-3 shadow-[0_24px_50px_-28px_rgb(85_2_37/0.45)]">
            <div className="relative aspect-[4/5] h-[min(52svh,25rem)] overflow-hidden rounded-sm bg-primary-50">
              <Image
                src={site.photo.src}
                alt={site.photo.alt}
                width={site.photo.width}
                height={site.photo.height}
                loading="eager"
                fetchPriority="high"
                sizes="320px"
                className="h-full w-full object-cover object-[50%_30%]"
              />
            </div>
            <figcaption className="flex items-center justify-between px-0.5 pb-0.5 pt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-accent-text" aria-hidden="true" />
                Addis Ababa
              </span>
              <span>
                {site.timeZoneLabel} · <LocalTime className="tabular-nums text-foreground" />
              </span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Highlights strip */}
      <div className="shrink-0 border-y border-border/70 bg-card/40 py-3.5 sm:py-4">
        <h2 className="sr-only">Highlights</h2>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee flex w-max motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 ? "true" : undefined}
                className={copy === 1 ? "flex motion-reduce:hidden" : "flex flex-wrap justify-center"}
              >
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-4 whitespace-nowrap px-4 text-sm text-foreground">
                    <span aria-hidden="true" className="text-lilac">✦</span>
                    {h}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
