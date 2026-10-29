import Image from "next/image";
import { skillGroups, type Skill } from "@/lib/data";

const byName = new Map<string, Skill>(skillGroups.flatMap((g) => g.skills.map((s) => [s.name, s])));

/** A row of tech logos with name tooltips. Names without an icon fall back to text. */
export function StackPill({ stack, className = "" }: { stack: string[]; className?: string }) {
  return (
    <ul className={`stack-pill ${className}`} aria-label="Built with">
      {stack.map((name) => {
        const skill = byName.get(name);
        return (
          <li key={name} className="stack-pill-item" data-label={name}>
            {skill ? (
              <>
                <Image
                  src={`/icons/${skill.icon}.svg`}
                  alt=""
                  width={18}
                  height={18}
                  unoptimized
                  className={`h-[18px] w-[18px] object-contain ${skill.mono ? "dark:invert" : ""}`}
                />
                <span className="sr-only">{name}</span>
              </>
            ) : (
              <span className="px-2 text-xs">{name}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Logo + name chips, for places with room to spell the stack out. */
export function TechChips({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((name) => {
        const skill = byName.get(name);
        return (
          <li
            key={name}
            className="flex items-center gap-2 rounded-full border border-border bg-card/70 py-1.5 pl-2 pr-3.5 text-sm text-foreground"
          >
            {skill && (
              <Image
                src={`/icons/${skill.icon}.svg`}
                alt=""
                width={18}
                height={18}
                unoptimized
                className={`h-[18px] w-[18px] object-contain ${skill.mono ? "dark:invert" : ""}`}
              />
            )}
            {name}
          </li>
        );
      })}
    </ul>
  );
}
