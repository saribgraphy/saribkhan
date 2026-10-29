"use client";

import { ArrowCounterClockwise, ArrowLeft, Check } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const questions = [
  {
    q: "What do you sell right now?",
    options: ["A coaching program", "A course or community", "Done-for-you services", "Something else"],
  },
  {
    q: "What's your current monthly income?",
    options: ["Under $1,000", "$1,000 to $3,000", "$3,000 to $10,000", "Over $10,000"],
  },
  {
    q: "When would you like to start?",
    options: ["Right away", "Within a month", "In the next three months", "Just exploring for now"],
  },
];

/** A short branded application: three questions, one per screen, then a finish. */
export function ApplicationStep() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const done = step >= questions.length;
  const progress = done ? 100 : ((step + (answers[step] !== null ? 0.5 : 0)) / questions.length) * 100;

  const pick = (i: number) => {
    const next = [...answers];
    next[step] = i;
    setAnswers(next);
    setTimeout(() => setStep((s) => s + 1), 420);
  };

  return (
    <div className="relative">
      <div className="mb-6 h-[3px] overflow-hidden rounded-full bg-tint">
        <div className="h-full rounded-full bg-ink transition-[width] duration-500 ease-out" style={{ width: `${Math.max(progress, 6)}%` }} />
      </div>

      <div className="min-h-[278px]">
        {!done ? (
          <div key={step} className="fold-in">
            <div className="flex items-center justify-between">
              <span className="t-label">
                Question {step + 1} of {questions.length}
              </span>
              {step > 0 ? (
                <button onClick={() => setStep((s) => s - 1)} className="t-label inline-flex items-center gap-1 hover:text-ink">
                  <ArrowLeft size={11} /> Back
                </button>
              ) : null}
            </div>
            <p className="mt-2 mb-5 text-[19px] leading-[26px] font-semibold tracking-[-0.015em] text-ink">
              {questions[step].q}
            </p>
            <div className="grid gap-2" role="radiogroup" aria-label={questions[step].q}>
              {questions[step].options.map((o, i) => {
                const on = answers[step] === i;
                return (
                  <button
                    key={o}
                    role="radio"
                    aria-checked={on}
                    onClick={() => pick(i)}
                    className={cn(
                      "t-ui flex h-10 items-center gap-3 rounded-lg px-3 text-left font-medium",
                      on ? "bg-ink text-white" : "bg-paper-3 text-ink-2 hover:bg-tint-2",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-5 items-center justify-center rounded-[5px] text-[10px] font-semibold",
                        on ? "bg-white/15 text-white" : "bg-white text-muted shadow-card",
                      )}
                    >
                      {on ? <Check size={10} weight="bold" /> : String.fromCharCode(65 + i)}
                    </span>
                    {o}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div key="done" className="fold-in flex min-h-[278px] flex-col items-start justify-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-ink text-white">
              <Check size={16} weight="bold" />
            </span>
            <p className="text-[19px] leading-[26px] font-semibold tracking-[-0.015em] text-ink">
              That&apos;s how a form should feel.
            </p>
            <p className="t-ui font-normal text-muted">Three questions, one at a time, and nothing that feels like paperwork.</p>
            <button
              onClick={() => {
                setStep(0);
                setAnswers(questions.map(() => null));
              }}
              className="t-ui mt-1 inline-flex items-center gap-1.5 text-muted hover:text-ink"
            >
              <ArrowCounterClockwise size={13} /> Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
