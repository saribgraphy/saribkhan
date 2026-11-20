"use client";

import { useEffect, useRef, useState } from "react";
import type { City } from "./cities";
import { useCountUp } from "./use-story";

function Stat({ label, to, suffix = "", run }: { label: string; to: number; suffix?: string; run: boolean }) {
  const n = useCountUp(to, run);
  return (
    <div className="ag-stat">
      <span className="t-label">{label}</span>
      <strong>
        {n.toLocaleString("en-US")}
        {suffix}
      </strong>
    </div>
  );
}

/**
 * "Real Estate Operations", rebuilt from the Mortime dashboard with US names,
 * area codes and lead sources. Every number here is sample data, and the
 * caption under it says so.
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
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const a = city.areaCode;
  const leads = [
    { name: city.buyer, phone: `(${a}) 555-0148`, source: "Text message", status: "Showing booked", time: "11:49 PM" },
    { name: city.caller, phone: `(${a}) 555-0193`, source: "Phone call", status: "Showing booked", time: "1:14 PM" },
    { name: city.emailer, phone: `(${a}) 555-0127`, source: "Zillow inquiry", status: "Replied", time: "9:12 AM" },
    { name: "Chris", phone: `(${a}) 555-0166`, source: "Instagram DM", status: "Qualified", time: "Yesterday" },
    { name: "Taylor", phone: `(${a}) 555-0102`, source: "Realtor.com", status: "Follow-up sent", time: "Yesterday" },
  ];

  return (
    <div ref={ref} className="ag-dash">
      <div className="ag-dash-head">
        <div>
          <p className="t-mono text-faint">Mortime / Overview</p>
          <p className="text-[18px] leading-6 font-semibold tracking-[-0.015em] text-ink">Real Estate Operations</p>
        </div>
        <span className="ag-tag">This week</span>
      </div>
      <div className="ag-stats">
        <Stat label="Total leads" to={248} run={run} />
        <Stat label="Calls answered" to={131} run={run} />
        <Stat label="Pickup rate" to={100} suffix="%" run={run} />
        <Stat label="Showings booked" to={37} run={run} />
      </div>
      <div className="ag-table" role="table" aria-label="Recent leads">
        <div className="ag-tr ag-th" role="row">
          <span role="columnheader">Lead</span>
          <span role="columnheader">Source</span>
          <span role="columnheader">Status</span>
        </div>
        {leads.map((l) => (
          <div key={l.phone} className="ag-tr" role="row">
            <span role="cell">
              <strong>{l.name}</strong>
              <small>{l.phone}</small>
            </span>
            <span role="cell">{l.source}</span>
            <span role="cell">
              <span className={l.status === "Showing booked" ? "ag-tag ag-tag-on" : "ag-tag"}>{l.status}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="ag-perf">
        {[
          ["Calls", "picked up in 2s", 96],
          ["Texts and DMs", "replied in 6s", 88],
          ["Email", "replied in 38s", 72],
        ].map(([k, v, w]) => (
          <div key={k as string}>
            <span className="t-label flex justify-between">
              <span className="text-ink-2">{k}</span>
              {v}
            </span>
            <span className="ag-bar">
              <i style={{ width: run ? `${w}%` : "0%" }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
