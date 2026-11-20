import { agentsOgImage, ogAlt, ogSize } from "@/components/agents/og-image";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

/** Share card for /agents links. */
export default function Image() {
  return agentsOgImage(null);
}
