"use client";

import { useEffect, useRef, useState } from "react";

const WEEKS = Array.from({ length: 12 }, (_, i) => `W${i + 1}`);

/** Each phase on the twelve-week grid: first week and length, with a short label on the bar. */
const PHASES = [
  { label: "Stop the leaks", weeks: "W1–2", start: 1, span: 2, tone: "p1" },
  { label: "Brand foundation", weeks: "W2–4", start: 2, span: 3, tone: "p2" },
  { label: "Website and funnel", weeks: "W4–8", start: 4, span: 5, tone: "p3" },
  { label: "Skool and channels", weeks: "W7–9", start: 7, span: 3, tone: "p4" },
  { label: "Content, SEO and launch", weeks: "W9–12", start: 9, span: 4, tone: "p5" },
  { label: "Support and weekly reporting", weeks: "W1–12", start: 1, span: 12, tone: "p6" },
];

/**
 * The roadmap as a fixed-width chart (96px a week) that scrolls sideways inside
 * its card, so labels sit on the bars at full size instead of being squeezed.
 * The right edge fades while there's more to see.
 */
export function RoadmapChart() {
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
          {PHASES.map((p, i) => (
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
