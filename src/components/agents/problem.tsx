"use client";

import { CalendarX, ChatCircleDots, CurrencyDollar, EnvelopeSimple, Moon, PhoneX, Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { problemsCopy } from "@/content/real-estate";

/** An icon and colour per problem, in the same order as the shared copy. */
const LOOKS: [React.ComponentType<{ size?: number; weight?: "fill" | "bold" }>, string][] = [
  [PhoneX, "#e5484d"],
  [Moon, "#6e56cf"],
  [CalendarX, "#f76b15"],
  [EnvelopeSimple, "#0090ff"],
  [ChatCircleDots, "#12a594"],
  [CurrencyDollar, "#d6409f"],
];
const PROBLEMS = problemsCopy.map(([title, body], i) => [...LOOKS[i], title, body] as const);

/**
 * Where leads slip away. The first two cards show in full, the next card
 * (phones) or row (wider screens) fades out under "See more", and the button
 * reveals the rest. The fade and the hidden cards are set in sections.css.
 * `wide` (the /agents/watch page): three across on large screens, where all
 * six show and the button goes away.
 */
export function Problems({ wide = false }: { wide?: boolean }) {
  const [all, setAll] = useState(false);
  return (
    <div className={wide ? "ag-problems ag-problems-wide" : "ag-problems"} data-open={all ? "" : undefined}>
      <ul id="ag-problem-list" className={wide ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-3 sm:grid-cols-2"}>
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
