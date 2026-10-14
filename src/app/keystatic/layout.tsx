import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = { title: "CMS", robots: { index: false, follow: false } };

/**
 * The CMS admin at /keystatic. Local mode writes straight to the repo's
 * files, so it only exists in development. Edit, check, then push.
 */
export default function KeystaticLayout() {
  if (process.env.NODE_ENV === "production") notFound();
  return <KeystaticApp />;
}
