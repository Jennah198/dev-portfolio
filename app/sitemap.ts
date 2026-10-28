import type { MetadataRoute } from "next";
import { caseStudies, site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((c) => ({
      url: `${site.url}/work/${c.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/cv.md`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
