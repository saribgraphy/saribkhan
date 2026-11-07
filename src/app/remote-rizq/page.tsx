import type { Metadata, Viewport } from "next";
import { ReportIndex, RevealOnScroll, ScreenshotZoom } from "@/components/audits/report-index";
import { CoverSection } from "@/components/audits/remote-rizq/s00-cover";
import { YouSection } from "@/components/audits/remote-rizq/s01-you";
import { SummarySection } from "@/components/audits/remote-rizq/s02-summary";
import { DoorsSection } from "@/components/audits/remote-rizq/s03-doors";
import { WebsiteSection } from "@/components/audits/remote-rizq/s04-website";
import { ApplicationSection } from "@/components/audits/remote-rizq/s05-application";
import { PromisesSection } from "@/components/audits/remote-rizq/s06-promises";
import { SeoSection } from "@/components/audits/remote-rizq/s07-seo";
import { ChannelsSection } from "@/components/audits/remote-rizq/s08-channels";
import { FixSection } from "@/components/audits/remote-rizq/s09-fix";
import { RoadmapSection } from "@/components/audits/remote-rizq/s10-roadmap";
import { MeSection } from "@/components/audits/remote-rizq/s11-me";
import "@/components/audits/audit.css";

// Prefixed so the anchors stay unique if another audit is still hidden in the DOM.
const SECTIONS = [
  ["rr-you", "Who you are"],
  ["rr-summary", "The short version"],
  ["rr-doors", "Two front doors"],
  ["rr-website", "The website"],
  ["rr-application", "The application"],
  ["rr-promises", "What you promise"],
  ["rr-seo", "Tracking and SEO"],
  ["rr-channels", "Channels and reviews"],
  ["rr-fix", "What I'd fix"],
  ["rr-roadmap", "12-week roadmap"],
  ["rr-me", "About me"],
] as const;

/**
 * A private funnel audit prepared for Remote Rizq. It lives outside the site
 * shell (no sidebar, the shared dark audit stylesheet) and is kept out of
 * search: it is shared by link only.
 */
export const metadata: Metadata = {
  title: { absolute: "Remote Rizq Funnel Audit · Sarib Khan" },
  description: "A funnel audit of Remote Rizq's website, application, promises, tracking and channels, with a 12-week plan.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    title: "Remote Rizq Funnel Audit",
    description: "Prepared for Remote Rizq by Sarib Khan.",
    type: "article",
  },
};

export const viewport: Viewport = {
  themeColor: "#F6F6F3",
  colorScheme: "light",
};

export default function RemoteRizqAudit() {
  return (
    <div className="audit light no-serif">
      <div className="shell">
        <ReportIndex brand="Prepared for Remote Rizq" sections={SECTIONS} />
        <main>
          <CoverSection />
          <YouSection />
          <SummarySection />
          <DoorsSection />
          <WebsiteSection />
          <ApplicationSection />
          <PromisesSection />
          <SeoSection />
          <ChannelsSection />
          <FixSection />
          <RoadmapSection />
          <MeSection />
        </main>
      </div>
      <ScreenshotZoom />
      <RevealOnScroll />
    </div>
  );
}
