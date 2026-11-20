import type { CityKey } from "./cities";

/**
 * Content for the /agents pages. Photos are from Unsplash (free for
 * commercial use, no attribution required); the IDs are noted so any can be
 * swapped. Client faces and project screenshots are Sarib's own work.
 */

export const PHOTOS = {
  houseDusk: "/agents/photos/house-dusk.webp", // unsplash photo-1757524492552-d47a66a2b63e
  housePool: "/agents/photos/house-pool.webp", // photo-1512917774080-9991f1c4c750
  houseWhite: "/agents/photos/house-white.webp", // photo-1600596542815-ffad4c1539a9
  houseClassic: "/agents/photos/house-classic.webp", // photo-1580587771525-78b9dba3b914
  living: "/agents/photos/living.webp", // photo-1618221195710-dd6b41faaea6
  living2: "/agents/photos/living-2.webp", // photo-1613545325278-f24b0cae1224
  sofa: "/agents/photos/sofa.webp", // photo-1567767292278-a4f21aa2d36e
  phoneNight: "/agents/photos/phone-night.webp", // photo-1423784346385-c1d4dac9893a
  coupleKeys: "/agents/photos/couple-keys.webp", // photo-1758523671826-d7f8217ffac3
};

/** City photos for the hero and the final call to action. Austin: photo-1557335200, Charlotte: photo-1562762394, Tampa: photo-1673574672395. */
export const CITY_PHOTO: Record<CityKey | "us", string> = {
  austin: "/agents/photos/austin.webp",
  charlotte: "/agents/photos/charlotte.webp",
  tampa: "/agents/photos/tampa.webp",
  us: PHOTOS.houseDusk,
};

/** Faces for the hero trust row (from xtarc.agency/sarib-khan). */
export const CLIENT_FACES = ["/agents/faces/client-1.png", "/agents/faces/client-2.png", "/agents/faces/client-3.png", "/agents/faces/client-4.png"];

/** Reviews from real estate clients, word for word from xtarc.agency/realestate. Same shape as the home page testimonials. */
export const AGENT_TESTIMONIALS = [
  {
    quote:
      "Before this I had no website. Clients would Google me and find nothing. Within two weeks I had a full brand, a website with all my listings, and a chatbot that literally collected two leads while I was at a property showing.",
    name: "Mohammad Al-Rashid",
    role: "Independent agent",
    company: "Dubai",
    logo: null,
    background: PHOTOS.houseDusk,
    audio: null,
  },
  {
    quote:
      "My old website was embarrassing. I avoided sharing it with clients. They redesigned everything and now when I send someone my link, they say it looks like a big agency. That reaction alone changed how I pitch myself.",
    name: "Lindy Okonkwo",
    role: "Property agent",
    company: "Nairobi",
    logo: null,
    background: PHOTOS.living,
    audio: null,
  },
];

export type Project = {
  slug: string;
  name: string;
  kind: string;
  line: string;
  cover: string;
  /** The live site, shown as a cleaned, script-free copy through /api/preview. Only these URLs can ever be previewed. */
  url: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "premier-homes",
    name: "Premier Homes in Spain",
    kind: "Estate agency website",
    line: "A family-run agency in Murcia and Alicante, now with a site where buyers search by region, beds and price.",
    cover: "/agents/work/premier-homes.jpg",
    url: "https://premierhomesinspain.com/",
  },
  {
    slug: "campus-gate",
    name: "Campus Gate Residences",
    kind: "Brand and website",
    line: "A student residence in Toronto, launched with a full identity and a site that books tours.",
    cover: "/agents/work/campus-gate.jpg",
    url: "https://www.campusgateresidences.ca/",
  },
  {
    slug: "taurus",
    name: "Taurus Contracting",
    kind: "Brand and website",
    line: "One of Toronto's established commercial builders, with a site that lets the projects speak first.",
    cover: "/agents/work/taurus.jpg",
    url: "https://www.tauruscontracting.ca/",
  },
];
