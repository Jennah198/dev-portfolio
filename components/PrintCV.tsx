import { about, caseStudies, certificates, education, experience, isTodo, site, skillGroups, socials } from "@/lib/data";

/** Compact one-page CV shown only when printing (see @media print in globals.css). */
export default function PrintCV() {
  const links = socials.filter((s) => s.href.startsWith("http"));
  return (
    <div className="print-only print-cv" aria-hidden="true">
      <header>
        <h1>{site.name}</h1>
        <p>
          {site.role} · {site.location} ({site.timeZoneLabel})
        </p>
        <p className="muted">
          {site.email} · {site.url.replace("https://", "")} · {links.map((l) => `${l.label}: ${l.href.replace(/^https:\/\/(www\.)?/, "")}`).join(" · ")}
        </p>
      </header>

      <p>{about.paragraphs[0]}</p>

      <h2>Experience</h2>
      {experience.map((e) => (
        <div key={e.org} className="item">
          <p>
            <strong>{e.role}</strong>, {e.org} <span className="muted">· {e.date} · {e.type}</span>
          </p>
          <ul>
            {e.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Selected projects</h2>
      {caseStudies.map((p) => (
        <p key={p.slug} className="item">
          <strong>{p.title}</strong>
          {!isTodo(p.role) && ` (${p.role})`} — {p.summary} <span className="muted">{p.stack.join(", ")} · {p.links[0].href.replace("https://", "")}</span>
        </p>
      ))}

      <h2>Education</h2>
      <ul>
        {education.map((e) => (
          <li key={e.school}>
            <strong>{e.degree}</strong>, {e.school} <span className="muted">· {e.date}</span>
          </li>
        ))}
      </ul>

      <h2>Skills</h2>
      <ul>
        {skillGroups.map((g) => (
          <li key={g.title}>
            <strong>{g.title}:</strong> {g.skills.map((s) => s.name).join(", ")}
          </li>
        ))}
      </ul>

      <h2>Awards & certificates</h2>
      <p>{certificates.map((c) => c.title).join(" · ")}</p>
    </div>
  );
}
