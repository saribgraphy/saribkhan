import { agentsOgImage, ogAlt, ogSize } from "@/components/agents/og-image";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

/** Share card for /real-estate links. */
export default function Image() {
  return agentsOgImage(null);
}
