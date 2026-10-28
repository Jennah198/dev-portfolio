import Image from "next/image";
import { ArrowDown, FileText, MapPin, Mail } from "lucide-react";
import { highlights, site } from "@/lib/data";
import { LocalTime } from "@/components/LocalTime";
import { Magnetic } from "@/components/motion/Magnetic";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative pt-28 sm:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-7">
          <div className="mb-8 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-sm text-foreground backdrop-blur">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-success" />
              </span>
              {site.availability}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3.5 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Addis Ababa · {site.timeZoneLabel} ·{" "}
              <LocalTime className="tabular-nums text-foreground" />
            </span>
          </div>

          <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-accent-text sm:text-sm">
            {site.role}
          </p>

          <h1 id="hero-title" className="font-serif text-display tracking-[-0.02em] text-foreground">
            Nezira Worku
          </h1>

          <p className="mt-6 max-w-xl font-serif text-[clamp(1.5rem,1.1rem+1.6vw,2.4rem)] leading-[1.15] text-foreground">
            I take your idea from <em className="text-gradient pr-1">concept</em> to production.
          </p>

          <p className="mt-5 max-w-xl text-lead text-muted-foreground">
            Software Engineering student and full-stack builder focused on reliable enterprise
            systems with Python, Odoo and PostgreSQL, and modern web apps with Next.js.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
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
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card/70 px-6 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary-300"
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
        </div>

        <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:col-span-5 lg:max-w-none lg:pl-8">
          <div
            aria-hidden="true"
            data-decorative
            className="absolute -inset-6 rounded-t-full bg-gradient-to-br from-primary-200 via-lilac/60 to-transparent opacity-70 blur-3xl dark:from-primary-800 dark:via-lilac/30 dark:opacity-50"
          />
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-white/60 bg-primary-50 shadow-[0_30px_60px_-30px_rgb(85_2_37/0.45)] ring-1 ring-primary-200/60 dark:border-white/10 dark:ring-primary-800/60">
              <Image
                src={site.photo.src}
                alt={site.photo.alt}
                width={site.photo.width}
                height={site.photo.height}
                priority
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 384px, 304px"
                className="h-full w-full object-cover object-[50%_30%]"
              />
            </div>
            <figcaption className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-card px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground shadow-sm">
              Engineer · Builder · Leader
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Highlights strip */}
      <div className="mt-20 border-y border-border/70 bg-card/40 py-4 backdrop-blur sm:mt-24">
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
