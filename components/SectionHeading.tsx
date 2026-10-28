import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  id,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id: string;
}) {
  return (
    <Reveal className="mb-12 max-w-3xl md:mb-16">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="text-accent-text">{index}</span>
        <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-primary-300 to-lilac" />
        {eyebrow}
      </p>
      <h2 id={id} className="font-serif text-h2 tracking-tight text-foreground">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lead text-muted-foreground">{intro}</p>}
    </Reveal>
  );
}
