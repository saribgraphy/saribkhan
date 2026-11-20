import type { Metadata, Viewport } from "next";
import { AgentsLanding } from "@/components/agents/landing";
import { agentsMetadata } from "@/components/agents/meta";

/** The /agents page, personalised for Charlotte. Hidden like /agents. */
export const metadata: Metadata = agentsMetadata("charlotte");
export const viewport: Viewport = { themeColor: "#0B0D10" };

export default function AgentsCharlottePage() {
  return <AgentsLanding cityKey="charlotte" />;
}
