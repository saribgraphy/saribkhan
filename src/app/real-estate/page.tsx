import type { Metadata, Viewport } from "next";
import { RealEstateLanding } from "@/components/agents/real-estate";
import { realEstate } from "@/content/real-estate";
import { site } from "@/content/site";
import { jsonLd, realEstateStructuredData } from "@/lib/structured-data";

/** The public, video-first page for US real estate agents. Indexed and in the sitemap. */
export const metadata: Metadata = {
  title: realEstate.title,
  description: realEstate.description,
  alternates: { canonical: realEstate.path },
  openGraph: {
    title: `${realEstate.title} · ${site.name}`,
    description: realEstate.description,
    url: realEstate.path,
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image", title: `${realEstate.title} · ${site.name}`, description: realEstate.description },
};
export const viewport: Viewport = { themeColor: "#0B0D10" };

export default function RealEstatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(realEstateStructuredData())} />
      <RealEstateLanding />
    </>
  );
}
