"use client";

import { CalendarX, ChatCircleDots, CurrencyDollar, EnvelopeSimple, Moon, PhoneX, Plus } from "@phosphor-icons/react";
import { useState } from "react";

const PROBLEMS: [React.ComponentType<{ size?: number; weight?: "fill" | "bold" }>, string, string, string][] = [
  [PhoneX, "#e5484d", "Missed calls at showings.", "You can't pick up while you're walking a buyer through a house. The caller rings the next agent."],
  [Moon, "#6e56cf", "Late-night texts.", "A buyer texts at 11 PM. You see it at 8 AM. By then they've booked with someone else."],
  [CalendarX, "#f76b15", "Weekend leads go cold.", "Saturday inquiries sit until Monday, and Monday is too late."],
  [EnvelopeSimple, "#0090ff", "Inquiries buried in email.", "Zillow and website leads land between newsletters and closing documents."],
  [ChatCircleDots, "#12a594", "Booking takes five messages.", "Back and forth about times, and some buyers just give up."],
  [CurrencyDollar, "#d6409f", "Paying for leads you never answer.", "Every unanswered lead is ad money you already spent."],
];

/**
 * Where leads slip away. The first two cards show in full, the next card
 * (phones) or row (wider screens) fades out under "See more", and the button
 * reveals the rest. The fade and the hidden cards are set in sections.css.
 */
export function Problems() {
  const [all, setAll] = useState(false);
  return (
    <div className="ag-problems" data-open={all ? "" : undefined}>
      <ul id="ag-problem-list" className="grid gap-3 sm:grid-cols-2">
        {PROBLEMS.map(([Icon, color, title, body]) => (
          <li key={title} className="ag-problem">
            <span className="ag-problem-icon" style={{ background: `${color}1a`, color }} aria-hidden>
              <Icon size={20} weight="fill" />
            </span>
            <p className="text-[20px] leading-7 font-semibold tracking-[-0.02em] text-ink">{title}</p>
            <p className="text-[16px] leading-6 text-body">{body}</p>
          </li>
        ))}
      </ul>
      {!all ? (
        <div className="ag-more">
          <button type="button" className="btn btn-outline" onClick={() => setAll(true)} aria-expanded={all} aria-controls="ag-problem-list">
            <Plus size={13} weight="bold" />
            See more ways leads slip away
          </button>
        </div>
      ) : null}
    </div>
  );
}
