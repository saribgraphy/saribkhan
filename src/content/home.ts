import data from "./data/home.json";
import { site } from "./site";
import { withLabels } from "./labels";
import type { HomeData } from "./types";

// Edited in the CMS (/keystatic → Home).
const d = data as unknown as HomeData;

export const intro = { lead: d.lead, body: d.body, close: d.close };

export const currently = d.currently;

export const systems = d.systems.map((s) => ({ name: s.name, href: s.href ?? undefined }));

export const systemsTail = { extra: d.systemsExtra, rest: d.systemsRest, last: d.systemsLast };

export const testimonials = d.testimonials;

export const startHere = d.startHere;

export const expertise = (d.expertise ?? []).filter((e) => e.title);

export const footerLine = site.footerLine;

export const homeLabels = withLabels("home", d.labels);
