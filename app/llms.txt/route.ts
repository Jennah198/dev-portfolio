import { caseStudies, site } from "@/lib/data";
import { cvMarkdown } from "@/lib/cv";

export const dynamic = "force-static";

export function GET() {
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Pages",
    "",
    `- [Portfolio](${site.url}/): overview, experience, skills, education, awards and contact`,
    ...caseStudies.map((c) => `- [${c.title} case study](${site.url}/work/${c.slug}): ${c.summary}`),
    `- [Plain-text CV](${site.url}/cv.md)`,
    "",
    "---",
    "",
    cvMarkdown(),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
