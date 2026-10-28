import { Plus } from "lucide-react";
import { faq, workProcess } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TodoNote } from "@/components/TodoNote";

export default function HowIWork() {
  return (
    <section id="how-i-work" aria-labelledby="how-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        id="how-title"
        index="03"
        eyebrow="How I work"
        title={
          <>
            From the first conversation <em className="text-accent-text">to production</em>.
          </>
        }
      />

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {workProcess.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 0.06}>
            <div className="gradient-border h-full rounded-3xl border border-border bg-card/60 p-6">
              <span className="font-mono text-xs text-accent-text">Step {String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-serif text-2xl text-foreground">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="mt-20 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <h3 className="font-serif text-h3">Questions recruiters ask</h3>
          <p className="mt-3 text-muted-foreground">The quick answers, so you can decide fast.</p>
        </Reveal>
        <div className="divide-y divide-border border-y border-border lg:col-span-8">
          {faq.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-4 text-left text-base font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  className="h-5 w-5 shrink-0 text-accent-text transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-5 pr-8 text-[15px] leading-relaxed text-muted-foreground">
                <p>{item.a}</p>
                {item.todo && <TodoNote text={item.todo} className="mt-3" />}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
