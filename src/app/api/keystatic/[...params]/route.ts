import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

const handler = makeRouteHandler({ config });
const devOnly = (fn: (req: Request) => Promise<Response>) => (req: Request) =>
  process.env.NODE_ENV === "production" ? Promise.resolve(new Response("Not found", { status: 404 })) : fn(req);

// Local storage mode: only available in development.
export const GET = devOnly(handler.GET);
export const POST = devOnly(handler.POST);
