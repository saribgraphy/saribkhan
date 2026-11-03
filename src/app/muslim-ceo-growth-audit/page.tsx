import type { Metadata, Viewport } from "next";
import { CoverSection } from "@/components/audits/muslim-ceo/s00-cover";
import { YouSection } from "@/components/audits/muslim-ceo/s01-you";
import { SummarySection } from "@/components/audits/muslim-ceo/s02-summary";
import { MapSection } from "@/components/audits/muslim-ceo/s03-map";
import { WebsitesSection } from "@/components/audits/muslim-ceo/s04-websites";
import { LinksSection } from "@/components/audits/muslim-ceo/s05-links";
import { SeoSection } from "@/components/audits/muslim-ceo/s06-seo";
import { FunnelSection } from "@/components/audits/muslim-ceo/s07-funnel";
import { BrandSection } from "@/components/audits/muslim-ceo/s08-brand";
import { ChannelsSection } from "@/components/audits/muslim-ceo/s09-channels";
import { ReputationSection } from "@/components/audits/muslim-ceo/s10-reputation";
import { FixSection } from "@/components/audits/muslim-ceo/s11-fix";
import { RoadmapSection } from "@/components/audits/muslim-ceo/s12-roadmap";
import { MeSection } from "@/components/audits/muslim-ceo/s13-me";
import { ReportIndex, ScreenshotZoom } from "@/components/audits/muslim-ceo/report-index";
import "./audit.css";

/**
 * A private growth audit prepared for Muslim CEO. It lives outside the site
 * shell (no sidebar, its own dark stylesheet) and is kept out of search: it is
 * shared by link only.
 */
export const metadata: Metadata = {
  title: { absolute: "Muslim CEO Growth Audit · Sarib Khan" },
  description: "A growth audit of Muslim CEO's websites, links, funnel, brand and channels, with a 12-week plan.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    title: "Muslim CEO Growth Audit",
    description: "Prepared for Muslim CEO by Sarib Khan.",
    type: "article",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F1114",
  colorScheme: "dark",
};

export default function MuslimCeoGrowthAudit() {
  return (
    <div className="audit">
      <div className="shell">
        <ReportIndex brand="Audit 001 · Muslim CEO" />
        <main>
          <CoverSection />
          <YouSection />
          <SummarySection />
          <MapSection />
          <WebsitesSection />
          <LinksSection />
          <SeoSection />
          <FunnelSection />
          <BrandSection />
          <ChannelsSection />
          <ReputationSection />
          <FixSection />
          <RoadmapSection />
          <MeSection />
        </main>
      </div>
      <ScreenshotZoom />
    </div>
  );
}
