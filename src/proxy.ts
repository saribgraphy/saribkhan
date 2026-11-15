import { NextResponse, type NextRequest } from "next/server";

/**
 * Markdown content negotiation for AI agents. A request that asks for
 * `Accept: text/markdown` gets the same page as Markdown (served by
 * src/app/md); every other request is untouched and keeps getting HTML.
 * The matcher only runs this for Markdown requests, so browsers never pay for it.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/md${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    {
      // Pages only: not Next's own files, APIs, the CMS, the Markdown route itself or any file with an extension.
      source: "/((?!_next/|api/|keystatic|md/|md$|.*\\..*).*)",
      has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
    },
  ],
};
