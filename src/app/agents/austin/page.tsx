import type { Metadata, Viewport } from "next";
import { AgentsLanding } from "@/components/agents/landing";
import { agentsMetadata } from "@/components/agents/meta";

/** The /agents page, personalised for Austin. Hidden like /agents. */
export const metadata: Metadata = agentsMetadata("austin");
export const viewport: Viewport = { themeColor: "#0B0D10" };

export default function AgentsAustinPage() {
  return <AgentsLanding cityKey="austin" />;
}
