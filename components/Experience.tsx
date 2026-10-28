import { MapPin } from "lucide-react";
import { experience } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        id="experience-title"
        index="02"
        eyebrow="Experience"
        title={
          <>
            Shipping code and <em className="text-accent-text">leading teams</em>.
          </>
        }
      />

      <ol className="relative ml-1 border-l border-border sm:ml-3">
        {experience.map((e, i) => (
          <Reveal as="li" key={e.org} delay={i * 0.05} className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
            <span
              aria-hidden="true"
              className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-[3px] border-background bg-gradient-to-br from-primary-500 to-lilac ring-1 ring-primary-300"
            />
            <div className="grid gap-4 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <p className="font-mono text-sm text-accent-text">{e.date}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">{e.type}</p>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-serif text-h3 text-foreground">
                  {e.role} <span className="text-muted-foreground">·</span>{" "}
                  <span className="italic">{e.org}</span>
                </h3>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {e.location}
                </p>
                <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
                  {e.bullets.map((b) => (
                    <li key={b} className="relative pl-5">
                      <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-1 w-2.5 rounded-full bg-primary-300" />
                      {b}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Skills used">
                  {e.tech.map((t) => (
                    <li key={t} className="rounded-full border border-lilac/50 bg-lilac-soft px-2.5 py-0.5 text-xs text-lilac-text">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
