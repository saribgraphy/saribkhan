export const aboutHeading = "An independent designer, based in Karachi.";

export const aboutBody = [
  "I'm Sarib. I design things for the internet and I run a small studio called Xtarc, while building my own tools on the side.",
  "I started out [the real origin, e.g. editing thumbnails, making posters for friends, redesigning apps I didn't like, in roughly what year]. Somewhere along the way I realised I cared less about making things pretty and more about why some things just work. Why one page makes you trust a business and another makes you close the tab, even when they say the same thing.",
  "That curiosity pulled me into funnels, copy and sales, which is a strange place for a designer to end up. But it's also why I'm useful. I understand what your setter is trying to do on a call, why your application asks what it asks, and what a lead is feeling when they land on your page at midnight. I just happen to also care a lot about the spacing.",
  "Most of my days are spent in Figma, Framer and lately a lot of code. When I'm not doing client work, I'm usually building small apps for myself, running a meme page that has no business being as popular as it is, or practising talking to a camera.",
];

/** Collage objects. `image` stays empty until real photos are added to /public/about. */
export const collage: {
  id: string;
  label: string;
  caption: string;
  image?: string;
  shape: "photo" | "square" | "round" | "sticker" | "badge";
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
}[] = [
  { id: "desk", label: "[Desk setup photo]", caption: "Where the work happens.", shape: "photo", x: 34, y: 4, w: 210, h: 170, rotate: -2 },
  { id: "figma", label: "[Figma file, hundreds of frames]", caption: "This is what one funnel looks like before you see it.", shape: "square", x: 2, y: 46, w: 190, h: 140, rotate: 4 },
  { id: "chai", label: "[Cup of chai]", caption: "Fuel.", shape: "round", x: 76, y: 2, w: 104, h: 104, rotate: 0 },
  { id: "karachi", label: "Karachi", caption: "Home.", shape: "sticker", x: 64, y: 46, w: 108, h: 46, rotate: -8 },
  { id: "calclater", label: "[Calclater meme]", caption: "Side quest.", shape: "square", x: 64, y: 62, w: 150, h: 150, rotate: 6 },
  { id: "early", label: "[An early design]", caption: "[Year]. We all start somewhere.", shape: "photo", x: 30, y: 60, w: 170, h: 130, rotate: -5 },
  { id: "framer", label: "@saribkhan on Framer", caption: "@saribkhan on Framer.", shape: "badge", x: 6, y: 8, w: 130, h: 52, rotate: -6 },
];

export const elsewhere = [
  { label: "Instagram", handle: "@sarib.ux", href: "https://www.instagram.com/sarib.ux" },
  { label: "LinkedIn", handle: "saribkhanux", href: "https://www.linkedin.com/in/saribkhanux" },
  { label: "Dribbble", handle: "saribgraphy", href: "https://dribbble.com/saribgraphy" },
  { label: "Framer", handle: "@saribkhan", href: "https://www.framer.com/@saribkhan" },
  { label: "YouTube", handle: "[handle]" },
];

export const afterHoursIntro =
  "Small things I make when it's not client work. Some are useful, some are just for fun, all of them taught me something I now use on real projects.";

export const afterHours: { name: string; body: string; icon: string; href?: string }[] = [
  {
    name: "Tasbeeh",
    icon: "hand",
    body: "A simple prayer counter that works offline, supports Arabic, remembers your count and gives you a little haptic tap with every click.",
  },
  {
    name: "HeroForge",
    icon: "layout",
    body: "A browser tool for building hero sections by dragging things around, editing text in place and tweaking everything from a properties panel.",
  },
  {
    name: "Rep counter",
    icon: "timer",
    body: "Upload a workout video and it counts your push-ups right in the browser, then exports a clip with the count on screen. Nothing gets uploaded anywhere.",
  },
  {
    name: "Eid card maker",
    icon: "cards",
    body: "Type a name and get a personalised Eid Mubarak video, generated right in your browser. It took five versions to get the browser to cooperate.",
  },
  {
    name: "Calclater",
    icon: "asterisk",
    body: "A meme page about design, marketing and the internet. It started as a joke and kept going.",
  },
  {
    name: "[Add or remove]",
    icon: "plus",
    body: "[Only list things that are live or can be shown.]",
  },
];
