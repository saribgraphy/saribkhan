import type { Metadata } from "next";
import { Film } from "@/components/guide/film";
import { headings, Markdown } from "@/components/guide/markdown";
import { Waitlist } from "@/components/guide/waitlist";
import { Breadcrumb, Divider, Section, SectionLabel } from "@/components/ui/view";
import { videoGuide as g } from "@/content/video-guide";
import { pageMetadata } from "@/lib/metadata";
import { jsonLd, videoGuideStructuredData } from "@/lib/structured-data";

const SHARE = { url: "/guides/claude-video/share.jpg", width: 1200, height: 630, alt: g.title };
const base = pageMetadata(g.metaTitle, g.description, g.path);
export const metadata: Metadata = {
  ...base,
  title: { absolute: g.metaTitle },
  openGraph: { ...base.openGraph, images: [SHARE], type: "article" },
  twitter: { ...base.twitter, images: [SHARE] },
};

/**
 * The free guide to making animated UI videos with Claude. The text lives in
 * src/content/video-guide.ts (Markdown) and is rendered with the guide's own
 * blocks; the example film at the top is the VSL the guide was written from.
 */
export default function ClaudeVideoGuide() {
  const contents = headings(g.body);

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(videoGuideStructuredData())} />

      <figure className="frame -mx-4 mb-10 !p-1.5 max-md:mx-0">
        <Film src={g.example.src} poster={g.example.poster} length={g.example.length} label={g.example.label} />
        <figcaption className="t-label px-2 pt-2.5 pb-1">The video this guide was written from</figcaption>
      </figure>

      <Breadcrumb trail={[{ label: "Free guide" }]} />
      <h1 className="t-display mb-6">Make animated UI videos with Claude, in your own brand.</h1>
      <div className="grid gap-4">
        {g.intro.map((p) => (
          <p key={p} className="t-lead">
            {p}
          </p>
        ))}
      </div>
      <p className="t-mono mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
        {g.meta.map((m, i) => (
          <span key={m} className="contents">
            {i > 0 ? <span className="text-faint">·</span> : null}
            {m}
          </span>
        ))}
      </p>

      <Divider />

      <Section>
        <SectionLabel>In this guide</SectionLabel>
        <ol className="grid grid-cols-2 gap-x-6 gap-y-1.5 max-sm:grid-cols-1">
          {contents.map((h, i) => (
            <li key={h.id}>
              <a href={`#${h.id}`} className="t-ui group flex gap-3 py-0.5 text-body hover:text-ink">
                <span className="t-mono text-faint group-hover:text-muted">{String(i + 1).padStart(2, "0")}</span>
                {h.text.replace(/^\d+\.\s*/, "")}
              </a>
            </li>
          ))}
        </ol>
      </Section>

      <Divider />

      <Markdown source={g.body} />

      <Divider className="my-14" />

      <Section className="mb-14 grid gap-3">
        <h2 className="text-[24px] leading-[30px] font-semibold tracking-[-0.015em] text-ink">Want Claude to do all of this for you?</h2>
        <p className="t-body">
          The UI Motion Video skill runs this whole guide for you: drop it into Claude, answer a few questions, and it sets up the
          tools, pulls your brand, writes the script, builds, checks and renders the video.{" "}
          {g.skillUrl ? null : "It isn't on sale yet. Join the waitlist below and you'll hear about it first."}
        </p>
        {g.skillUrl ? (
          <div className="mt-2">
            <a href={g.skillUrl} className="btn btn-primary">
              <span className="btn-label">Get the skill</span>
            </a>
          </div>
        ) : null}
      </Section>

      <Waitlist source="claude-video-guide" />
    </article>
  );
}
