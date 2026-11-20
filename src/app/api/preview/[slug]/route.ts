import { PROJECTS } from "@/components/agents/content";

/**
 * A cleaned, script-free copy of a project page for the /agents eye-button
 * preview. Only slugs on the allowlist are served (never a raw URL), so this
 * can't be used to fetch arbitrary sites. The page is shown in an iframe
 * sandboxed without scripts, and the response also carries a CSP that blocks
 * scripts and forms, as a second line of defence.
 */

/* Framer and similar builders hide content until their JavaScript runs. Without scripts, show it. */
const REVEAL_CSS = `<style>
[data-framer-appear-id],[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}
[data-framer-appear-id],[style*="blur("]{filter:none!important}
[data-framer-component-type]{visibility:visible!important}
html,body{scroll-behavior:auto!important}
a{cursor:default!important}
</style>`;

function clean(html: string, base: string) {
  return (
    html
      // Scripts, noscript fallbacks and embedded frames.
      .replace(/<script\b[\s\S]*?<\/script\s*>/gi, "")
      .replace(/<script\b[^>]*\/?>/gi, "")
      .replace(/<noscript\b[\s\S]*?<\/noscript\s*>/gi, "")
      .replace(/<iframe\b[\s\S]*?<\/iframe\s*>/gi, "")
      // Meta refresh and any existing <base>.
      .replace(/<meta[^>]+http-equiv\s*=\s*["']?refresh["']?[^>]*>/gi, "")
      .replace(/<base\b[^>]*>/gi, "")
      // Inline event handlers (onclick=…, onload=…) and javascript: URLs.
      .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/(href|src|action)\s*=\s*("|')\s*javascript:[^"']*\2/gi, "")
      // Nothing navigates or submits: links lose their href, forms their action.
      .replace(/(<a\b[^>]*?)\shref\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "$1")
      .replace(/(<form\b[^>]*?)\saction\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "$1")
      // Images and styles still load from the original site.
      .replace(/<head([^>]*)>/i, `<head$1><base href="${base}">${REVEAL_CSS}`)
  );
}

export async function GET(_request: Request, { params }: RouteContext<"/api/preview/[slug]">) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project?.preview || project.preview.kind !== "page") {
    return new Response("Not found", { status: 404 });
  }

  const url = project.preview.url;
  let html: string;
  try {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (compatible; XtarcPreview/1.0)" } });
    if (!res.ok) throw new Error(String(res.status));
    html = await res.text();
  } catch {
    return new Response("Preview unavailable", { status: 502 });
  }

  return new Response(clean(html, url), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      // Cached at the edge for a day, served stale while it refreshes.
      "cache-control": "public, s-maxage=86400, stale-while-revalidate=604800",
      "content-security-policy": "script-src 'none'; form-action 'none'; frame-ancestors 'self'; object-src 'none'",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}
