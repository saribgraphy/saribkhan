import type { Metadata, Viewport } from "next";
import { AgentsLanding } from "@/components/agents/landing";
import { agentsMetadata } from "@/components/agents/meta";

/** The /agents page, personalised for Tampa. Hidden like /agents. */
export const metadata: Metadata = agentsMetadata("tampa");
export const viewport: Viewport = { themeColor: "#0B0D10" };

export default function AgentsTampaPage() {
  return <AgentsLanding cityKey="tampa" />;
}
