"use client";

import { ArrowRight, CheckCircle, CircleNotch, SealCheck } from "@phosphor-icons/react";
import { useState } from "react";
import { CardBackdrop } from "@/components/home/testimonial-card";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const PERKS = ["New guides before they go public", "The prompts I actually use", "First access when the community opens"];

type Stage = "email" | "name" | "done";

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

const maskEmail = (email: string) => {
  const [user = "", domain = ""] = email.split("@");
  return `${user.slice(0, 2)}${"•".repeat(Math.max(2, Math.min(6, user.length - 2)))}@${domain}`;
};

/**
 * The Xtarc community waitlist, on the same dark card as the homepage
 * testimonials. Step one takes the email (saved straight away). Step two
 * turns into a member card and asks what the community should call them,
 * filling the card in as they type. See /api/waitlist.
 */
export function Waitlist({ source }: { source: string }) {
  const [stage, setStage] = useState<Stage>("email");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");

  const post = async (body: object) => {
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; token?: string };
      if (!res.ok || !out.ok) throw new Error();
      return out;
    } catch {
      setError(true);
      return null;
    } finally {
      setSending(false);
    }
  };

  const join = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const out = await post({ step: "join", email, company: form.get("company") ?? "", source });
    if (out?.token) {
      setToken(out.token);
      setStage("name");
    }
  };

  const claim = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (await post({ step: "name", email, name, token })) setStage("done");
  };

  const shown = name.trim() || (stage === "done" ? "Member" : "");

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
            {stage === "email" ? "40+ already on the waitlist" : "Your spot is saved"}
          </span>
        </div>

        {stage === "email" ? (
          <div key="email" className="fold-in grid gap-7">
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
            <form onSubmit={join} className="grid gap-2.5">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="h-11 w-full min-w-0 shrink-0 rounded-[9px] bg-white/[0.07] px-4 text-[14px] text-white ring-1 ring-white/15 outline-none placeholder:text-white/35 focus:ring-white/50 sm:w-auto sm:flex-1 sm:shrink"
                />
                {/* Honeypot for bots, hidden from people and screen readers. */}
                <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <SubmitButton sending={sending}>Join the waitlist</SubmitButton>
              </div>
              <Hint error={error}>One email when it opens. No spam, and you can leave anytime.</Hint>
            </form>
          </div>
        ) : (
          <div key="member" className="fold-in grid gap-6">
            <div className="grid gap-2">
              <h2 id="waitlist-title" className="text-[28px] leading-[32px] font-semibold tracking-[-0.02em] text-white max-md:text-[23px] max-md:leading-[28px]">
                {stage === "done" ? `Welcome in, ${shown.split(" ")[0]}.` : "You're in. One last thing."}
              </h2>
              <p className="t-body max-w-[46ch] !text-white/65">
                {stage === "done"
                  ? "Your member card is saved. I'll email you the moment the doors open."
                  : "Your member card is ready. What should the community call you? That way you walk in with a name, not as an email on a list."}
              </p>
            </div>

            <MemberCard name={shown} email={email} done={stage === "done"} />

            {stage === "name" ? (
              <form onSubmit={claim} className="grid gap-2.5">
                <div className="flex gap-2 max-sm:flex-col">
                  <label htmlFor="waitlist-name" className="sr-only">
                    Your name
                  </label>
                  <input
                    id="waitlist-name"
                    name="name"
                    required
                    maxLength={40}
                    autoFocus
                    autoComplete="given-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First name or nickname"
                    className="h-11 w-full min-w-0 shrink-0 rounded-[9px] bg-white/[0.07] px-4 text-[14px] text-white ring-1 ring-white/15 outline-none placeholder:text-white/35 focus:ring-white/50 sm:w-auto sm:flex-1 sm:shrink"
                  />
                  <SubmitButton sending={sending}>Claim my card</SubmitButton>
                </div>
                <Hint error={error}>Just what you&apos;d like to be called. You can change it later.</Hint>
              </form>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

/** The member's card, filled in live as they type their name. */
function MemberCard({ name, email, done }: { name: string; email: string; done: boolean }) {
  return (
    <div
      className={cn(
        "relative max-w-[360px] overflow-hidden rounded-[14px] p-5 ring-1 transition-all duration-500",
        "bg-[linear-gradient(135deg,#ffffff14,#ffffff05_60%)] ring-white/15",
        done && "ring-white/30",
      )}
    >
      <span className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-[radial-gradient(circle,#6870fe55,transparent_70%)]" />
      <div className="relative flex items-start justify-between">
        <span
          className={cn(
            "flex size-12 items-center justify-center rounded-full text-[16px] font-semibold transition-colors duration-300",
            name ? "bg-[linear-gradient(135deg,#8b91ff,#5a61f0)] text-white" : "bg-white/10 text-white/40",
          )}
        >
          {name ? initials(name) : "?"}
        </span>
        <span className="t-label inline-flex items-center gap-1.5 text-[11px] !text-white/55">
          {done ? <SealCheck size={13} weight="fill" className="text-[#8b91ff]" /> : null}
          Xtarc Community
        </span>
      </div>
      <div className="relative mt-5 grid gap-0.5">
        <span className={cn("truncate text-[20px] leading-7 font-semibold tracking-[-0.015em]", name ? "text-white" : "text-white/30")}>
          {name || "Your name"}
        </span>
        <span className="t-label text-[12px] !text-white/50">Founding member · {maskEmail(email)}</span>
      </div>
    </div>
  );
}

function SubmitButton({ sending, children }: { sending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className={cn(
        "inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[9px] bg-white px-5 text-[14px] font-medium text-[#161718] transition-opacity hover:opacity-90",
        sending && "opacity-70",
      )}
    >
      {sending ? <CircleNotch size={15} className="animate-spin" /> : null}
      {children}
      {sending ? null : <ArrowRight size={14} weight="bold" />}
    </button>
  );
}

function Hint({ error, children }: { error: boolean; children: React.ReactNode }) {
  return (
    <p className={cn("t-label text-[12px]", error ? "!text-[#fca5a5]" : "!text-white/40")} role={error ? "alert" : undefined}>
      {error ? `That didn't go through. Try again, or email ${site.email} and I'll add you.` : children}
    </p>
  );
}
