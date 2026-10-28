"use client";

import { motion } from "framer-motion";

interface MoltenMetalProps {
  color1?: string;
  color2?: string;
  color3?: string;
}

/**
 * Soft drifting rose / lilac / cream glow behind the page.
 * Toned down to a subtle wash and hidden on small screens. The root MotionConfig
 * (reducedMotion="user") keeps it still for people who prefer reduced motion.
 */
export default function MoltenMetal({
  color1 = "#E91E63",
  color2 = "#B497CF",
  color3 = "#F2EFE9",
}: MoltenMetalProps) {
  const drift = (x: string[], y: string[], duration: number) => ({
    animate: { x, y },
    transition: { duration, repeat: Infinity, ease: "easeInOut" as const },
  });

  return (
    <div
      aria-hidden="true"
      data-decorative
      className="pointer-events-none fixed inset-0 -z-20 hidden overflow-hidden opacity-[0.22] blur-[110px] md:block dark:opacity-[0.14]"
    >
      <motion.div
        {...drift(["-10%", "15%", "-10%"], ["-15%", "5%", "-15%"], 26)}
        className="absolute left-[15%] top-[5%] h-[42vw] w-[42vw] rounded-full"
        style={{ backgroundColor: color1 }}
      />
      <motion.div
        {...drift(["15%", "-10%", "15%"], ["5%", "-15%", "5%"], 30)}
        className="absolute right-[5%] top-[35%] h-[36vw] w-[36vw] rounded-full"
        style={{ backgroundColor: color2 }}
      />
      <motion.div
        {...drift(["0%", "8%", "0%"], ["0%", "8%", "0%"], 22)}
        className="absolute bottom-[10%] left-[35%] h-[30vw] w-[30vw] rounded-full"
        style={{ backgroundColor: color3 }}
      />
    </div>
  );
}
