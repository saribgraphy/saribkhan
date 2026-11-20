import type { Metadata } from "next";
import { cityFor, type CityKey } from "./cities";

const TITLE = "Never miss another lead";
const DESCRIPTION =
  "An assistant that answers your calls, texts and emails in seconds and books showings into your calendar. Live in 7 days.";

/**
 * Hidden outreach page: shared by link only, never indexed (like /muslim-ceo
 * and /remote-rizq). Each city gets its own share image from its folder's
 * opengraph-image.tsx.
 */
export function agentsMetadata(key: CityKey | null): Metadata {
  const city = cityFor(key);
  const path = key ? `/agents/${key}` : "/agents";
  return {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    alternates: { canonical: path },
    openGraph: {
      title: city.name ? `Never miss another lead in ${city.name}` : "Never miss another lead",
      description: DESCRIPTION,
      url: path,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  };
}
