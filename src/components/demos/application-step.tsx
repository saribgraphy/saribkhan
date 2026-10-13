"use client";

import { ArrowCounterClockwise, Check } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const options = ["Under $1,000", "$1,000 to $3,000", "$3,000 to $10,000", "Over $10,000"];

/** One step from a branded application, with the transition to the next. */
export function ApplicationStep() {
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  return (
    <div className="card relative h-[340px] overflow-hidden !bg-white">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-tint">
        <div className="h-full bg-ink transition-[width] duration-700 ease-out" style={{ width: done ? "100%" : picked !== null ? "62%" : "50%" }} />
      </div>

      {!done ? (
        <div key="q" className="fold-in flex h-full flex-col px-6 pt-8 pb-6">
          <span className="t-mono text-muted">Step 3 of 6</span>
          <p className="mt-2 mb-5 text-[19px] leading-[26px] font-semibold tracking-[-0.015em] text-ink">
            What&apos;s your current monthly income?
          </p>
          <div className="grid gap-2" role="radiogroup" aria-label="Current monthly income">
            {options.map((o, i) => (
              <button
                key={o}
                role="radio"
                aria-checked={picked === i}
                onClick={() => {
                  setPicked(i);
                  setTimeout(() => setDone(true), 520);
                }}
                className={cn(
                  "t-ui flex h-10 items-center gap-3 rounded-lg px-3 text-left font-medium",
                  picked === i ? "bg-ink text-white" : "bg-paper-3 text-ink-2 hover:bg-tint-2",
                )}
              >
                <span
                  className={cn(
                    "t-mono flex size-5 items-center justify-center rounded-[5px] text-[10px]",
                    picked === i ? "bg-white/15 text-white" : "bg-white text-muted shadow-card",
                  )}
                >
                  {picked === i ? <Check size={10} weight="bold" /> : String.fromCharCode(65 + i)}
                </span>
                {o}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div key="done" className="fold-in flex h-full flex-col items-start justify-center gap-3 px-6">
          <span className="flex size-9 items-center justify-center rounded-full bg-ink text-white">
            <Check size={16} weight="bold" />
          </span>
          <p className="text-[19px] leading-[26px] font-semibold tracking-[-0.015em] text-ink">
            That&apos;s how a form should feel.
          </p>
          <button
            onClick={() => {
              setDone(false);
              setPicked(null);
            }}
            className="t-ui mt-2 inline-flex items-center gap-1.5 text-muted hover:text-ink"
          >
            <ArrowCounterClockwise size={13} /> Try it again
          </button>
        </div>
      )}
    </div>
  );
}
