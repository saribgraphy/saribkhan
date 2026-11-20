"use client";

import { CalendarCheck, ChatCircleText, PhoneCall, UsersThree } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import type { City } from "./cities";
import { useCountUp } from "./use-story";

type StatProps = { label: string; to: number; suffix?: string; color: string; icon: React.ReactNode; points: number[]; run: boolean };

function Stat({ label, to, suffix = "", color, icon, points, run }: StatProps) {
  const n = useCountUp(to, run);
  const max = Math.max(...points);
  const d = points.map((p, i) => `${(i / (points.length - 1)) * 100},${30 - (p / max) * 26}`).join(" ");
  return (
    <div className="ag-stat">
      <span className="ag-stat-icon" style={{ background: `${color}1f`, color }}>
        {icon}
      </span>
      <span className="ag-stat-label">{label}</span>
      <strong>
        {n.toLocaleString("en-US")}
        {suffix}
      </strong>
      <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="ag-spark" aria-hidden>
        <polyline points={d} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

const SOURCES = [
  ["Texts", 38, "#0a84ff"],
  ["Calls", 27, "#16a34a"],
  ["Zillow", 18, "#f59e0b"],
  ["Instagram", 11, "#e1306c"],
  ["Email", 6, "#8b5cf6"],
] as const;

const R = 38;
const C = 2 * Math.PI * R;
/** Each source's arc length and where it starts, worked out once. */
const ARCS = SOURCES.map(([, pct], i) => ({
  len: (pct / 100) * C,
  start: SOURCES.slice(0, i).reduce((sum, [, p]) => sum + (p / 100) * C, 0),
}));

/** Where leads come from, as a donut that fills once. */
function Donut({ run }: { run: boolean }) {
  const r = R;
  const c = C;
  return (
    <div className="ag-donut">
      <svg viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r={r} fill="none" stroke="#0000000d" strokeWidth="14" />
        {SOURCES.map(([k, , color], i) => {
          const { len, start } = ARCS[i];
          return (
            <circle
              key={k}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={color}
              strokeWidth="14"
              strokeDasharray={`${run ? len - 1.5 : 0} ${c}`}
              strokeDashoffset={-start}
              transform="rotate(-90 50 50)"
              style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.22,1,0.36,1)" }}
            />
          );
        })}
      </svg>
      <ul>
        {SOURCES.map(([k, pct, color]) => (
          <li key={k}>
            <i style={{ background: color }} />
            {k}
            <b>{pct}%</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

const STATUS: Record<string, string> = {
  "Showing booked": "ag-pill-green",
  Replied: "ag-pill-blue",
  Qualified: "ag-pill-amber",
  "Follow-up sent": "ag-pill-violet",
};

/**
 * A sample lead dashboard with US names, area codes and lead sources. Every
 * number is sample data, and the caption under it says so.
 */
export function Dashboard({ city }: { city: City }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const a = city.areaCode;
  const leads = [
    { name: city.buyer, phone: `(${a}) 555-0148`, source: "Text", status: "Showing booked", color: "#0a84ff" },
    { name: city.caller, phone: `(${a}) 555-0193`, source: "Call", status: "Showing booked", color: "#16a34a" },
    { name: city.emailer, phone: `(${a}) 555-0127`, source: "Zillow", status: "Replied", color: "#f59e0b" },
    { name: "Chris", phone: `(${a}) 555-0166`, source: "Instagram", status: "Qualified", color: "#e1306c" },
    { name: "Taylor", phone: `(${a}) 555-0102`, source: "Realtor.com", status: "Follow-up sent", color: "#8b5cf6" },
  ];

  return (
    <div ref={ref} className="ag-dash">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[13px] text-muted">Your leads · This week</p>
          <p className="text-[22px] leading-7 font-semibold tracking-[-0.02em] text-ink">Everything that came in</p>
        </div>
        <span className="ag-pill ag-pill-green">
          <i className="ag-live" /> Live
        </span>
      </div>
      <div className="ag-stats">
        <Stat label="New leads" to={248} color="#0a84ff" icon={<UsersThree size={16} weight="bold" />} points={[12, 18, 15, 26, 22, 31, 38]} run={run} />
        <Stat label="Calls answered" to={131} color="#16a34a" icon={<PhoneCall size={16} weight="bold" />} points={[8, 11, 9, 16, 14, 19, 22]} run={run} />
        <Stat label="Replies sent" to={612} color="#8b5cf6" icon={<ChatCircleText size={16} weight="bold" />} points={[40, 52, 47, 70, 66, 81, 94]} run={run} />
        <Stat label="Showings booked" to={37} color="#f59e0b" icon={<CalendarCheck size={16} weight="bold" />} points={[2, 4, 3, 6, 5, 8, 9]} run={run} />
      </div>
      <div className="ag-dash-row">
        <div className="ag-panel">
          <p className="ag-panel-title">Where leads come from</p>
          <Donut run={run} />
        </div>
        <div className="ag-panel">
          <p className="ag-panel-title">Time to first reply</p>
          {[
            ["Calls", "2s", 96, "#16a34a"],
            ["Texts and DMs", "6s", 88, "#0a84ff"],
            ["Email", "38s", 72, "#8b5cf6"],
          ].map(([k, v, w, color]) => (
            <div key={k as string} className="ag-rt">
              <span>
                {k}
                <b>{v}</b>
              </span>
              <span className="ag-bar">
                <i style={{ width: run ? `${w}%` : "0%", background: color as string }} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="ag-table" role="table" aria-label="Recent leads">
        {leads.map((l) => (
          <div key={l.phone} className="ag-tr" role="row">
            <span role="cell" className="flex items-center gap-3">
              <span className="ag-mail-avatar" style={{ background: l.color }}>
                {l.name[0]}
              </span>
              <span>
                <strong>{l.name}</strong>
                <small>
                  {l.source} · {l.phone}
                </small>
              </span>
            </span>
            <span role="cell">
              <span className={`ag-pill ${STATUS[l.status]}`}>{l.status}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
