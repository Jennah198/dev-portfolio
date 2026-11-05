import Image from "next/image";
import { skillGroups } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        id="skills-title"
        index="04"
        eyebrow="Skills"
        title={
          <>
            Tools I <em className="text-accent-text">reach for</em>.
          </>
        }
        intro="The technologies I use to build reliable, scalable and modern products, grouped by where they sit in the stack."
      />

      {/* Masonry columns: each box is only as tall as its skills, no empty space. */}
      <div className="gap-4 sm:columns-2 lg:columns-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 0.06} className="mb-4 break-inside-avoid">
            <div className="rounded-2xl border border-border bg-card/60 px-5 py-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent-text">{group.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <li
                    key={s.name}
                    className="flex items-center gap-2 rounded-full border border-border bg-background/70 py-1 pl-1.5 pr-3 text-[13px] text-foreground transition-[box-shadow,border-color] duration-300 hover:border-lilac hover:shadow-[0_0_0_4px_var(--lilac-soft),0_8px_24px_-6px_color-mix(in_srgb,var(--lilac)_55%,transparent)]"
                  >
                    <Image
                      src={`/icons/${s.icon}.svg`}
                      alt=""
                      width={20}
                      height={20}
                      unoptimized
                      className={`h-4 w-4 object-contain ${s.mono ? "dark:invert" : ""}`}
                    />
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
