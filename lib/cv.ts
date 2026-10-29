import { caseStudies, education, experience, isTodo, moreProjects, site, skillGroups, socials, about, certificates } from "@/lib/data";

/** Plain-text résumé generated from lib/data.ts, for ATS parsers and AI tools. */
export function cvMarkdown() {
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `${site.role} · ${site.location} (${site.timeZoneLabel})`,
    "",
    site.description,
    "",
    `- Email: ${site.email}`,
    `- Website: ${site.url}`,
    `- Résumé: ${site.resumeUrl}`,
    ...socials.filter((s) => s.href.startsWith("http")).map((s) => `- ${s.label}: ${s.href}`),
    "",
    "## About",
    "",
    ...about.paragraphs.flatMap((p) => [p, ""]),
    "## Experience",
    "",
  ];

  for (const e of experience) {
    lines.push(`### ${e.role} — ${e.org}`, `${e.date} · ${e.location} · ${e.type}`, "");
    lines.push(...e.bullets.map((b) => `- ${b}`), "", `Skills: ${e.tech.join(", ")}`, "");
  }

  lines.push("## Selected projects", "");
  for (const p of caseStudies) {
    lines.push(`### ${p.title}`, p.description, "");
    if (!isTodo(p.role)) lines.push(`Role: ${p.role}`);
    lines.push(`Stack: ${p.stack.join(", ")}`);
    lines.push(...p.links.map((l) => `- ${l.label}: ${l.href}`), "");
  }
  lines.push("Other projects:", ...moreProjects.map((p) => `- ${p.name}: ${p.href}`), "");

  lines.push("## Education", "");
  for (const e of education) lines.push(`- ${e.degree}, ${e.school} (${e.date})`);
  lines.push("", "## Skills", "");
  for (const g of skillGroups) lines.push(`- ${g.title}: ${g.skills.map((s) => s.name).join(", ")}`);
  lines.push("", "## Awards & certificates", "");
  for (const c of certificates) lines.push(`- ${c.title} (${c.issuer})`);
  lines.push("");
  return lines.join("\n");
}
