import { notFoundMarkdown, pageMarkdown } from "@/lib/markdown";

/**
 * Serves the Markdown version of a page. src/proxy.ts rewrites requests that
 * ask for `Accept: text/markdown` here, so agents get Markdown from the same
 * URL that serves HTML to browsers. Unknown paths answer 404 in Markdown.
 */
export async function GET(_request: Request, { params }: RouteContext<"/md/[[...path]]">) {
  const { path = [] } = await params;
  const pathname = `/${path.map((p) => decodeURIComponent(p)).join("/")}`;
  const body = pageMarkdown(pathname);
  return new Response(body ?? notFoundMarkdown(pathname), {
    status: body ? 200 : 404,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      vary: "Accept",
    },
  });
}
