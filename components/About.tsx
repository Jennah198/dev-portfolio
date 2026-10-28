import { about, stats } from "@/lib/data";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="text-accent-text">00</span> — About
          </p>
          <h2 id="about-title" className="mt-4 font-serif text-h2 tracking-tight">
            I build with <em className="text-accent-text">purpose</em>.
          </h2>
        </Reveal>
        <div className="space-y-5 text-lead text-muted-foreground lg:col-span-8">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <dl className="mt-16 grid grid-cols-2 overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col-reverse gap-2 p-6 sm:p-8 ${i % 2 === 1 ? "border-l border-border" : ""} ${i >= 2 ? "border-t border-border md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
          >
            <dt className="font-mono text-[11px] uppercase leading-snug tracking-[0.14em] text-muted-foreground">
              {s.label}
            </dt>
            <dd className="font-serif text-[clamp(2.4rem,1.8rem+2vw,3.5rem)] leading-none text-foreground">
              {s.display ?? <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
