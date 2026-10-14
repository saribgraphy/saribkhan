import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = { title: "CMS", robots: { index: false, follow: false } };

/**
 * The CMS admin at /keystatic. Local mode on your machine; on the live site
 * it signs in with GitHub and saves by committing to the repo.
 */
export default function KeystaticLayout() {
  return <KeystaticApp />;
}
