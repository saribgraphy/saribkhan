"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { Copy } from "@/components/ui/copy";
import { touchpoints } from "@/content/touchpoints";
import { cn } from "@/lib/utils";

/**
 * Every step of a coaching funnel, each opening into a short note on what it
 * is and how I approach it. A counter ticks up as rows are opened.
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
              <p className="t-ui px-4 pt-0.5 pb-5 pl-[52px] font-normal text-body">
                <Copy>{t.body}</Copy>
              </p>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}

