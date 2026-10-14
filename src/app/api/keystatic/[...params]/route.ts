import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

/*
 * Created on first request rather than at import: in GitHub mode Keystatic
 * throws when its secrets are missing, which would otherwise fail the build
 * before the GitHub App is set up.
 */
let handler: ReturnType<typeof makeRouteHandler> | null = null;

const ready = () =>
  config.storage.kind === "local" ||
  process.env.NODE_ENV === "development" ||
  Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID && process.env.KEYSTATIC_GITHUB_CLIENT_SECRET && process.env.KEYSTATIC_SECRET);

const handle = (method: "GET" | "POST") => (req: Request) => {
  if (!ready()) return new Response("The CMS isn't connected to GitHub yet.", { status: 503 });
  handler ??= makeRouteHandler({ config });
  return handler[method](req);
};

export const GET = handle("GET");
export const POST = handle("POST");
