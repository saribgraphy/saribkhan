import data from "./data/build.json";
import { withLabels } from "./labels";
import type { BuildData } from "./types";

// Edited in the CMS (/keystatic → What I build).
const d = data as unknown as BuildData;

export const buildHeading = d.heading;
export const buildIntro = d.intro;
export const xrayLeadIn = d.xrayLeadIn;
export const xrayOutro = d.xrayOutro;
export const tryLeadIn = d.tryLeadIn;
export const bookingCaption = d.bookingCaption;
export const buildLabels = withLabels("build", d.labels);

/** Numbered from their order, so reordering in the CMS renumbers them. */
export const touchpoints = d.touchpoints.map((t, i) => ({ ...t, n: String(i + 1).padStart(2, "0") }));

export type Touchpoint = (typeof touchpoints)[number];

export const capabilities = d.capabilities;

export const expertise = (d.expertise ?? []).filter((e) => e.title);
