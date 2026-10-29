# Redesign: `redesign/elite`

An editorial redesign of Nezira's portfolio. It keeps her rose / lilac / cream identity,
her stack (Next.js 16, React 19, Tailwind v4, next-themes, Resend) and every fact from the
old site. Nothing is pushed. **Publishing needs Nezira's permission.**

Open questions are in [`QUESTIONS_FOR_NEZIRA.md`](./QUESTIONS_FOR_NEZIRA.md). The most
important one: the "2× Hackathon winner" stat conflicts with the two hackathon certificates
on the site, which both say "Certificate of Participation".

## Run it

```bash
npm ci
npm run dev          # http://localhost:3000 (3001 here; 3000 was taken); TODO(nezira) notes are visible here
npm run build && npm start   # production view; TODO notes are hidden
```

The contact form needs `RESEND_API_KEY` and `CONTACT_EMAIL` (unchanged). Without them the
site now builds anyway, and the form says it's temporarily unavailable.

## Editing content

All text, links, projects, experience, education, skills and certificates live in
**`lib/data.ts`**. Components only render it. `/cv.md`, `/llms.txt`, the print CV, JSON-LD and
the sitemap are generated from the same file, so one edit updates everything.

Unconfirmed details are strings starting with `TODO(nezira):`. They render as dashed
lilac notes in development and are omitted from production builds.

## What changed and why

### Design system
- **Palette kept, tuned for contrast.** Same primary scale and accents. Pink text uses
  600 in light mode and 300 in dark mode so body-size text passes WCAG AA. Lilac is used
  for tags, glows and gradients, with a darker lilac for text.
- **Typography.** Instrument Serif (with italics for accent words) for display, Geist for
  body, Geist Mono for labels. Fluid `clamp()` scale (`text-display`, `text-h2`, `text-h3`, `text-lead`).
- **Signature details.** Rose→lilac underline that draws in on link hover, gradient hairline
  border on card hover, arch-framed portrait, gradient section dividers.
- **Background.** The molten glow is now pure CSS (no per-frame JavaScript), much fainter,
  hidden on mobile and still under reduced motion. The cursor grid no longer re-renders React
  on every mouse move, and it's off on touch devices.

### Information architecture (new order)
Navbar → Hero + highlights strip → About + stats → Selected work → More projects →
Experience → How I work + recruiter FAQ → Skills → Education → Awards → Contact → Footer.

| Section | Before | After |
|---|---|---|
| Navbar | "Nezira W." pill, 5 links | "Nezira *Worku*" wordmark, active-section indicator, glass on scroll, ⌘K button, Résumé button, accessible mobile menu (Esc, aria-expanded) |
| Hero | Hidden lowercase h1, Carter One headline | Real h1 with her name, role line, value line, availability badge, live Addis Ababa time, arch photo, 3 CTAs (magnetic primary) |
| Highlights | — | Strip: Odoo/ERP internship · Team Lead at Innobiz K · Lead Dev at HMSA · both 2026 hackathons |
| Stats | Static, "5th year" | Removed |
| Projects | Timeline cards, tech icons only on hover | Case-study cards: outcome line, context, role (when known), stack chips, links, NDA tag, "Read case study" |
| Case studies | — | `/work/[slug]`: Problem → Role → Architecture → Challenges → Outcome → Stack, plus next-project link |
| Experience | HMSA first | Async Tech (strongest engineering role) first; bullets + tech chips |
| How I work | — | 4 steps + "Questions recruiters ask" accordion (availability, GMT+3, strongest stack, teamwork) |
| Skills | 3 marquees, every logo rendered 4× | Grouped grid: Languages, Frontend, Backend & ERP, Data, Cloud & DevOps, Tools; lilac hover glow |
| Education | Timeline | "An engineer who understands business": degree cards + programs list |
| Certificates | Auto-scrolling carousel (20 ms interval) | Filterable gallery (Hackathons / Technical / Leadership), hackathons featured, keyboard lightbox (← → Esc, focus returns) |
| Contact | Unlabelled inputs | Labelled fields, honeypot, client + server validation, loading/success/error states, copy-handle button, social cards |
| Footer | Inside contact | "© 2026 Nezira Worku · Crafted with love", social icons, back-to-top |
| 404 | Default | Custom page in her style |

### Interaction extras
- **Command palette** (⌘K / Ctrl+K or `/`): jump to sections, toggle theme, open résumé,
  copy Telegram username (email once she publishes one), print CV, open socials.
- **Keyboard shortcuts** with a `?` help dialog: `W` `E` `S` `D` `A` `C` jump to sections,
  `T` theme, `R` résumé.
- **Theme toggle** cross-fades with the View Transitions API where supported. No flash on load (next-themes).
- **Scroll reveal** (fade + 12px rise, once). It uses IntersectionObserver and CSS rather than
  framer-motion: framer's `whileInView` didn't fire when landing on a `/#section` link, and
  dropping it removed a dependency. Content stays visible without JavaScript.

### Recruiter + SEO
- Title "Nezira Worku — Software Engineer & Product Builder", description, canonical,
  Open Graph (`profile`) and Twitter cards with `@Nezira_Worku`.
- Generated **OG/Twitter image** (1200×630, her palette and photo) and a monogram favicon + Apple icon.
- **JSON-LD `Person`** with jobTitle, sameAs, alumniOf, address and knowsAbout.
- `robots.txt`, sitemap (home, case studies, cv.md), `theme-color` for both themes.
- **`/cv.md`** and **`/llms.txt`**: plain-text résumé for ATS parsers and AI tools.
- **Print stylesheet.** Printing the home page gives a one-page A4 CV (it was 11 pages).

### Fixes to existing behaviour
- `npm run build` failed without `RESEND_API_KEY` because the client was created at import time.
- The existing lint error (`any` in CursorGrid) and both warnings are gone.
- The AWS skill icon (CDN) returned 403. All skill icons are now self-hosted in `/public/icons`.
- The certificate carousel scrolled on a 20 ms `setInterval` forever. That kept the main thread
  busy and made Lighthouse unable to measure LCP.
- The contact API now ignores honeypot submissions, validates lengths, and returns 429 with
  `Retry-After` on bursts. The rate limit is best-effort, per serverless instance.
- `next/image` everywhere with width/height/alt/sizes. AVIF is served first. The hero loads with
  `fetchPriority="high"` (`priority` is deprecated in Next 16).

## Second round (feedback from review)
- Hero fills the first screen with the highlights strip at the bottom and lines up with the
  navbar. The long intro paragraph is gone; a short facts row (latest role, both degrees,
  pulled from lib/data.ts) sits under the buttons. The photo is a rectangular framed card
  with rose corner brackets and an "Addis Ababa · GMT+3 · live time" caption.
- Stats row removed.
- Work: heading is now "Selected works", intro line removed, Role/Stack rows removed from
  cards; each card instead shows "The problem" and "How it's built" from the case study. Hovering (or focusing) a project slides in a pill of tech logos with name tooltips;
  case-study pages show the same pill on the screenshot and logo chips under "Stack".
- Custom cursor: a small rose square with a soft lilac glow that opens into an outline over
  links (mouse only; native cursor inside dialogs and text fields).
- Certificates: compact two-column list instead of the image grid and filters; clicking a row
  opens the existing lightbox.
- Contact: email (neziraworku198@gmail.com) with a Copy button, phone row, and GitHub /
  LinkedIn / X / Telegram buttons. The email is also in the footer, print CV, /cv.md and JSON-LD.

## Quality checks

| Check | Result |
|---|---|
| `npm run build` | ✅ passes (failed before without env vars) |
| `npm run lint` | ✅ 0 errors, 0 warnings (before: 1 error, 2 warnings) |
| TypeScript | ✅ no `any` added |
| axe-core (WCAG 2.1 AA + best practice) | ✅ 0 violations: home, case study, 404 × light/dark × 390/1440 px |
| Horizontal overflow | ✅ none at 320, 360, 390, 414, 768, 1024, 1280, 1440 and 1920 px |
| External links | ✅ all resolve (LinkedIn answers 999 to bots, which is normal; the Render backend cold-starts in ~60 s) |
| Keyboard | ✅ palette, shortcuts, lightbox (arrows, Esc, focus return), mobile menu (Esc), skip link, visible focus rings |

### Lighthouse (mobile, production build, localhost)

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Before: home | 0–49 ¹ | 94 | 96 | 100 |
| After: home | 49–70 (default) · **78–89** (calibrated) | **100** | **100** | **100** |
| After: case study | 64–65 (default) · **90–94** (calibrated) | **100** | **100** | **100** |

¹ The old home page often scored 0 because LCP never settled while the carousel kept scrolling.
Total blocking time was about 93 s before and is about 0.2–0.4 s calibrated after.

**About the Performance numbers.** These were measured on a loaded development laptop. Its
Lighthouse `benchmarkIndex` was about 420–500, while Lighthouse's default 4× CPU slowdown
assumes a fast desktop (~1500+). The "calibrated" runs use `cpuSlowdownMultiplier=1.2` to
approximate a mid-range phone on this hardware. The **≥ 90 mobile Performance target is not yet
confirmed**. Run PageSpeed Insights against a Vercel preview deployment for authoritative
numbers. The remaining cost is mostly React hydration plus the hero photo.

## Not done / follow-ups
- Case studies are thin until Nezira answers the questions. TODO sections are hidden in production.
- Confirm or change the "2× Hackathon winner" stat (see questions #1).
- Mobile Performance ≥ 90 still needs to be confirmed on a real deployment (see above).
- `AGENTS.md` / `CLAUDE.md` are generated by `next dev` for AI coding agents. They're left
  uncommitted for Nezira to decide.

## Screenshots
`redesign-screenshots/after/`: every section in light + dark at desktop (1440) and mobile
(390), plus a case study, the 404 page and the command palette. These are production builds,
so TODO notes don't appear.
`redesign-screenshots/before/`: full-page captures of the original site.

## Commits
Small logical commits on `redesign/elite`, starting from `dbc5212` (the original `main`).
