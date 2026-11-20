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
export const CLIENT_FACES = ["/agents/faces/client-1.webp", "/agents/faces/client-2.webp", "/agents/faces/client-3.webp", "/agents/faces/client-4.webp"];

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
    cover: "/agents/work/premier-homes.webp",
    url: "https://premierhomesinspain.com/",
  },
  {
    slug: "campus-gate",
    name: "Campus Gate Residences",
    kind: "Brand and website",
    line: "A student residence in Toronto, launched with a full identity and a site that books tours.",
    cover: "/agents/work/campus-gate.webp",
    url: "https://www.campusgateresidences.ca/",
  },
  {
    slug: "taurus",
    name: "Taurus Contracting",
    kind: "Brand and website",
    line: "One of Toronto's established commercial builders, with a site that lets the projects speak first.",
    cover: "/agents/work/taurus.webp",
    url: "https://www.tauruscontracting.ca/",
  },
];

/**
 * The inspiration strip: real estate UI by other designers on Dribbble,
 * loaded straight from Dribbble's CDN (nothing stored here) and credited by
 * name under each piece. Names are plain text on purpose: no links away from
 * the page. `video` is Dribbble's own preview of the shot; `img` is its still.
 */
const DRIBBBLE = "https://cdn.dribbble.com/userupload/";
export type Inspiration = { by: string; img: string; video?: string };
const shot = (by: string, img: string, video?: string): Inspiration => ({
  by,
  img: DRIBBBLE + img,
  ...(video ? { video: DRIBBBLE + video } : {}),
});

export const INSPIRATION: Inspiration[] = [
  shot("Nixtio", "19662942/file/original-deb50ab446a5709553ce4b89dcc02cb0.png"),
  shot("SM Rubel", "48795352/file/215bcadb8dddba198238c0b20cff5f81.png"),
  shot("Orbix Studio", "47635020/file/still-6985750f570706c5e8ee0c6911e91a21.png", "47635020/file/large-cbcf5e0479c06108f0e57dc920d298d4.mp4"),
  shot("Conceptzilla", "43802421/file/original-76272d17c1087da63d3cf9224f057747.png"),
  shot("SprintX", "44922171/file/e8fa0347b9b20497cfad2426132cb30d.png"),
  shot("Faizur", "25414775/file/original-f3975265bea1dac9666b934728981bfd.jpg"),
  shot("Dmitry Sergushkin", "9299780/file/original-ba5461e7ea3231b9563cd46818958ccd.png"),
  shot("RonDesignLab", "22054475/file/original-2eb3f60d14604921de930e3e8da2d37f.jpg"),
  shot("Ibrahim Khalil", "49644576/file/still-378d05c86ee2d0d085999ef4a1910c3a.png", "49644576/file/large-746a289b69bc35b34e02256103444a05.mp4"),
  shot("Design Monks", "46138416/file/f9085584faa54e38967ecbfa5eb779d5.png"),
  shot("ZERO STUDIO", "47620907/file/93f31d20025363db955e0db32d8c013f.png"),
  // The video Sarib picked (upload 45046150) is on this Conceptzilla shot; this is the shot's 0.6 MB preview of it.
  shot("Conceptzilla", "45046148/file/still-570c5b131804cb810d6afc85260d3c7b.png", "45046148/file/large-49ef77063c449720beb41a1fa317cb0e.mp4"),
  shot("Mudassar Akbar", "15502221/file/original-d5b6ebf9cd1d36e570a2bc2c647b5751.jpg"),
  shot("Ege Bese", "4045204/file/original-eaa34d3066903a49f44228e679175ee7.png"),
  shot("Bine Smit", "44049037/file/original-be5d15d016726a4a5676ee633172efc2.jpg"),
  shot("Sheikh Naeem", "49159807/file/7d24405e2ef3ca45f871a6a8da24ac7b.png"),
  shot("Ibrahim Khalil", "49632540/file/still-8319af9081123d9c42fb8fcebd54ce71.png", "49632540/file/large-83456cbf4d2706c42cecdf4f910bee8f.mp4"),
  shot("Robin Holesinsky", "44963159/file/711ba886e03b9e918fc1071f1b1d770b.png"),
  shot("RonDesignLab", "44026220/file/original-e2e30a7557dc32ad21e8c0f8958c06cb.png"),
  shot("Nixtio", "47443831/file/7e9bf36f91e95f65441fc9da81efb8e7.png"),
  shot("SprintX", "44828455/file/500a788d632fb0ac739a317c5de6dea8.png"),
  shot("Kevin", "18033413/file/original-ab2fe3e7d1ef0ebc9abc22ef73e2ee7b.jpg"),
  shot("Harsh Ramoliya", "43324112/file/dbba4f480c86a6ccdd280f3ab35f7407.png"),
  shot("Kites Design", "49265981/file/still-814d8a6e66123069aa54125cd7cd3bb2.png", "49265981/file/large-66a7e843b65e8dddd229c3525aed52b6.mp4"),
  shot("Kretya", "2786224/file/original-30a1b3a771ec109a4edad6492a8da570.png"),
  shot("Virgil Pana", "45032702/file/cd6123a543358eecc1b2aeba16f78b3e.png"),
  shot("Md Abdur Rouf", "18112234/file/original-e82569f1a71003048454a9385055b07b.png"),
  shot("Shakuro", "42701064/file/still-a1f1d3e2a82147ef2e119442f1591898.png", "42701064/file/large-767d7a2f9ff9c036a5c39cfae6f40877.mp4"),
  shot("W1sdom Prod.", "48505343/file/5706886ad682a07f9afd5ef5e4df6789.png"),
  shot("Artspire", "45738846/file/still-8eb33e59679a8157026104110793fd95.png", "45738846/file/large-81e96c4473db5a2723da06c19539cc5e.mp4"),
  shot("Arnology", "17038184/file/original-9869a96fa5fb6168bbe60b54a6de3c05.png"),
  shot("Peno Lab", "45616279/file/30fd0c7ba88ad9ca9ade8c088b6c016e.png"),
  shot("Muhammad Ibrahim", "48921981/file/73ca771c642229d2438143c4ba934b38.jpg"),
  shot("Shakuro", "45867978/file/still-c5e25acb0e6a1805ec2951c79609a012.png", "45867978/file/large-06153bc2332d021b0d553822e0f0d5ec.mp4"),
];

/**
 * The page's video (16:9, 1:21), hosted on Dribbble's CDN. It plays muted as a
 * small teaser in the bottom-left corner and opens full size with sound.
 */
export const VSL = {
  src: "https://cdn.dribbble.com/userupload/49688969/file/ae530dd51eb869807db9be938eeebb7e.mp4",
  length: "1:21",
};
