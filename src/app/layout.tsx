import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans, Instrument_Serif, Inter } from "next/font/google";
import { Suspense } from "react";
import { ScrollReset } from "@/components/shell/scroll-reset";
import { site } from "@/content/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    siteName: site.name,
    type: "website",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#FDFDFC",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Google Analytics 4 (the site's property, first set up as "sarib.xtarc.agency"). Runs on the live site only, so previews
 * and local work never count as visits. The ID is public: it ships in every page anyway.
 */
const GA_ID = "G-0VWYWVVG9H";
const gaId = process.env.VERCEL_ENV === "production" ? (process.env.NEXT_PUBLIC_GA_ID ?? GA_ID) : undefined;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable} ${instrumentSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <Suspense fallback={null}>
          <ScrollReset />
        </Suspense>
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
