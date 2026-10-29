import { ArrowDown, FileText, Mail } from "lucide-react";
import { education, experience, highlights, site } from "@/lib/data";
import { LocalTime } from "@/components/LocalTime";
import { Magnetic } from "@/components/motion/Magnetic";

const latest = experience[0];
const degrees = education.filter((e) => e.kind === "degree");
const shortSchool = (school: string) => school.match(/\((.+)\)$/)?.[1] ?? school;

/** Quick facts beside the headline, all pulled from lib/data.ts. */
const heroFacts = [
  { label: "Latest role", value: `${latest.role}, ${latest.org.replace(/ PLC$/, "")}` },
  ...degrees.map((d, i) => ({ label: i === 0 ? "Studying" : "Also studying", value: `${d.degree}, ${shortSchool(d.school)}` })),
];

// Tighten spacing on short screens so the highlights strip always stays on the first screen.
const SHORT = "[@media(max-height:780px)]";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex h-[100svh] min-h-[36rem] flex-col overflow-x-clip pt-20 sm:pt-24">
      <div className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 content-center items-end gap-10 px-4 py-6 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="lg:col-span-8">
          <span className={`mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-sm text-foreground ${SHORT}:mb-5`}>
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-success" />
            </span>
            {site.availability}
          </span>

          <p className={`mb-4 font-mono text-xs uppercase tracking-[0.22em] text-accent-text sm:mb-5 sm:text-sm ${SHORT}:mb-3`}>
            {site.role}
          </p>

          <h1
            id="hero-title"
            className={`font-serif text-[clamp(3.25rem,1.6rem+6.4vw,7.5rem)] leading-[0.95] tracking-[-0.025em] text-foreground ${SHORT}:text-[clamp(3rem,1.6rem+4.6vw,5.75rem)]`}
          >
            Nezira Worku
          </h1>

          <p
            className={`mt-5 max-w-2xl font-serif text-[clamp(1.5rem,1.1rem+1.5vw,2.4rem)] leading-[1.15] text-muted-foreground sm:mt-7 ${SHORT}:mt-4`}
          >
            I take your idea from <em className="text-gradient pr-1">concept</em> to{" "}
            <span className="text-foreground">production</span>.
          </p>

          <div className={`mt-8 flex flex-wrap items-center gap-3 sm:mt-10 ${SHORT}:mt-6`}>
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-10px_color-mix(in_srgb,var(--primary)_60%,transparent)] transition-colors hover:bg-primary-600"
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
            <a href="#contact" className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-foreground">
              <Mail className="h-4 w-4 text-accent-text" aria-hidden="true" />
              <span className="link-draw pb-0.5">Contact</span>
            </a>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-5 text-sm lg:col-span-4 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-border lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {heroFacts.map((f) => (
            <div key={f.label} className="lg:py-4 lg:first:pt-0">
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{f.label}</dt>
              <dd className="mt-1 leading-snug text-foreground">{f.value}</dd>
            </div>
          ))}
          <div className="lg:py-4 lg:last:pb-0">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Based in</dt>
            <dd className="mt-1 leading-snug text-foreground">
              Addis Ababa · {site.timeZoneLabel} · <LocalTime className="tabular-nums" />
            </dd>
          </div>
        </dl>
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
