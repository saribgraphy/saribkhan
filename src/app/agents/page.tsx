import type { Metadata, Viewport } from "next";
import { AgentsLanding } from "@/components/agents/landing";
import { agentsMetadata } from "@/components/agents/meta";

/** Outreach landing page for US real estate agents. Hidden: link-only, noindex, not in the sitemap or llms.txt. */
export const metadata: Metadata = agentsMetadata(null);
export const viewport: Viewport = { themeColor: "#0B0D10" };

export default function AgentsPage() {
  return <AgentsLanding cityKey={null} />;
}
