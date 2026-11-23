/**
 * Checks what AI agents see: Markdown negotiation, agent-friendly 404s,
 * llms.txt, JSON-LD, canonical URLs, the sitemap and the trust pages.
 *
 *   npm run test:agents                                  (http://localhost:3000)
 *   npm run test:agents -- https://sarib.xtarc.agency
 */
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const MD = { accept: "text/markdown" };
const HTML = { accept: "text/html" };
let failed = 0;

const get = async (path, headers) => {
  const res = await fetch(base + path, { headers, redirect: "follow" });
  return { res, body: await res.text(), type: res.headers.get("content-type") ?? "", vary: res.headers.get("vary") ?? "" };
};
const check = (name, ok, detail = "") => {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok || !detail ? "" : `  (${detail})`}`);
};
const stripTags = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

const pages = ["/", "/work", "/build", "/working-together", "/about", "/notes", "/after-hours", "/claude-code-guide", "/claude-video-guide", "/contact", "/privacy"];

// 1. Markdown content negotiation on every page; HTML unchanged for browsers.
for (const path of pages) {
  const md = await get(path, MD);
  check(`markdown ${path}: 200`, md.res.status === 200, md.res.status);
  check(`markdown ${path}: content-type text/markdown`, md.type.startsWith("text/markdown"), md.type);
  check(`markdown ${path}: vary includes Accept`, /accept/i.test(md.vary), md.vary);
  check(`markdown ${path}: body is markdown`, md.body.startsWith("# ") && !md.body.includes("<html"));
  const html = await get(path, HTML);
  check(`html ${path}: still HTML`, html.res.status === 200 && html.type.startsWith("text/html") && html.body.includes("<html"), html.type);
}

// Case files and notes, from the sitemap.
const sitemap = await get("/sitemap.xml");
const locs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
check("sitemap lists pages", locs.length >= pages.length, `${locs.length} urls`);
for (const p of ["/contact", "/privacy"]) check(`sitemap includes ${p}`, locs.includes(p));
for (const path of locs.filter((p) => /^\/(work|notes)\/./.test(p))) {
  const md = await get(path, MD);
  check(`markdown ${path}`, md.res.status === 200 && md.type.startsWith("text/markdown"), `${md.res.status} ${md.type}`);
}

// 2. Agent-friendly 404s.
const missing = await get("/this-page-does-not-exist-xyz", MD);
check("404 markdown: status 404", missing.res.status === 404, missing.res.status);
check("404 markdown: content-type text/markdown", missing.type.startsWith("text/markdown"), missing.type);
check("404 markdown: helpful body", missing.body.length >= 20 && missing.body.includes("/llms.txt") && missing.body.includes("/sitemap.xml"));
const missingHtml = await get("/this-page-does-not-exist-xyz", HTML);
check("404 html: still HTML 404", missingHtml.res.status === 404 && missingHtml.type.startsWith("text/html"), `${missingHtml.res.status} ${missingHtml.type}`);

// Non-page routes are untouched by negotiation.
const robots = await get("/robots.txt", MD);
check("robots.txt untouched", robots.res.status === 200 && robots.body.includes("Sitemap:"));

// 3. llms.txt.
const llms = await get("/llms.txt");
check("llms.txt: 200", llms.res.status === 200, llms.res.status);
check("llms.txt: H1 + blockquote", /^# .+\n\n> .+/.test(llms.body));
check("llms.txt: When to use section", llms.body.includes("## When to use"));
check("llms.txt: links pages", llms.body.includes("/contact") && llms.body.includes("/working-together"));

// 4. JSON-LD and brand terms on the homepage.
const home = await get("/", HTML);
const ld = [...home.body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
const graph = ld.flatMap((d) => d["@graph"] ?? [d]);
const types = graph.map((n) => n["@type"]);
check("json-ld: Person", types.includes("Person"), types.join(","));
const org = graph.find((n) => n["@type"] === "Organization");
check("json-ld: Organization with contactPoint", Boolean(org?.contactPoint?.email));
check("json-ld: no location or phone number", !/Karachi|Pakistan|"PK"|\+92|923147503578/.test(JSON.stringify(ld)));
check("json-ld: knowsAbout terms", (graph.find((n) => n["@type"] === "Person")?.knowsAbout ?? []).length > 0);
check("home title names Xtarc", /<title>[^<]*Xtarc[^<]*<\/title>/.test(home.body));

// 5. Canonical URLs.
for (const path of [...pages, ...locs.filter((p) => /^\/(work|notes)\/./.test(p))]) {
  const html = path === "/" ? home : await get(path, HTML);
  const m = html.body.match(/<link rel="canonical" href="([^"]+)"/);
  check(`canonical ${path}`, Boolean(m) && new URL(m[1]).pathname === path, m?.[1] ?? "missing");
}

// 6. Trust pages with real content.
for (const path of ["/contact", "/privacy"]) {
  const html = await get(path, HTML);
  const main = stripTags(html.body.slice(html.body.indexOf("<h1")));
  check(`${path}: over 500 characters`, main.length > 500, `${main.length} chars`);
}

console.log(failed ? `\n${failed} check(s) failed against ${base}` : `\nAll checks passed against ${base}`);
process.exit(failed ? 1 : 0);
