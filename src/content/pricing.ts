import data from "./data/pricing.json";
import { withLabels } from "./labels";
import type { PricingData } from "./types";

// Edited in the CMS (/keystatic → Working together).
const d = data as unknown as PricingData;

export const pricingHeading = d.heading;
export const pricingIntro = d.intro;
export const engagements = d.engagements;
export const pricingSmallLine = d.smallLine;
export const theMath = d.theMath;
export const teardown = { title: d.teardownTitle, body: d.teardownBody, cta: d.teardownCta };
export const faq = d.faq;
export const pricingLabels = withLabels("pricing", d.labels);
