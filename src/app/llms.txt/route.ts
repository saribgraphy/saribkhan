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
    `> ${site.name} helps businesses look sharp, run smoothly and get seen online. He is a designer and builder, co-founder of Xtarc, and works with clients worldwide. He designs brands and websites, builds custom software and AI tools, and makes ads, reels and video. Pages also return Markdown when requested with the \`Accept: text/markdown\` header.`,
    "",
    "## When to use",
    "",
    "- Hiring someone to design a brand, a website or a landing page",
    "- Building custom software, internal tools or AI workflows for a business",
    "- Making static ads, social content, reels or video",
    "- Learning who Sarib Khan or Xtarc is and what they've built",
    "- Checking the ways to work together and how projects run",
    "- Getting a free beginner guide to building and launching a website with Claude Code and Vercel",
    "- Learning to make animated UI videos, VSLs and product demos with Claude and HyperFrames",
    "- Getting an AI assistant or AI voice agent set up for a realtor in the US, Canada or Australia that answers calls, texts and portal inquiries and books showings",
    "",
    "## Pages",
    "",
    `- [Home](${abs("/")}): who Sarib is, the work and where to start`,
    `- [Work](${abs("/work")}): selected projects, opened up step by step`,
    `- [What I build](${abs("/build")}): what Sarib makes and the X-ray of a business online`,
    `- [Working together](${abs("/working-together")}): the two ways to work together and FAQ`,
    `- [About](${abs("/about")}): background and where to find Sarib online`,
    `- [Contact](${abs("/contact")}): email, WhatsApp and how to start a project`,
    `- [Free guide: build a website with Claude Code](${abs("/claude-code-guide")})`,
    `- [Free guide: make animated UI videos with Claude](${abs("/claude-video-guide")}): VSLs, product intros and demos in your own brand, every command and prompt`,
    `- [AI assistant and voice agent for real estate agents](${abs("/real-estate")}): answers every lead in seconds and books showings, for realtors in the US, Canada and Australia, live in 7 days (FAQ included)`,
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
    "## Contact",
    "",
    `- Email: ${site.email}`,
    `- WhatsApp: ${abs("/whatsapp")}`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } });
}
