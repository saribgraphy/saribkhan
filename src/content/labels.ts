/**
 * Default wording for section labels across the site. Each page's CMS entry
 * has a "Section labels" group that overrides these; a blank field falls back
 * to the default here.
 */
export const labelDefaults = {
  home: {
    currently: "Currently",
    systems: "Systems I've designed for",
    expertise: "Areas of expertise",
    startHere: "Start here",
  },
  work: {
    projects: "Projects",
    situation: "The situation",
    built: "What I built",
    funnel: "Funnel map",
    showcase: "Showcase",
    beforeAfter: "Before and after",
    detail: "One detail worth noticing",
    clientWords: "Client words",
    nda: "NDA",
    gallery: "More from the archive",
  },
  build: {
    xray: "The Funnel X-ray",
    make: "Things I make",
    tryIt: "Try it",
    calculator: "The “one deal” calculator",
    application: "An application step",
    booking: "A coach booking card",
  },
  pricing: {
    math: "The math",
    faq: "FAQ",
  },
  about: {
    elsewhere: "Elsewhere",
  },
  notes: {
    translator: "The Translator",
  },
} as const;

export type LabelGroup = keyof typeof labelDefaults;

/** Merges CMS overrides onto the defaults, ignoring blank fields. */
export function withLabels<G extends LabelGroup>(group: G, overrides: unknown) {
  const out: Record<string, string> = { ...labelDefaults[group] };
  if (overrides && typeof overrides === "object")
    for (const [k, v] of Object.entries(overrides)) if (typeof v === "string" && v.trim()) out[k] = v.trim();
  return out as { [K in keyof (typeof labelDefaults)[G]]: string };
}
