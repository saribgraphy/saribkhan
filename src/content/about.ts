import aboutData from "./data/about.json";
import afterHoursData from "./data/after-hours.json";
import { withLabels } from "./labels";
import type { AboutData, AfterHoursData } from "./types";

// Edited in the CMS (/keystatic → About, Built after hours).
const a = aboutData as unknown as AboutData;
const h = afterHoursData as unknown as AfterHoursData;

export const aboutHeading = a.heading;
export const aboutBody = a.body.filter(Boolean);
export const collage = a.collage.map((c, i) => ({
  ...c,
  id: `${i}-${c.label}`,
  x: c.x ?? 10,
  y: c.y ?? 10,
  w: c.w ?? 160,
  h: c.h ?? 120,
  rotate: c.rotate ?? 0,
}));
export const elsewhere = a.elsewhere;
export const aboutLabels = withLabels("about", a.labels);

export const afterHoursHeading = h.heading;
export const afterHoursIntro = h.intro;
export const afterHours = h.projects;
