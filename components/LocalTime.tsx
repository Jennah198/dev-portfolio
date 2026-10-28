"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";

const format = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: site.timeZone,
});

/** Live clock in Addis Ababa time. Renders nothing on the server to avoid hydration mismatch. */
export function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    const first = setTimeout(update, 0);
    const id = setInterval(update, 15_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <time className={className} suppressHydrationWarning dateTime={now?.toISOString()}>
      {now ? format.format(now) : "--:--"}
    </time>
  );
}
