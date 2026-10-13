"use client";

import { CalendarCheck, Check } from "@phosphor-icons/react";
import { useState } from "react";
import { Copy } from "@/components/ui/copy";
import { cn } from "@/lib/utils";

const slots = ["Tue · 4:00 PM", "Wed · 11:30 AM", "Thu · 7:00 PM"];

/** The coach booking card from the IMA coaches platform, reduced to one object. */
export function BookingCard() {
  const [slot, setSlot] = useState<number | null>(null);

  return (
    <div className="card relative h-[340px] overflow-hidden !bg-white p-5">
      <div className="flex items-center gap-3">
        <span className="hatch flex size-12 items-center justify-center rounded-full ring-[0.5px] ring-black/10" aria-hidden>
          <span className="t-mono text-[10px] text-muted">[Photo]</span>
        </span>
        <span className="grid">
          <span className="text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink">
            <Copy>[Coach name]</Copy>
          </span>
          <span className="t-ui font-normal text-muted">
            <Copy>[Specialty]</Copy>
          </span>
        </span>
      </div>
      <p className="t-ui mt-4 font-normal text-body">
        <Copy>{"[A short bio in the coach's own words, two lines at most.]"}</Copy>
      </p>

      {slot === null ? (
        <div key="slots" className="fold-in mt-5 grid gap-2">
          <span className="t-label">Pick a time for a 30 min call</span>
          {slots.map((s, i) => (
            <button
              key={s}
              onClick={() => setSlot(i)}
              className="t-mono flex h-10 items-center justify-between rounded-lg bg-paper-3 px-3 text-[12px] text-ink-2 hover:bg-ink hover:text-white"
            >
              {s}
              <span className="text-[10.5px] opacity-60">Book</span>
            </button>
          ))}
        </div>
      ) : (
        <div key="ok" className="fold-in mt-5 grid gap-3 rounded-lg bg-ink p-4 text-white">
          <span className="flex items-center gap-2 text-[13px] font-medium">
            <CalendarCheck size={16} /> Call booked
          </span>
          <span className="t-mono text-[12px] text-white/70">{slots[slot]} · Confirmation sent</span>
          <button
            onClick={() => setSlot(null)}
            className={cn("t-ui inline-flex items-center gap-1.5 self-start text-white/60 hover:text-white")}
          >
            <Check size={12} /> Pick another time
          </button>
        </div>
      )}
    </div>
  );
}
