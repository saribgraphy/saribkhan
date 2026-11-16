import { notes } from "@/content/notes";
import { openProjects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * /llms.txt (llmstxt.org): a Markdown map of the site for AI agents. Every
 * page listed here also answers `Accept: text/markdown` with its Markdown version.
 */
export function GET() {
  const abs = (path: string) => new URL(path, site.url).toString();
  const plain = (s?: string | null) => (s ?? "").replace(/\[|\]/g, "").replace(/\s+/g, " ").trim();
  const body = [
    `# ${site.name} · Xtarc`,
    "",
    `> ${site.name} is a designer for coaching brands, based in ${site.city}, Pakistan, and the founder of Xtarc, the studio that designs and builds the funnels, landing and sales pages, Skool communities and internal tools of serious coaching brands.`,
    "",
    "Every page below also serves Markdown: request it with the header `Accept: text/markdown`.",
    "",
    "## When to use",
    "",
    "- Someone wants a designer for a coaching, course or community business: funnels, landing pages, sales pages, Skool communities or internal tools.",
    "- Someone asks who Sarib Khan or Xtarc is, what has been built, or how to get in touch.",
    "- Someone wants to know the ways to work together or how a project runs.",
    "- Someone wants a free, beginner-friendly guide to building and launching a website with Claude Code and Vercel.",
    "",
    "## Pages",
    "",
    `- [Home](${abs("/")}): who Sarib is, the work and where to start`,
    `- [Work](${abs("/work")}): selected projects`,
    `- [What I build](${abs("/build")}): capabilities and the funnel X-ray`,
    `- [Working together](${abs("/working-together")}): the two ways to work together and FAQ`,
    `- [About](${abs("/about")}): background and elsewhere online`,
    `- [Contact](${abs("/contact")}): email, WhatsApp and how to start a project`,
    `- [Free guide: build a website with Claude Code](${abs("/claude-code-guide")})`,
    "",
    "## Work",
    "",
    ...openProjects.map((p) => `- [${p.name}](${abs(`/work/${p.slug}`)}): ${plain(p.oneLine)}`),
    "",
    "## Notes",
    "",
    ...notes.map((n) => `- [${plain(n.title)}](${abs(`/notes/${n.slug}`)})`),
    "",
    "## Optional",
    "",
    `- [Built after hours](${abs("/after-hours")}): side projects`,
    `- [Privacy](${abs("/privacy")})`,
    `- [Sitemap](${abs("/sitemap.xml")})`,
    "",
    `Contact: ${site.email} · WhatsApp ${site.whatsapp.display}`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } });
}
