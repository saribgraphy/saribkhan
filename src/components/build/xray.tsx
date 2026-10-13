"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { touchpoints } from "@/content/touchpoints";
import { cn } from "@/lib/utils";

/**
 * The mirror moment: twelve touchpoints, each expanding into what most
 * programs ship next to what I ship. A counter ticks up as rows are opened.
 */
export function XRay() {
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<string[]>([]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="t-mono text-muted" aria-live="polite">
          <span key={seen.size} className="fold-in inline-block text-ink">
            {seen.size}
          </span>{" "}
          of {touchpoints.length} explored
        </span>
        <span className="flex gap-[3px]" aria-hidden>
          {touchpoints.map((t) => (
            <span
              key={t.n}
              className={cn("h-3 w-[3px] rounded-full transition-colors duration-300", seen.has(t.n) ? "bg-ink" : "bg-line-2")}
            />
          ))}
        </span>
      </div>

      <Accordion.Root
        multiple
        value={open}
        onValueChange={(v) => {
          const next = v as string[];
          setOpen(next);
          setSeen((s) => {
            const n = new Set(s);
            next.forEach((x) => n.add(x));
            return n;
          });
        }}
        className="card overflow-hidden !bg-white"
      >
        {touchpoints.map((t, i) => (
          <Accordion.Item key={t.n} value={t.n} className={cn(i > 0 && "border-t border-line")}>
            <Accordion.Header>
              <Accordion.Trigger className="group flex h-12 w-full items-center gap-4 px-4 text-left hover:bg-paper-3 data-[panel-open]:bg-paper-3">
                <span
                  className={cn(
                    "t-mono w-5 shrink-0 text-[11px]",
                    seen.has(t.n) ? "text-ink" : "text-faint",
                  )}
                >
                  {t.n}
                </span>
                <span className="t-ui flex-1 font-medium text-ink">{t.name}</span>
                <Plus
                  size={13}
                  className="shrink-0 text-muted transition-transform duration-300 ease-out group-data-[panel-open]:rotate-45"
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className="acc-panel">
              <div className="grid gap-3 px-4 pt-1 pb-5 pl-[52px] sm:grid-cols-2 sm:gap-4">
                <Compare kind="most" text={t.most} />
                <Compare kind="mine" text={t.mine} />
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}

function Compare({ kind, text }: { kind: "most" | "mine"; text: string }) {
  const mine = kind === "mine";
  return (
    <div className={cn("grid content-start gap-3 rounded-lg p-3", mine ? "bg-ink text-white" : "card-inset")}>
      <Sketch mine={mine} />
      <span className={cn("t-label", mine ? "text-white/60" : "")}>{mine ? "What I ship" : "What most programs ship"}</span>
      <p className={cn("t-ui font-normal", mine ? "text-white/90" : "text-body")}>{text}</p>
    </div>
  );
}

/** A tiny abstract page: cluttered for "most", calm and aligned for "mine". */
function Sketch({ mine }: { mine: boolean }) {
  if (!mine)
    return (
      <div aria-hidden className="relative h-14 overflow-hidden rounded-[4px] bg-white ring-[0.5px] ring-black/10">
        <span className="absolute top-2 left-2 h-1.5 w-14 rounded-sm bg-black/25" />
        <span className="absolute top-2 right-3 h-3 w-8 rounded-full bg-black/15" />
        <span className="absolute top-6 left-5 h-1 w-20 bg-black/10" />
        <span className="absolute top-8 left-2 h-1 w-10 bg-black/15" />
        <span className="absolute top-[38px] left-9 h-3 w-10 rounded-sm bg-black/25" />
        <span className="absolute top-7 right-4 size-4 rounded-full bg-black/10" />
        <span className="absolute right-10 bottom-1.5 h-2.5 w-8 rounded bg-black/20" />
      </div>
    );
  return (
    <div aria-hidden className="relative h-14 overflow-hidden rounded-[4px] bg-white/[0.06] ring-[0.5px] ring-white/15">
      <span className="absolute top-3 left-3 h-1.5 w-16 rounded-sm bg-white/70" />
      <span className="absolute top-6 left-3 h-1 w-24 rounded-sm bg-white/25" />
      <span className="absolute top-8 left-3 h-1 w-20 rounded-sm bg-white/25" />
      <span className="absolute bottom-2.5 left-3 h-3 w-10 rounded-[3px] bg-white/80" />
    </div>
  );
}
