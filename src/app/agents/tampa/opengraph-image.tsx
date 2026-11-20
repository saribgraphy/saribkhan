import { agentsOgImage, ogAlt, ogSize } from "@/components/agents/og-image";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

/** Share card for /agents/tampa links, with the city's skyline. */
export default function Image() {
  return agentsOgImage("tampa");
}
