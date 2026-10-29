import { ArrowUp } from "lucide-react";
import { site, socials } from "@/lib/data";
import { SocialIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          © 2026 {site.name} · Crafted with <span className="text-accent-text">love</span>
        </p>
        <ul className="no-print flex items-center gap-1">
          {socials
            .filter((s) => !s.href.startsWith("tel:"))
            .map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-lilac-soft hover:text-foreground"
                >
                  <SocialIcon icon={s.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
        </ul>
        <a
          href="#top"
          className="no-print inline-flex items-center gap-2 text-sm text-foreground"
        >
          <span className="link-draw pb-0.5">Back to top</span>
          <ArrowUp className="h-4 w-4 text-accent-text" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
