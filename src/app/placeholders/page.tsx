import "../globals.css";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import about from "@/content/data/about.json";
import afterHours from "@/content/data/after-hours.json";
import build from "@/content/data/build.json";
import home from "@/content/data/home.json";
import notes from "@/content/data/notes.json";
import pricing from "@/content/data/pricing.json";
import site from "@/content/data/site.json";
import work from "@/content/data/work.json";

export const metadata: Metadata = { title: "Placeholders", robots: { index: false, follow: false } };

// Which page each CMS singleton feeds, in the order worth filling them.
const sources = [
  { key: "home", label: "Home", view: "/", data: home },
  { key: "work", label: "Work", view: "/work", data: work },
  { key: "pricing", label: "Working together", view: "/working-together", data: pricing },
  { key: "about", label: "About", view: "/about", data: about },
  { key: "afterHours", label: "Built after hours", view: "/after-hours", data: afterHours },
  { key: "notes", label: "Notes", view: "/notes", data: notes },
  { key: "build", label: "What I build", view: "/build", data: build },
  { key: "site", label: "Site settings", view: "/", data: site },
];

// Images worth filling before launch, found by the shape of the item (the
// CMS drops empty image fields from the JSON, so they're inferred, not read).
const wantedImages: { has: string[]; image: string; label: string }[] = [
  { has: ["slug", "oneLine"], image: "cover", label: "Cover thumbnail" },
  { has: ["label", "note"], image: "image", label: "Funnel screenshot" },
  { has: ["quote"], image: "logo", label: "Company logo" },
  { has: ["quote"], image: "background", label: "Background image" },
  { has: ["role", "years"], image: "logo", label: "Logo" },
  { has: ["caption", "shape"], image: "image", label: "Photo" },
  { has: ["icon", "body", "name"], image: "shot", label: "Product shot" },
];

type Item = { path: string; text: string; kind: "copy" | "image" };

function label(obj: Record<string, unknown>) {
  for (const k of ["name", "title", "label", "says", "q", "slug"]) if (typeof obj[k] === "string" && obj[k]) return obj[k] as string;
  return null;
}

function walk(value: unknown, path: string[], out: Item[]) {
  if (typeof value === "string") {
    const hits = value.match(/\[[^\]]+\]/g);
    if (hits) for (const h of hits) out.push({ path: path.join(" › "), text: h, kind: "copy" });
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => {
      const name = v && typeof v === "object" && !Array.isArray(v) ? label(v as Record<string, unknown>) : null;
      walk(v, [...path.slice(0, -1), `${path.at(-1) ?? ""} ${name ? `“${name.slice(0, 40)}”` : i + 1}`.trim()], out);
    });
    return;
  }
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    for (const w of wantedImages)
      if (w.has.every((k) => k in obj) && !obj[w.image] && !(w.image === "logo" && obj.logoText) && !(obj.shape === "sticker" || obj.shape === "badge"))
        out.push({ path: path.join(" › "), text: `${w.label}: none yet`, kind: "image" });
    for (const [k, v] of Object.entries(obj)) walk(v, [...path, k], out);
  }
}

/** Dev-only checklist of everything still in [brackets] or missing an image. */
export default function PlaceholdersPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const groups = sources.map((s) => {
    const items: Item[] = [];
    walk(s.data, [], items);
    return { ...s, items };
  });
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <main className="min-h-dvh bg-paper px-5 py-16">
      <div className="mx-auto grid max-w-[720px] gap-12">
        <header className="grid gap-3">
          <span className="t-mono text-muted">Dev only · not shown on the live site</span>
          <h1 className="t-display">Placeholders</h1>
          <p className="t-lead">
            {total} things left to fill. Each group opens its page in the CMS; save there and this list updates.
          </p>
        </header>

        {groups.map((g) => {
          const copy = g.items.filter((i) => i.kind === "copy");
          const images = g.items.filter((i) => i.kind === "image");
          return (
            <section key={g.key} className="grid gap-4">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <h2 className="text-[17px] font-semibold text-ink">
                  {g.label} <span className="t-mono text-muted">{g.items.length}</span>
                </h2>
                <span className="t-ui flex gap-4">
                  <a href={`/keystatic/singleton/${g.key}`} className="inline-flex items-center gap-1 text-ink hover:text-body">
                    Edit in CMS <ArrowUpRight size={11} />
                  </a>
                  <a href={g.view} className="inline-flex items-center gap-1 text-muted hover:text-ink">
                    View page <ArrowUpRight size={11} />
                  </a>
                </span>
              </div>
              {g.items.length === 0 ? (
                <p className="t-ui text-muted">All filled.</p>
              ) : (
                <ul className="grid gap-2">
                  {[...copy, ...images].map((item, i) => (
                    <li key={i} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-4 max-sm:grid-cols-1 max-sm:gap-0.5">
                      <span className="t-mono truncate text-muted" title={item.path}>
                        {item.path}
                      </span>
                      <span className={item.kind === "image" ? "t-ui text-faint italic" : "t-ui text-ink"}>{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
