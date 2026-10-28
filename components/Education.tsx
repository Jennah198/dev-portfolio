import { education } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export default function Education() {
  const degrees = education.filter((e) => e.kind === "degree");
  const programs = education.filter((e) => e.kind === "program");

  return (
    <section id="education" aria-labelledby="education-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        id="education-title"
        index="05"
        eyebrow="Education"
        title={
          <>
            An engineer who <em className="text-accent-text">understands business</em>.
          </>
        }
        intro="I study Software Engineering and Business Administration side by side, so I can reason about the system and the organization it serves."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {degrees.map((d, i) => (
          <Reveal key={d.school} delay={i * 0.06}>
            <article className="gradient-border h-full rounded-3xl border border-border bg-card/70 p-7 sm:p-8">
              <p className="font-mono text-sm text-accent-text">{d.date}</p>
              <h3 className="mt-3 font-serif text-h3 text-foreground">{d.degree}</h3>
              <p className="mt-1 text-foreground">{d.school}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{d.description}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {d.tags.map((t) => (
                  <li key={t} className="rounded-full border border-lilac/50 bg-lilac-soft px-2.5 py-0.5 text-xs text-lilac-text">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Programs & training</h3>
        <ul className="divide-y divide-border border-y border-border">
          {programs.map((p) => (
            <li key={p.school} className="grid gap-1 py-5 sm:grid-cols-12 sm:gap-6">
              <span className="font-mono text-sm text-accent-text sm:col-span-2">{p.date}</span>
              <span className="sm:col-span-4">
                <span className="block font-medium text-foreground">{p.degree}</span>
                <span className="text-sm text-muted-foreground">{p.school}</span>
              </span>
              <span className="text-[15px] leading-relaxed text-muted-foreground sm:col-span-6">{p.description}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
