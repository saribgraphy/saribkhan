"use client";

import { useEffect, useRef, useState } from "react";

const WEEKS = Array.from({ length: 12 }, (_, i) => `W${i + 1}`);

/** A phase on the twelve-week grid: first week and length, with a short label on the bar. */
export type RoadmapPhase = { label: string; weeks: string; start: number; span: number; tone: string };

/**
 * The roadmap as a fixed-width chart (96px a week) that scrolls sideways inside
 * its card, so labels sit on the bars at full size instead of being squeezed.
 * The right edge fades while there's more to see.
 */
export function RoadmapChart({ phases }: { phases: readonly RoadmapPhase[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div className="gantt" style={{ "--more": more ? 1 : 0 } as React.CSSProperties}>
      <div ref={ref} className="gscroll" tabIndex={0} role="region" aria-label="Twelve-week timeline, scrolls sideways">
        <div className="gin">
          {WEEKS.map((w) => (
            <span key={w} className="wk">
              {w}
            </span>
          ))}
          {phases.map((p, i) => (
            <span
              key={p.label}
              className={`bar2 ${p.tone}`}
              style={{ gridColumn: `${p.start} / span ${p.span}`, gridRow: i + 2 }}
            >
              {p.label}
              <small>{p.weeks}</small>
            </span>
          ))}
        </div>
      </div>
      <div className="ghint">
        <span>Twelve weeks, start to launch</span>
        <span aria-hidden>{more ? "Scroll →" : "← Scroll"}</span>
      </div>
    </div>
  );
}
