import { about } from "@/lib/data";
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

    </section>
  );
}
