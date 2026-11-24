import { aboutBody, aboutHeading, afterHours, afterHoursHeading, afterHoursIntro, elsewhere } from "@/content/about";
import { expertise, intro, startHere, systems } from "@/content/home";
import { notes, notesHeading } from "@/content/notes";
import { engagements, faq, pricingHeading, pricingIntro, pricingSmallLine, teardown, theMath } from "@/content/pricing";
import { getProject, openProjects, workHeading, workIntro } from "@/content/projects";
import { VSL } from "@/components/agents/content";
import { problemsCopy, realEstate, realEstateLegal, realEstateMore } from "@/content/real-estate";
import { site, socials } from "@/content/site";
import { videoGuide } from "@/content/video-guide";
import { buildHeading, buildIntro, buildLabels, capabilities, touchpoints, xrayLeadIn, xrayOutro } from "@/content/touchpoints";

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
  `${site.name} · ${site.tagline}`,
  `Email: ${site.email} · WhatsApp: ${abs("/whatsapp")}`,
  `More pages: ${abs("/llms.txt")} · Sitemap: ${abs("/sitemap.xml")}`,
);

const home = () =>
  lines(
    `# ${site.name}`,
    "",
    `> ${site.headline}`,
    "",
    `**${plain(intro.lead)}**`,
    "",
    plain(intro.body),
    "",
    plain(intro.close),
    "",
    "## What I help with",
    "",
    ...expertise.map((e) => `- **${plain(e.title)}**: ${plain(e.body)}`),
    "",
    "## People I've built for",
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
    `## ${plain(buildLabels.xray)}`,
    "",
    plain(xrayLeadIn),
    "",
    ...touchpoints.map((t) => `${t.n}. **${plain(t.name)}**: ${plain(t.body)}`),
    "",
    plain(xrayOutro),
    "",
    "## Not sure what you need?",
    "",
    `Websites and landing pages, brands, custom tools and dashboards, AI for your team, ads and social content, and video. One or two of these is usually a fixed project; three or more, or ongoing content, suits the monthly partnership. Ways to work together: ${abs("/working-together")}`,
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
      e.delivery ? `${plain(e.delivery)}.` : "",
      "",
    ]),
    plain(pricingSmallLine),
    "",
    theMath && lines(plain(theMath), ""),
    `## ${plain(teardown.title)}`,
    "",
    plain(teardown.body),
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
    `${site.name} helps businesses look sharp, run smoothly and get seen online. He works with clients worldwide.`,
    "",
    `- Email: ${site.email}`,
    `- WhatsApp: ${abs("/whatsapp")}`,
    ...socials.map((s) => `- ${s.label}: ${s.href}`),
    "",
    `To start a project, include a link to your website or Instagram, what you sell and what you'd like to change. How projects run: ${abs("/working-together")}`,
    footer,
  );

const privacy = () =>
  lines(
    "# Privacy",
    "",
    "This site collects what you choose to send through its forms, plus visit statistics from Google Analytics. There are no advertising trackers, and your details are never sold or shared for marketing.",
    "",
    "## What the forms collect",
    "",
    "The project and walkthrough forms send what you type (your business, what you need help with, a link and a way to reply) by email through Resend. The free guide's waitlist stores your email address, and your name if you add it, in a private Google Sheet, and emails a copy. These details are used only to reply to you and, for the waitlist, to invite you to the Xtarc community.",
    "",
    "## Booking a call",
    "",
    "The booking calendar on the real estate pages is provided by Cal.com. When you book, Cal.com receives your name, email, any answers you give and the time you choose, along with which page and ad campaign you came from (UTM tags), and sends the booking to me. I use it only to hold the call and follow up about it.",
    "",
    "## What the site stores on your device",
    "",
    "Whether you prefer the Work page as a grid or a list, kept in local storage. Google Analytics sets its own _ga cookies to count visits.",
    "",
    "## Third parties",
    "",
    "Hosting: Vercel (standard server logs for security and reliability). Visit statistics: Google Analytics (pages viewed, referrer, rough location and device; no form contents). Email delivery: Resend. Waitlist: Google Sheets. The guide's video loads from youtube-nocookie.com only after you press play; the video on the real estate pages is served from Dribbble's file storage.",
    "",
    "## Your choices",
    "",
    `Ask to see, correct or delete anything you've sent at any time: ${site.email}.`,
    footer,
  );

const realEstatePage = () =>
  lines(
    `# ${realEstate.headline} ${realEstate.headlineMuted}`,
    "",
    `> ${realEstate.description}`,
    "",
    realEstate.lead,
    "",
    `Video (${VSL.length}): ${VSL.src}`,
    "",
    `## ${realEstateMore.definition.heading}`,
    "",
    ...realEstateMore.definition.body.flatMap((p) => [p, ""]),
    `## ${realEstate.problem.heading}`,
    "",
    realEstate.problem.sub,
    "",
    ...problemsCopy.map(([title, body]) => `- **${title}** ${body}`),
    "",
    `## ${realEstate.fixHeading}`,
    "",
    ...realEstate.fixes.map((f) => `- **${f.title}** ${f.line}`),
    "",
    `## ${realEstateMore.voice.heading}`,
    "",
    realEstateMore.voice.sub,
    "",
    ...realEstateMore.voice.points.map(([t, b]) => `- **${t}.** ${b}`),
    "",
    `## ${realEstateMore.steps.heading}`,
    "",
    ...realEstateMore.steps.items.map(([t, b], i) => `${i + 1}. **${t}** ${b}`),
    "",
    `## ${realEstateMore.markets.heading}`,
    "",
    ...realEstateMore.markets.items.map((x) => `- **${x.country}.** Answers leads from ${x.sources} Messaging rules: ${x.rules}`),
    "",
    `## ${realEstateMore.compare.heading}`,
    "",
    `| ${realEstateMore.compare.head.join(" | ")} |`,
    `|${realEstateMore.compare.head.map(() => "---").join("|")}|`,
    ...realEstateMore.compare.rows.map((r) => `| ${r.join(" | ")} |`),
    "",
    "## Client story",
    "",
    `> "${realEstate.story.quote}"`,
    `> ${realEstate.story.who}`,
    "",
    `## ${realEstate.offerLabel}`,
    "",
    ...realEstate.offer.map((o) => `- ${o}`),
    "",
    "## FAQ",
    "",
    ...realEstateMore.faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    `## ${realEstate.finalHeading}`,
    "",
    `${realEstate.finalLead} Book a free 15-minute call: ${realEstate.bookingUrl}`,
    "",
    realEstate.small,
    "",
    "---",
    "",
    ...realEstateLegal.map((t) => `_${t}_`),
    footer,
  );

const videoGuidePage = () =>
  lines(
    `# ${videoGuide.title}`,
    "",
    `> ${videoGuide.description}`,
    "",
    ...videoGuide.intro.flatMap((p) => [p, ""]),
    `Example video (${videoGuide.example.length}): ${videoGuide.example.src}`,
    "",
    videoGuide.body.trim(),
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
  "/claude-video-guide": videoGuidePage,
  "/real-estate": realEstatePage,
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
