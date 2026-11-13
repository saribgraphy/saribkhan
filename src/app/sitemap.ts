import type { MetadataRoute } from "next";
import { notes } from "@/content/notes";
import { openProjects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * Every public page, for Google Search Console. Private audits, the CMS and
 * NDA cases are left out on purpose.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  const pages = ["/", "/work", "/build", "/working-together", "/about", "/notes", "/after-hours", "/claude-code-guide"];

  return [
    ...pages.map((p) => ({ url: url(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...openProjects.map((p) => ({ url: url(`/work/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...notes.map((n) => ({ url: url(`/notes/${n.slug}`), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
