export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** Splits copy into plain text and [bracketed placeholders]. */
export function splitPlaceholders(text: string) {
  return text.split(/(\[[^\]]+\])/g).filter(Boolean);
}
