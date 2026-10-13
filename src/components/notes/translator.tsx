"use client";

import { useState } from "react";
import { translator } from "@/content/notes";

/** What clients say, flipping to what actually changed. */
export function Translator() {
  const [flipped, setFlipped] = useState<boolean[]>(() => translator.map(() => false));
  const all = flipped.every(Boolean);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setFlipped(translator.map(() => !all))}
          className="t-ui text-muted hover:text-ink"
        >
          {all ? "Flip back" : "Flip all"}
        </button>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {translator.map((card, i) => (
          <li key={card.says}>
            <button
              type="button"
              aria-pressed={flipped[i]}
              aria-label={`${card.says} ${flipped[i] ? card.changed : "Flip to see what changed"}`}
              onClick={() => setFlipped((f) => f.map((v, n) => (n === i ? !v : v)))}
              data-flipped={flipped[i]}
              className="flip block h-[156px] w-full text-left"
            >
              <span className="flip-inner block">
                <span className="flip-face card flex flex-col justify-between !bg-white p-5">
                  <span className="font-serif text-[24px] leading-[28px] text-ink">{card.says}</span>
                  <span className="t-mono text-faint">Tap to translate</span>
                </span>
                <span className="flip-face flip-back flex flex-col justify-between rounded-[10px] bg-ink p-5 text-white">
                  <span className="t-label text-white/50">What I actually changed</span>
                  <span className="t-ui font-normal text-white/90">{card.changed}</span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
