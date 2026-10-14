import data from "./data/notes.json";
import type { NotesData } from "./types";

// Edited in the CMS (/keystatic → Notes).
const d = data as unknown as NotesData;

export const notesHeading = d.heading;

/** Essays are written as plain text; a blank line starts a new paragraph. */
export const notes = d.notes
  .filter((n) => n.slug && n.title)
  .map((n) => ({
    ...n,
    paragraphs: (n.body ?? "")
      .split(/\n\s*\n/)
      .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
      .filter(Boolean),
  }));

export type Note = (typeof notes)[number];

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);

export const translatorLeadIn = d.translatorLeadIn;
export const translator = d.translator;
export const translatorClosing = d.translatorClosing;
