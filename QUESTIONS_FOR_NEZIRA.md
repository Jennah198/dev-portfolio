# Questions for Nezira

The redesign only uses facts from your previous site, résumé link and certificates.
Where something was missing or looked inconsistent, I left it out or marked it
`TODO(nezira):` in `lib/data.ts`. TODO notes show up while running `npm run dev`
and are hidden on the live site, so nothing unfinished ships.

Answer whatever you can. Each answer maps to one edit in `lib/data.ts`.

## Please check first (could be wrong on the live site)

1. **"2× Hackathon winner".** The old site says you won two hackathons. But both hackathon
   certificates on the site (H.E.R Hackathon 2026 and ALX Her Commerce Hackathon 2026) read
   **"Certificate of Participation"**. The site no longer says "winner" anywhere; it lists
   both hackathons as highlights and certificates. If you placed, tell us where (1st,
   finalist, track prize…) and we'll say so.
2. **Year of study.** The old site said "5th year Software Engineering", but ASTU is listed as
   2023 – Present, which would be about year 3. Which is correct? The site doesn't show a
   year of study until you confirm.
3. **School Management System and the NDA.** It's described as "built under NDA", but the
   frontend and backend are linked publicly. Is it OK to show these links and the screenshot?
   Was it built during the Async Tech internship (the URL says "asyncschool")?

## Missing details

4. **Your role on each case study**, and whether it was solo or team work (team size):
   School Management System, Sadam Hussien Law Office, HMSA Website.
5. **Case-study depth.** For each project, if you can:
   - What *you* built (modules, pages, integrations)
   - Key architecture decisions (e.g. how the Next.js frontend talks to Odoo, what Supabase stores)
   - The hardest problem and how you solved it
   - Real outcomes only: users, schools, modules, launch date, client feedback
6. **Public email.** The site now shows neziraworku198@gmail.com in the contact section, footer,
   CV and structured data. Please confirm this is the address you want public.
7. **Custom domain.** Any plans (e.g. `nezira.dev`)? The site URL, sitemap, OG tags and
   JSON-LD all use `https://neziraworkuu.vercel.app`. It's a single value: `site.url`.
8. **Availability.** Full-time, part-time, internship or freelance? Open to remote or relocation?
   This feeds the "Are you available?" answer in the recruiter FAQ.
9. **Async Tech dates.** "Summer 2025": which months?

## Please confirm wording and spelling

10. **"Sadam Hussien Law Office".** Is that the client's preferred spelling?
11. **"Hira Muslim Students Association"** vs **"Hira Muslim Student Association"**. Both appear
    on the old site. Which is official?
12. **Golden Age Technology** is listed as both "Remote" and "Jemo, Addis Ababa". Both correct?
13. **"How I work" steps** (Understand → Design the system → Build across the stack → Ship & iterate)
    were drafted from your About text. Do they describe how you actually work?
14. **Numbers.** The stats row (10+ projects, 5+ internships & programs) was removed for a
    cleaner layout. If you want numbers back, which ones are accurate?
15. **Skills.** Django, AWS, Azure and Google Cloud are listed. Are you comfortable being
    interviewed on each? Remove any you'd rather not be asked about.
16. **Phone number** (+251 900 004 848) is shown in the contact links, as before. Keep it public?
17. **Job title in search results.** The old structured data listed "AI engineer, automation
    engineer". There's no project on the site supporting those yet, so it now says
    "Software Engineer". Add them back if you'd like, ideally with a project to show.
18. **Certificate details.** The list shows each certificate's category (Hackathons /
    Technical / Leadership), with the HMSA STEM certificate and ALX Professional Skills under
    Leadership. Is that OK? Adding the year to each certificate would also help.
19. **Résumé format.** The résumé is a Google Doc. A PDF in `/public` would open faster and
    can't be accidentally edited by visitors. Want to switch?
