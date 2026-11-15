import { aboutBody, aboutHeading, afterHours, afterHoursHeading, afterHoursIntro, elsewhere } from "@/content/about";
import { expertise, intro, startHere, systems } from "@/content/home";
import { notes, notesHeading } from "@/content/notes";
import { engagements, faq, pricingHeading, pricingIntro, pricingSmallLine, theMath } from "@/content/pricing";
import { getProject, openProjects, workHeading, workIntro } from "@/content/projects";
import { site, socials } from "@/content/site";
import { buildHeading, buildIntro, capabilities, touchpoints } from "@/content/touchpoints";

/**
 * Markdown versions of the site's pages, for AI agents that ask for
 * `Accept: text/markdown` (see src/proxy.ts). Built from the same content as
 * the HTML pages, so the two never drift apart.
 */

const abs = (path: string) => new URL(path, site.url).toString();
/** CMS copy can hold [bracketed placeholders]; agents get the plain text. */
const plain = (s?: string | null) => (s ?? "").replace(/\[|\]/g, "").trim();
const lines = (...parts: (string | false | null | undefined)[]) =>
  parts.filter((p) => p !== false && p !== null && p !== undefined).join("\n");

const footer = lines(
  "",
  "---",
  "",
  `${site.name} · ${site.tagline} · ${site.city}`,
  `Email: ${site.email} · WhatsApp: ${site.whatsapp.display}`,
  `More pages: ${abs("/llms.txt")} · Sitemap: ${abs("/sitemap.xml")}`,
);

const home = () =>
  lines(
    `# ${site.name}, ${site.tagline.toLowerCase()}`,
    "",
    `> ${plain(intro.lead)}`,
    "",
    plain(intro.body),
    "",
    plain(intro.close),
    "",
    "## What I do",
    "",
    ...expertise.map((e) => `- **${plain(e.title)}**: ${plain(e.body)}`),
    "",
    "## Systems I've designed for",
    "",
    systems.map((s) => (s.href ? `[${s.name}](${s.href})` : s.name)).join(", "),
    "",
    "## Start here",
    "",
    ...startHere.map((s) => `- [${plain(s.title)}](${abs(s.href)}): ${plain(s.body)}`),
    `- [Free guide: build a website with Claude Code](${abs("/claude-code-guide")})`,
    `- [Contact](${abs("/contact")})`,
    footer,
  );

const work = () =>
  lines(
    `# ${plain(workHeading)}`,
    "",
    plain(workIntro),
    "",
    ...openProjects.map((p) => `- [${p.name}](${abs(`/work/${p.slug}`)}): ${plain(p.oneLine)}`),
    footer,
  );

const caseFile = (slug: string) => {
  const p = getProject(slug);
  if (!p) return null;
  return lines(
    `# ${p.name}`,
    "",
    `> ${plain(p.oneLine)}`,
    "",
    [p.year && `Year: ${p.year}`, p.tags.length > 0 && `Tags: ${p.tags.join(", ")}`, p.liveHref && `Live: ${p.liveHref}`]
      .filter(Boolean)
      .join(" · "),
    "",
    p.situation && lines("## The situation", "", plain(p.situation), ""),
    (p.built.length > 0 || p.builtText) &&
      lines("## What I built", "", p.builtText && plain(p.builtText), ...p.built.map((b) => `- ${plain(b)}`), ""),
    `[All work](${abs("/work")})`,
    footer,
  );
};

const build = () =>
  lines(
    `# ${plain(buildHeading)}`,
    "",
    plain(buildIntro),
    "",
    "## What I make",
    "",
    ...capabilities.map((c) => `- **${plain(c.title)}** ${plain(c.body)}`),
    "",
    "## The funnel X-ray",
    "",
    ...touchpoints.map((t) => `${t.n}. **${plain(t.name)}**: ${plain(t.body)}`),
    footer,
  );

const pricing = () =>
  lines(
    `# ${plain(pricingHeading)}`,
    "",
    plain(pricingIntro),
    "",
    ...engagements.flatMap((e) => [
      `## ${plain(e.name)}`,
      "",
      `${plain(e.label)}. ${plain(e.line)}`,
      "",
      ...(e.includes ?? []).map((i) => `- ${plain(i)}`),
      "",
      `${plain(e.priceLabel)} ${plain(e.price)}${e.priceUnit ? ` ${plain(e.priceUnit)}` : ""}.${e.delivery ? ` ${plain(e.delivery)}.` : ""}`,
      "",
    ]),
    plain(pricingSmallLine),
    "",
    plain(theMath),
    "",
    "## Questions",
    "",
    ...faq.flatMap((f) => [`**${plain(f.q)}**`, "", plain(f.a), ""]),
    footer,
  );

const about = () =>
  lines(
    `# ${plain(aboutHeading)}`,
    "",
    ...aboutBody.flatMap((p) => [plain(p), ""]),
    "## Elsewhere",
    "",
    ...elsewhere.filter((e) => e.href).map((e) => `- [${e.label} ${e.handle ?? ""}](${e.href})`),
    footer,
  );

const notesIndex = () =>
  lines(
    `# ${plain(notesHeading)}`,
    "",
    ...notes.map((n) => `- [${plain(n.title)}](${abs(`/notes/${n.slug}`)}) · ${plain(n.date)}`),
    footer,
  );

const note = (slug: string) => {
  const n = notes.find((x) => x.slug === slug);
  if (!n) return null;
  return lines(`# ${plain(n.title)}`, "", `${plain(n.date)} · ${plain(n.readingTime)}`, "", ...n.paragraphs.flatMap((p) => [plain(p), ""]), footer);
};

const afterHoursPage = () =>
  lines(
    `# ${plain(afterHoursHeading)}`,
    "",
    plain(afterHoursIntro),
    "",
    ...afterHours.map((p) => `- ${p.href ? `[${p.name}](${p.href})` : p.name}: ${plain(p.body)}`),
    footer,
  );

const guide = () =>
  lines(
    "# How to build and launch a website with Claude Code (free guide)",
    "",
    "> A step-by-step guide to building a real website with Claude Code on your own computer and putting it live on Vercel, using one example project (Fade Room, a barber shop site) throughout. No coding needed.",
    "",
    "## Steps",
    "",
    "1. Install the Claude desktop app (Claude Code needs a Pro, Max, Ultra, Team or Enterprise plan).",
    "2. Install Git (Git for Windows on a PC; most Macs already have it).",
    "3. Switch from Chat to Code in the app's sidebar.",
    "4. Create a project folder and open it in a Local environment.",
    "5. Start in Plan mode, so Claude plans before it edits files.",
    "6. Describe the site in a specific prompt, then switch to Accept edits.",
    "7. Preview the site in the Browser pane and ask for changes.",
    "8. Push the code to a new GitHub repository.",
    "9. Import the repository on Vercel and deploy it.",
    "10. Keep building: forms, a domain, skills, plugins and connectors.",
    "",
    `Full guide with prompts and screenshots: ${abs("/claude-code-guide")}`,
    footer,
  );

const contact = () =>
  lines(
    "# Contact",
    "",
    `${site.name} is a designer for coaching brands, based in ${site.city}, Pakistan, working with clients worldwide.`,
    "",
    `- Email: ${site.email}`,
    `- WhatsApp: ${site.whatsapp.display} (https://wa.me/${site.whatsapp.number})`,
    ...socials.map((s) => `- ${s.label}: ${s.href}`),
    "",
    `To start a project, include a link to your current funnel or website, what you sell and what you'd like to change. Prices and how projects run: ${abs("/working-together")}`,
    footer,
  );

const privacy = () =>
  lines(
    "# Privacy",
    "",
    "This site collects only what you choose to send through its forms. There are no analytics, no advertising trackers and no tracking cookies, and your details are never sold or shared for marketing.",
    "",
    "## What the forms collect",
    "",
    "The project and funnel teardown forms send what you type (your programme, the areas you want help with, a link and a way to reply) by email through Resend. The free guide's waitlist stores your email address, and your name if you add it, in a private Google Sheet, and emails a copy. These details are used only to reply to you and, for the waitlist, to invite you to the Xtarc community.",
    "",
    "## What the site stores on your device",
    "",
    "One setting: whether you prefer the Work page as a grid or a list, kept in local storage. The site sets no cookies of its own.",
    "",
    "## Third parties",
    "",
    "Hosting: Vercel (standard server logs for security and reliability). Email delivery: Resend. Waitlist: Google Sheets. The guide's video loads from youtube-nocookie.com only after you press play.",
    "",
    "## Your choices",
    "",
    `Ask to see, correct or delete anything you've sent at any time: ${site.email}.`,
    footer,
  );

const privateAudit = () =>
  lines("# Private report", "", "This page is a private audit shared by link with one client. Open it in a browser to read it.", footer);

const PAGES: Record<string, () => string | null> = {
  "/": home,
  "/work": work,
  "/build": build,
  "/working-together": pricing,
  "/about": about,
  "/notes": notesIndex,
  "/after-hours": afterHoursPage,
  "/claude-code-guide": guide,
  "/contact": contact,
  "/privacy": privacy,
  "/muslim-ceo": privateAudit,
  "/remote-rizq": privateAudit,
};

/** The Markdown for a site path, or null when there is no such page. */
export function pageMarkdown(path: string): string | null {
  const clean = path.replace(/\/+$/, "") || "/";
  if (PAGES[clean]) return PAGES[clean]();
  const work = clean.match(/^\/work\/([^/]+)$/);
  if (work) return caseFile(work[1]);
  const n = clean.match(/^\/notes\/([^/]+)$/);
  if (n) return note(n[1]);
  return null;
}

/** The Markdown body for a page that doesn't exist. */
export function notFoundMarkdown(path: string) {
  return lines(
    "# Page not found",
    "",
    `There is no page at \`${path}\` on ${new URL(site.url).host}.`,
    "",
    `- Home: ${abs("/")}`,
    `- Every page, for agents: ${abs("/llms.txt")}`,
    `- Sitemap: ${abs("/sitemap.xml")}`,
  );
}
