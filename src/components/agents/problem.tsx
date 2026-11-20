"use client";

import { Plus, X } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PROBLEMS: [string, string][] = [
  ["Missed calls at showings.", "You can't pick up while you're walking a buyer through a house. The caller rings the next agent."],
  ["Late-night texts.", "A buyer texts at 11 PM. You see it at 8 AM. By then they've booked with someone else."],
  ["Weekend leads go cold.", "Saturday inquiries sit until Monday, and Monday is too late."],
  ["Inquiries buried in email.", "Zillow and website leads land between newsletters and closing documents."],
  ["Booking takes five messages.", "Back and forth about times, and some buyers just give up."],
  ["Paying for leads you never answer.", "Every unanswered lead is ad money you already spent."],
];

/** Where leads slip away: four cards, and "See more" reveals the last two. */
export function Problems() {
  const [all, setAll] = useState(false);
  return (
    <div className="relative">
      <ul className="grid gap-3 sm:grid-cols-2">
        {PROBLEMS.map(([title, body], i) => (
          <li
            key={title}
            className={cn("card grid content-start gap-2 p-4", i >= 4 && !all && "hidden", i >= 4 && all && "fold-in")}
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-[#e5484d14] text-[#d13438]" aria-hidden>
              <X size={11} weight="bold" />
            </span>
            <p className="text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink">{title}</p>
            <p className="t-ui font-normal text-body">{body}</p>
          </li>
        ))}
      </ul>
      {!all ? (
        <div className="ag-more">
          <button type="button" className="btn btn-outline btn-sm" onClick={() => setAll(true)}>
            <Plus size={12} weight="bold" />
            See more issues
          </button>
        </div>
      ) : null}
    </div>
  );
}
