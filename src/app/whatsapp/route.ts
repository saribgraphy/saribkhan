import { redirect } from "next/navigation";
import { site } from "@/content/site";

/**
 * /whatsapp?text=… opens a WhatsApp chat with Sarib. The number lives only
 * here on the server, so it never appears in the site's pages, links or
 * AI-readable files.
 */
export function GET(request: Request) {
  const text = new URL(request.url).searchParams.get("text");
  redirect(`https://wa.me/${site.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ""}`);
}
