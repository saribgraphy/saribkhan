// Copy in this file is final (brief sections 5 and 6). Anything in [square
// brackets] is a placeholder Sarib fills in later and stays visible until then.

export type FunnelNode = {
  label: string;
  note?: string;
  /** Path under /public once real screenshots exist. */
  image?: string;
};

export type Project = {
  slug: string;
  name: string;
  oneLine: string;
  tags: string[];
  meta: {
    clientType: string;
    year: string;
    builtWith: string;
    live?: { label: string; href: string };
  };
  situation?: string;
  built?: string[];
  builtText?: string;
  funnel?: FunnelNode[];
  detail?: string;
  clientWords?: string;
  /** Only set when a real "before" exists. Enables the before and after slider. */
  before?: { before: string; after: string; caption: string };
  cover?: string;
};

export const projects: Project[] = [
  {
    slug: "ima-accelerator",
    name: "IMA Accelerator",
    oneLine:
      "The full system behind a fast-growing halal business coaching program, from the first ad click to inside the community.",
    tags: ["Framer", "Figma", "Coded"],
    meta: {
      clientType: "Coaching program",
      year: "[2025 to now]",
      builtWith: "Framer, Figma, Next.js, Supabase",
      live: { label: "imaccelerator.com", href: "https://www.imaccelerator.com/" },
    },
    situation:
      "IMA Accelerator teaches people to build influencer marketing agencies, and it is run under Tijarah by Eyoub El Habib. The results and the community were already real. The job was to make every place a lead or a student touches feel like the same serious brand, and to keep building whatever the team needed next.",
    built: [
      "The ads landing page and booking funnel",
      "The selection results page leads see after applying",
      "The pre-call page, split into a short “confirm your call” page at booking and a longer prep page the setter sends",
      "A brand-led homepage that explains the mission, the founder, the community and the program",
      "A coaches platform, a coded app where each coach gets a profile, testimonials, a qualification form and native call booking",
      "Paid playbooks designed as editorial, book-like PDFs",
      "Ongoing SEO implementation on the site",
    ],
    funnel: [
      {
        label: "Ad landing page",
        note: "One idea per screen and a single action. The page is built to be read on a phone in a car park, because that's where most people see it.",
      },
      {
        label: "Application",
        note: "Fewer questions, better questions. The form qualifies without feeling like an interrogation.",
      },
      {
        label: "Selection result",
        note: "Being “selected” should feel like something. This page turns a form submission into a small moment.",
      },
      {
        label: "Confirm your call",
        note: "Shown right after booking with one job only, which is getting the lead to confirm.",
      },
      {
        label: "Pre-call prep page",
        note: "Sent by the setter before the call, so the lead shows up warm, informed and already half sold.",
      },
      {
        label: "Homepage",
        note: "For people who Google the brand before they pay. It answers “is this legit” without them having to ask.",
      },
      {
        label: "Coaches platform",
        note: "Inside the community, every coach gets their own page with booking built in, which quietly turns members into coaching upsells.",
      },
      {
        label: "Playbooks",
        note: "Paid products that look like books you'd want on a shelf, not exported slides.",
      },
    ],
    detail:
      "[Pick one close-up, e.g. the confirmation state on the selection page or the coach booking card. Caption it in one sentence.]",
    clientWords: "[Real quote from Eyoub, Aman (COO) or Saleh Babuker.]",
  },
  {
    slug: "muslimpreneur",
    name: "Muslimpreneur funnel",
    oneLine:
      "A faith-forward sales funnel with a landing page, a Typeform application and a confirmation page, in dark and light themes.",
    tags: ["Framer", "Typeform"],
    meta: {
      clientType: "[Client type]",
      year: "[Year]",
      builtWith: "[Built with]",
    },
    situation:
      "The audience cared about how the business was built as much as what it promised. The copy and design had to carry faith without turning it into a gimmick.",
    builtText:
      "the landing page, a custom designed Typeform that matches the brand instead of looking like Typeform, and the confirmation page, all with dark and light versions.",
    funnel: [
      { label: "Landing page" },
      { label: "Typeform application" },
      { label: "Confirmation page" },
    ],
  },
  {
    slug: "the-cave-network",
    name: "The Cave Network",
    oneLine: "[One line on the business.]",
    tags: ["Framer"],
    meta: {
      clientType: "[Client type]",
      year: "[Year]",
      builtWith: "Framer",
      live: { label: "[Live: the-cave.framer.website]", href: "https://the-cave.framer.website" },
    },
    builtText: "Framer site and funnel.",
  },
  {
    slug: "enclave-fitness",
    name: "Enclave Fitness",
    oneLine: "[One line.]",
    tags: ["Framer"],
    meta: {
      clientType: "[Client type]",
      year: "[Year]",
      builtWith: "Framer",
      live: {
        label: "[Live: the-enclave.framer.website/landing-v2]",
        href: "https://the-enclave.framer.website/landing-v2",
      },
    },
    builtText: "Landing page, version two.",
  },
  {
    slug: "clowdray",
    name: "Clowdray",
    oneLine: "[One line.]",
    tags: ["Framer"],
    meta: {
      clientType: "[Client type]",
      year: "[Year]",
      builtWith: "Framer",
      live: { label: "[Live: clowdrayv2.framer.website]", href: "https://clowdrayv2.framer.website" },
    },
    builtText: "Framer site.",
  },
  {
    slug: "cips-cpo-roundtable",
    name: "CIPS CPO Roundtable, Qatar",
    oneLine: "An event landing page for a procurement leaders roundtable.",
    tags: ["Framer"],
    meta: {
      clientType: "Event",
      year: "[Year]",
      builtWith: "[Built with]",
      live: { label: "[Live: cporoundtable.org/qatar]", href: "https://cporoundtable.org/qatar" },
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const workIntro =
  "Most portfolios show you a hero section and call it a project. A funnel is never one page, so here you get the whole walk. Open any project to see every step a lead goes through, what I designed at each one and why.";

export const workFooterNote =
  "Most of what I design lives behind a login, inside a community or after someone books a call, so a lot of it never makes it into a portfolio. Ask me and I'll walk you through the rest.";
