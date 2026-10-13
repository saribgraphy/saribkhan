export const site = {
  name: "Sarib Khan",
  tagline: "Designer for coaching brands",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Sarib Khan designs and builds the funnels, communities and internal tools of serious coaching brands.",
  email: "contact.saribkhan@gmail.com",
  whatsapp: {
    display: "+92 314 750 3578",
    number: "923147503578",
  },
  // Kept deliberately open-ended: no dates, no slot counts.
  status: "Reviewing new applications",
  timezone: "Asia/Karachi",
  city: "Karachi",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const socials = [
  { label: "Instagram", handle: "@sarib.ux", href: "https://www.instagram.com/sarib.ux" },
  { label: "LinkedIn", handle: "saribkhanux", href: "https://www.linkedin.com/in/saribkhanux" },
  { label: "Dribbble", handle: "saribgraphy", href: "https://dribbble.com/saribgraphy" },
  { label: "Framer", handle: "@saribkhan", href: "https://www.framer.com/@saribkhan" },
] as const;

export type NavItem = {
  href: string;
  label: string;
  keywords?: string[];
};

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
