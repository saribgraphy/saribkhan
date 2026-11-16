"use client";

import { Check, WhatsappLogo } from "@phosphor-icons/react";
import { useState } from "react";
import { PanelButton } from "@/components/ui/panel-button";
import { whatsappLink } from "@/content/site";
import { cn } from "@/lib/utils";

/** The four lanes, in the words a business owner would use. */
const NEEDS = [
  "A new website or landing page",
  "A brand or a brand refresh",
  "A custom tool or dashboard",
  "AI to save my team time",
  "Ads and social content",
  "Video and reels",
] as const;

/** One or two things is a project; three or more, or anything ongoing like content, is a partnership. */
function suggest(picked: string[]) {
  if (picked.length === 0) return null;
  const ongoing = picked.includes("Ads and social content") || picked.includes("Video and reels");
  if (picked.length >= 3 || (ongoing && picked.length >= 2)) {
    return {
      name: "Design and Build Partner",
      line: "You need someone on it every week. I join your team on WhatsApp or Slack and work through your list one request at a time.",
    };
  }
  return {
    name: "The Project",
    line: "One clear piece of work with a fixed scope and delivery date, usually done in 2 to 4 weeks.",
  };
}

/**
 * The end of /build: tick what you need, see which way of working fits, then
 * send it on WhatsApp or open the project form. No prices, by design.
 */
export function NeedPicker() {
  const [picked, setPicked] = useState<string[]>([]);
  const fit = suggest(picked);
  const message = `Salam Sarib, I'm looking for help with:\n${picked.map((p) => `- ${p}`).join("\n")}`;

  return (
    <div className="card -mx-4 !bg-white px-5 py-6 max-md:mx-0">
      <div className="flex flex-wrap gap-2">
        {NEEDS.map((need) => {
          const on = picked.includes(need);
          return (
            <button
              type="button"
              key={need}
              aria-pressed={on}
              onClick={() => setPicked((p) => (on ? p.filter((x) => x !== need) : [...p, need]))}
              className={cn(
                "t-ui inline-flex h-8 items-center gap-1.5 rounded-full px-3 font-medium",
                on ? "bg-ink text-white" : "bg-white text-body shadow-card hover:text-ink",
              )}
            >
              {on ? <Check size={12} weight="bold" /> : null}
              {need}
            </button>
          );
        })}
      </div>

      <div className="mt-6 border-t border-dashed border-muted/30 pt-5" aria-live="polite">
        {fit ? (
          <>
            <p className="t-ui font-medium text-ink">{fit.name} fits best.</p>
            <p className="t-ui mt-1 font-normal text-body">{fit.line}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href={whatsappLink(message)} target="_blank" rel="noreferrer" className="btn btn-primary">
                <WhatsappLogo size={16} weight="fill" />
                <span className="btn-label">Send this on WhatsApp</span>
              </a>
              <PanelButton panel="start" className="btn btn-outline">
                <span className="btn-label">Start a project</span>
              </PanelButton>
            </div>
          </>
        ) : (
          <p className="t-ui font-normal text-muted">Pick one or more, and I&apos;ll tell you which way of working fits.</p>
        )}
      </div>
    </div>
  );
}
