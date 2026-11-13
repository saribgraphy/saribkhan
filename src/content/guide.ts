import data from "./data/guide-claude-code.json";

// Edited in the CMS (/keystatic → Claude Code guide). Keystatic drops empty
// fields, so every value has a default here.
const d = data as { cover?: string | null; coverAlt?: string; videoId?: string };

export const guide = {
  cover: d.cover || null,
  coverAlt: d.coverAlt || "Cover for the Claude Code website guide",
  videoId: d.videoId || "",
};
