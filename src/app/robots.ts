import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Lets search engines crawl the site and points them at the sitemap. The CMS,
 * API and dev-only pages are off limits. Private audits stay crawlable so
 * search engines can read their noindex tags and keep them out of results.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/keystatic", "/api/", "/placeholders"] },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
