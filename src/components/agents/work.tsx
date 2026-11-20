"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROJECTS } from "./content";
import { EyeButton } from "./preview";

/**
 * The work carousel. Stays inside the column (between the dotted lines), snaps
 * card by card, fades on whichever side has more to see, and has arrow
 * buttons on wider screens.
 */
export function WorkCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".ag-work-card");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 16), behavior: "smooth" });
  };

  return (
    <div className="ag-work-wrap" data-start={edge.start ? "" : undefined} data-end={edge.end ? "" : undefined}>
      <div ref={track} className="ag-work" onScroll={update} role="list" aria-label="Projects">
        {PROJECTS.map((p) => (
          <article key={p.slug} role="listitem" className="ag-work-card">
            <div className="ag-work-cover">
              <Image src={p.cover} alt={`${p.name} website`} fill sizes="(max-width: 640px) 85vw, 460px" className="object-cover object-top" />
              <EyeButton slug={p.slug} />
            </div>
            <div className="grid gap-1.5 p-5">
              <p className="text-[13px] font-medium tracking-[0.02em] text-muted uppercase">{p.kind}</p>
              <p className="text-[22px] leading-7 font-semibold tracking-[-0.02em] text-ink">{p.name}</p>
              <p className="text-[16px] leading-6 text-body">{p.line}</p>
            </div>
          </article>
        ))}
      </div>
      <button type="button" className="ag-arrow ag-arrow-l" onClick={() => go(-1)} aria-label="Previous project" disabled={edge.start}>
        <CaretLeft size={18} weight="bold" />
      </button>
      <button type="button" className="ag-arrow ag-arrow-r" onClick={() => go(1)} aria-label="Next project" disabled={edge.end}>
        <CaretRight size={18} weight="bold" />
      </button>
    </div>
  );
}
