"use client";

import { ArrowRight, LockSimple, Rows, SquaresFour } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { AsciiReveal, AsciiSkeleton } from "ascii-reveal";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { Project } from "@/content/projects";
import { Copy } from "@/components/ui/copy";
import { cn } from "@/lib/utils";

type View = "list" | "grid";
const KEY = "work-view";
const EVENT = "work-view-change";

/** The visitor's last choice, remembered in this browser. Grid until they pick the list. */
function useView() {
  const view = useSyncExternalStore(
    (cb) => {
      window.addEventListener(EVENT, cb);
      window.addEventListener("storage", cb);
      return () => {
        window.removeEventListener(EVENT, cb);
        window.removeEventListener("storage", cb);
      };
    },
    () => {
      try {
        return localStorage.getItem(KEY) === "list" ? "list" : "grid";
      } catch {
        return "grid";
      }
    },
    () => "grid",
  ) as View;

  const setView = (next: View) => {
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  };

  return [view, setView] as const;
}

/**
 * The Work collection, as a compact list or a two-column grid with larger
 * covers. NDA cases are shown but never link anywhere.
 */
export function ProjectList({ projects, label, ndaLabel }: { projects: Project[]; label: string; ndaLabel: string }) {
  const [view, setView] = useView();

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="t-label">{label}</h2>
        <div role="group" aria-label="Layout" className="flex items-center gap-0.5 rounded-[9px] bg-tint p-0.5">
          {(
            [
              ["list", "List view", Rows],
              ["grid", "Grid view", SquaresFour],
            ] as const
          ).map(([value, name, Icon]) => (
            <button
              key={value}
              type="button"
              aria-label={name}
              aria-pressed={view === value}
              title={name}
              onClick={() => setView(value)}
              className={cn(
                "flex size-7 items-center justify-center rounded-[7px]",
                view === value ? "bg-white text-ink shadow-card" : "text-muted hover:text-ink",
              )}
            >
              <Icon size={14} weight={view === value ? "fill" : "regular"} />
            </button>
          ))}
        </div>
      </div>

      {view === "grid" ? (
        <Grid key="grid" projects={projects} ndaLabel={ndaLabel} />
      ) : (
        <ul key="list" className="fold-in -mx-3 grid">
          {projects.map((p) => (
            <li key={p.slug}>
              {p.nda ? (
                // Listed, but not openable: same row, same hover, no link.
                <div className={cn(rowClass, "cursor-default")} aria-label={`${p.name}, under NDA`}>
                  <Row project={p} ndaLabel={ndaLabel} />
                </div>
              ) : (
                <Link href={`/work/${p.slug}`} className={rowClass}>
                  <Row project={p} ndaLabel={ndaLabel} />
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const rowClass = "group flex items-center gap-4 rounded-[10px] px-3 py-3 hover:bg-tint data-pressed:bg-tint";

/**
 * Both views ask for the same image size, so switching views reuses what the
 * browser already downloaded instead of fetching every cover again.
 */
const COVER_SIZES = "(max-width: 640px) 50vw, 290px";

/** Cover with the NDA blur and lock when needed; sized by its parent. */
function Cover({
  project: p,
  onLoad,
  eager,
  className,
}: {
  project: Project;
  onLoad?: () => void;
  /** Load straight away, for covers hidden behind a skeleton. */
  eager?: boolean;
  className?: string;
}) {
  return (
    <>
      {p.cover ? (
        <Image
          src={p.cover}
          alt=""
          fill
          sizes={COVER_SIZES}
          loading={eager ? "eager" : undefined}
          onLoad={onLoad}
          onError={onLoad}
          className={cn("object-cover object-top", p.nda && "scale-110 blur-[6px]", className)}
        />
      ) : (
        <>
          <span className="absolute inset-x-[12%] top-[16%] h-[8%] max-h-1.5 rounded-full bg-black/10" />
          <span className="absolute top-[32%] left-[12%] h-[8%] max-h-1.5 w-[40%] rounded-full bg-black/10" />
        </>
      )}
      {p.nda ? (
        <span className="absolute inset-0 flex items-center justify-center bg-white/45 backdrop-blur-[3px]">
          <span className="flex size-6 items-center justify-center rounded-full bg-white text-muted shadow-card">
            <LockSimple size={11} weight="fill" />
          </span>
        </span>
      ) : null}
    </>
  );
}

function NdaBadge({ label }: { label: string }) {
  return (
    <span className="t-mono inline-flex h-[18px] shrink-0 items-center rounded-[5px] bg-white px-1.5 text-[10px] leading-none text-muted shadow-card">
      {label}
    </span>
  );
}

function Row({ project: p, ndaLabel }: { project: Project; ndaLabel: string }) {
  return (
    <>
      <span className="hatch relative h-12 w-16 shrink-0 overflow-hidden rounded-md ring-[0.5px] ring-black/10" aria-hidden>
        <Cover project={p} />
      </span>
      <span className="grid min-w-0 flex-1 gap-0.5">
        <span className="flex items-center gap-2">
          <span className="truncate text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink">{p.name}</span>
          {p.nda ? <NdaBadge label={ndaLabel} /> : null}
        </span>
        <span className="t-ui truncate font-normal text-muted">
          <Copy>{p.oneLine}</Copy>
        </span>
      </span>
      <span className="hidden shrink-0 items-center gap-1 sm:flex">
        {p.tags.map((t) => (
          <span key={t} className="t-mono rounded-[5px] bg-white px-1.5 text-[10.5px] leading-5 text-muted shadow-card">
            {t}
          </span>
        ))}
      </span>
      {/* Kept in place (invisible) on NDA rows so the tags don't shift. */}
      <ArrowRight size={14} aria-hidden className={cn("shrink-0 text-faint group-hover:text-ink", p.nda && "invisible")} />
    </>
  );
}

/** Reveal whatever is there after this long, even if a cover is still loading. */
const GIVE_UP = 2500;

/**
 * The grid shows ASCII skeletons until every cover has loaded, then the cards
 * decode in together as one wave (ascii-reveal, default "decode" preset).
 * Cards are in the page the whole time, just hidden, so covers load behind
 * the skeletons and nothing shifts when they swap.
 */
function Grid({ projects, ndaLabel }: { projects: Project[]; ndaLabel: string }) {
  const [loaded, setLoaded] = useState(() => projects.map((p) => !p.cover));
  const [gaveUp, setGaveUp] = useState(false);
  const ready = gaveUp || loaded.every(Boolean);

  useEffect(() => {
    const t = window.setTimeout(() => setGaveUp(true), GIVE_UP);
    return () => window.clearTimeout(t);
  }, []);

  const markLoaded = (i: number) => setLoaded((l) => (l[i] ? l : l.map((v, j) => v || j === i)));

  return (
    <AsciiReveal
      as="ul"
      loading={!ready}
      revealOnMount={false}
      className="ascii-theme grid grid-cols-2 gap-x-4 gap-y-7 max-sm:gap-x-3 max-sm:gap-y-5"
    >
      {projects.map((p, i) => (
        <li key={p.slug} className="relative">
          {!ready ? <CardSkeleton seed={i} /> : null}
          <div className={ready ? undefined : "invisible"}>
            <Card project={p} ndaLabel={ndaLabel} onLoad={() => markLoaded(i)} />
          </div>
        </li>
      ))}
    </AsciiReveal>
  );
}

/** Grid card: cover, title and a two-line summary. No arrow. */
function Card({ project: p, ndaLabel, onLoad }: { project: Project; ndaLabel: string; onLoad: () => void }) {
  const body = (
    <>
      <span
        data-ascii="surface"
        className={cn(
          "frame relative block !p-1 transition-[translate,box-shadow] duration-300 ease-out",
          !p.nda && "group-hover:-translate-y-0.5 group-hover:shadow-pop",
        )}
        aria-hidden
      >
        <span className="hatch relative block aspect-[16/10] overflow-hidden rounded-[6px] ring-[0.5px] ring-black/10">
          <Cover
            project={p}
            onLoad={onLoad}
            eager
            className={cn("transition-transform duration-500 ease-out", !p.nda && "group-hover:scale-[1.03]")}
          />
        </span>
      </span>
      <span className="mt-3 flex min-w-0 items-center gap-2">
        <span className="truncate text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink">{p.name}</span>
        {p.nda ? <NdaBadge label={ndaLabel} /> : null}
      </span>
      <span className="t-ui mt-0.5 line-clamp-2 font-normal text-muted transition-colors group-hover:text-body">
        <Copy>{p.oneLine}</Copy>
      </span>
    </>
  );

  return p.nda ? (
    <div className="group block cursor-default" aria-label={`${p.name}, under NDA`}>
      {body}
    </div>
  ) : (
    <Link href={`/work/${p.slug}`} className="group block rounded-[10px]">
      {body}
    </Link>
  );
}

/** Same footprint as a card: a cover block, a title line and two summary lines. */
function CardSkeleton({ seed }: { seed: number }) {
  return (
    <div className="absolute inset-0" aria-hidden>
      <div className="aspect-[16/10] overflow-hidden rounded-[10px]">
        <AsciiSkeleton width="100%" height="100%" seed={seed} />
      </div>
      <AsciiSkeleton className="mt-3" lines={3} widths={["50%", "90%", "65%"]} seed={seed + 50} />
    </div>
  );
}
