/**
 * Everything on the /agents pages that Sarib still has to confirm or supply.
 * Fill these in and the page picks them up; anything null shows as a visible
 * [placeholder] instead of made-up content.
 */

/** The one video review. Put the files in public/agents/ and set the paths. */
export const VIDEO = {
  /** Full review with sound, e.g. "/agents/review.mp4". */
  src: null as string | null,
  /** Silent 5-second loop with burned-in captions, e.g. "/agents/review-loop.mp4". */
  loop: null as string | null,
  /** A frame of the client mid-sentence, e.g. "/agents/review-poster.jpg". */
  poster: null as string | null,
  length: "1:24",
  quote: null as string | null,
  name: null as string | null,
  role: null as string | null,
  city: null as string | null,
  /** Only results the client actually says in the video. */
  chips: [] as string[],
};

export type Testimonial = { quote: string; name: string; role: string; confirmed: boolean };

/** Text testimonials. `confirmed: false` shows a visible "confirm" placeholder next to the name. */
export const TESTIMONIALS: Testimonial[] = [
  {
    // Word for word from mortime.ai (20 Nov 2026).
    quote:
      "I was losing leads every weekend. Now my system handles everything while I'm at viewings and my clients even know it's managed by Mortime.",
    name: "Victoria Edgly",
    role: "Real estate agent",
    confirmed: false,
  },
  {
    // From the testimonial on xtarc.agency/realestate, trimmed to its last sentence.
    quote:
      "Within two weeks I had a full brand, a website with all my listings, and a chatbot that literally collected two leads while I was at a property showing.",
    name: "Mohammad Al-Rashid",
    role: "Real estate agent",
    confirmed: false,
  },
  {
    quote: "[Lindy's quote from xtarc.agency/realestate]",
    name: "Lindy Okonkwo",
    role: "Real estate agent",
    confirmed: false,
  },
];

export type Project = {
  slug: string;
  name: string;
  line: string;
  /** Cover image in public/, e.g. "/agents/covers/mortime.webp". Null shows a placeholder cover. */
  cover: string | null;
  /**
   * What the eye button opens. "page": a cleaned, script-free copy of a public
   * page (via /api/preview). "demo": a live demo on Sarib's own domains, with
   * its scripts. Null: no preview yet.
   */
  preview: { kind: "page" | "demo"; url: string } | null;
};

/** Only these URLs can ever be previewed; /api/preview never accepts a raw URL. */
export const PROJECTS: Project[] = [
  {
    slug: "mortime",
    name: "Mortime",
    line: "The AI communication system this offer is built on.",
    cover: null,
    preview: { kind: "page", url: "https://www.mortime.ai/" },
  },
  {
    slug: "listings",
    name: "Listings website demo",
    line: "A branded listings site agents update themselves.",
    cover: null,
    preview: null,
  },
  {
    slug: "chat-widget",
    name: "AI chat widget demo",
    line: "Answers buyers on the website and hands hot leads over.",
    cover: null,
    preview: null,
  },
  {
    slug: "booking-calendar",
    name: "Booking calendar demo",
    line: "Buyers pick a showing time without the back and forth.",
    cover: null,
    preview: null,
  },
  {
    slug: "campus-gate",
    name: "Campus Gate Residences",
    line: "Brand and website for a student residence launch in Toronto.",
    cover: null,
    preview: null,
  },
  {
    slug: "taurus",
    name: "Taurus Contracting",
    line: "Brand and website for a commercial general contractor in Toronto.",
    cover: null,
    preview: null,
  },
  {
    slug: "s-and-r",
    name: "S&R Construction",
    line: "No online presence at all. We built them from scratch and got them live.",
    cover: null,
    preview: null,
  },
];

/** Domains a live demo may come from (Sarib's own). */
export const DEMO_HOSTS = ["xtarc.agency", "sarib.xtarc.agency", "mortime.ai", "www.mortime.ai"];
