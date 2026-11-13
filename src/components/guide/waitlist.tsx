"use client";

import { ArrowRight, CheckCircle, CircleNotch } from "@phosphor-icons/react";
import { useState } from "react";
import { CardBackdrop } from "@/components/home/testimonial-card";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const PERKS = ["New guides before they go public", "The prompts I actually use", "First access when the community opens"];

/**
 * The Xtarc community waitlist, on the same dark card as the homepage
 * testimonials. Signups are emailed to Sarib (see /api/waitlist).
 */
export function Waitlist({ source }: { source: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), company: form.get("company") ?? "", source }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-title"
      className="relative -mx-4 scroll-mt-28 overflow-hidden rounded-[10px] bg-[#161718] text-white shadow-[0_0.5px_3px_#21222333,0_6px_8px_#21222333] max-md:mx-0"
    >
      <CardBackdrop image={null} />
      <div className="relative grid gap-7 p-10 max-md:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="t-label inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-2.5 py-1 text-[11.5px] font-medium text-white/85 ring-1 ring-white/15">
            Xtarc Community
          </span>
          <span className="t-label inline-flex items-center gap-2 text-[12px] text-white/60">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#4ade80]/60" />
              <span className="relative size-2 rounded-full bg-[#4ade80]" />
            </span>
            40+ already on the waitlist
          </span>
        </div>

        <div className="grid gap-3">
          <h2 id="waitlist-title" className="text-[30px] leading-[34px] font-semibold tracking-[-0.02em] text-white max-md:text-[25px] max-md:leading-[30px]">
            Get the next guide before anyone else.
          </h2>
          <p className="t-body max-w-[46ch] !text-white/65">
            The Xtarc community is where I share how I design, build and ship real work with Claude. Join the waitlist and
            you&apos;re first in when it opens.
          </p>
        </div>

        <ul className="grid gap-2">
          {PERKS.map((p) => (
            <li key={p} className="t-ui flex items-center gap-2.5 font-normal text-white/80">
              <CheckCircle size={16} weight="fill" className="shrink-0 text-white/90" />
              {p}
            </li>
          ))}
        </ul>

        {status === "done" ? (
          <div role="status" className="fold-in flex items-center gap-3 rounded-[10px] bg-white/[0.08] px-4 py-3.5 ring-1 ring-white/15">
            <CheckCircle size={20} weight="fill" className="shrink-0 text-[#4ade80]" />
            <span className="t-ui font-medium text-white">You&apos;re on the list. I&apos;ll email you when it opens.</span>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-2.5">
            <div className="flex gap-2 max-sm:flex-col">
              <label htmlFor="waitlist-email" className="sr-only">
                Email address
              </label>
              <input
                id="waitlist-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@email.com"
                className="h-11 w-full min-w-0 shrink-0 rounded-[9px] sm:w-auto sm:flex-1 sm:shrink bg-white/[0.07] px-4 text-[14px] text-white ring-1 ring-white/15 outline-none placeholder:text-white/35 focus:ring-white/50"
              />
              {/* Honeypot for bots, hidden from people and screen readers. */}
              <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <button
                type="submit"
                disabled={status === "sending"}
                className={cn(
                  "inline-flex h-11 items-center justify-center gap-2 rounded-[9px] bg-white px-5 text-[14px] font-medium text-[#161718] transition-opacity hover:opacity-90",
                  status === "sending" && "opacity-70",
                )}
              >
                {status === "sending" ? <CircleNotch size={15} className="animate-spin" /> : null}
                Join the waitlist
                {status === "sending" ? null : <ArrowRight size={14} weight="bold" />}
              </button>
            </div>
            <p className={cn("t-label text-[12px]", status === "error" ? "!text-[#fca5a5]" : "!text-white/40")} role={status === "error" ? "alert" : undefined}>
              {status === "error"
                ? `That didn't go through. Try again, or email ${site.email} and I'll add you.`
                : "One email when it opens. No spam, and you can leave anytime."}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
