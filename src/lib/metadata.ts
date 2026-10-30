import type { Metadata } from "next";
import { site } from "@/content/site";

/** The site-wide share card (app/opengraph-image.tsx). Setting openGraph on a page drops the inherited one, so it is named here. */
const image = { url: "/opengraph-image", width: 1200, height: 630, alt: site.name };

/** Strips the [placeholder] brackets used in CMS copy, and keeps link previews to one tidy sentence or two. */
const clean = (text?: string | null) => {
  const t = (text ?? "").replace(/\[|\]/g, "").replace(/\s+/g, " ").trim();
  return t.length > 200 ? `${t.slice(0, 197).replace(/\s+\S*$/, "")}…` : t;
};

/**
 * A page's title and description, repeated for link previews. Open Graph
 * doesn't inherit from `title`, so without this every shared link would show
 * the homepage's title and description.
 */
export function pageMetadata(title: string, description?: string | null): Metadata {
  const desc = clean(description) || site.description;
  const full = `${title} · ${site.name}`;
  return {
    title,
    description: desc,
    openGraph: { title: full, description: desc, siteName: site.name, type: "website", locale: "en_GB", images: [image] },
    twitter: { card: "summary_large_image", title: full, description: desc, images: [image] },
  };
}
