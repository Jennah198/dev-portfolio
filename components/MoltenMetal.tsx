interface MoltenMetalProps {
  color1?: string;
  color2?: string;
  color3?: string;
}

/**
 * Soft drifting rose / lilac / cream glow behind the page.
 * Pure CSS transforms (compositor-only, no JS per frame). Hidden on small screens
 * and still under prefers-reduced-motion (see .molten-blob in globals.css).
 */
export default function MoltenMetal({
  color1 = "var(--rose)",
  color2 = "var(--lilac)",
  color3 = "var(--cream)",
}: MoltenMetalProps) {
  return (
    <div
      aria-hidden="true"
      data-decorative
      className="pointer-events-none fixed inset-0 -z-20 hidden overflow-hidden opacity-[0.22] blur-[110px] md:block dark:opacity-[0.14]"
    >
      <div
        className="molten-blob absolute left-[15%] top-[5%] h-[42vw] w-[42vw] rounded-full [animation-duration:26s]"
        style={{ backgroundColor: color1 }}
      />
      <div
        className="molten-blob absolute right-[5%] top-[35%] h-[36vw] w-[36vw] rounded-full [animation-direction:alternate-reverse] [animation-duration:30s]"
        style={{ backgroundColor: color2 }}
      />
      <div
        className="molten-blob absolute bottom-[10%] left-[35%] h-[30vw] w-[30vw] rounded-full [animation-duration:22s]"
        style={{ backgroundColor: color3 }}
      />
    </div>
  );
}
