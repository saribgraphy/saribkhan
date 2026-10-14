import data from "./data/site.json";
import type { SiteData } from "./types";

// Edited in the CMS (/keystatic → Site settings).
const d = data as unknown as SiteData;

export const site = {
  name: d.name,
  tagline: d.tagline,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description: d.description,
  email: d.email,
  whatsapp: { display: d.whatsappDisplay, number: (d.whatsappNumber ?? "").replace(/\D/g, "") },
  status: d.status,
  timezone: "Asia/Karachi",
  city: d.city,
  footerLine: d.footerLine,
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const socials = d.socials.filter((s) => s.href) as { label: string; handle: string; href: string }[];

export type NavItem = {
  href: string;
  label: string;
  keywords?: string[];
};

// Structure, not copy, so it stays in code.
export const nav: NavItem[] = [
  { href: "/", label: "Home", keywords: ["start", "intro"] },
  { href: "/work", label: "Work", keywords: ["funnel", "projects", "case", "ima", "portfolio"] },
  { href: "/build", label: "What I build", keywords: ["xray", "touchpoints", "skool", "demos", "tools"] },
  {
    href: "/working-together",
    label: "Working together",
    keywords: ["price", "pricing", "cost", "book", "faq", "teardown"],
  },
  { href: "/about", label: "About", keywords: ["story", "karachi", "desk"] },
  { href: "/notes", label: "Notes", keywords: ["essays", "translator", "writing"] },
  { href: "/after-hours", label: "Built after hours", keywords: ["side projects", "apps", "tasbeeh"] },
];
