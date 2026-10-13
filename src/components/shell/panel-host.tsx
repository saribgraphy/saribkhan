"use client";

import { ArrowRight, Check, WhatsappLogo } from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { teardown } from "@/content/pricing";
import { site, whatsappLink } from "@/content/site";
import { SidePanel } from "@/components/ui/side-panel";
import { cn } from "@/lib/utils";
import { usePanels, type PanelName } from "./panel-context";

const focusOptions = [
  "Funnel",
  "Website",
  "Application and booking",
  "Skool community",
  "Internal tools",
  "Not sure yet",
];

type Status = "idle" | "sending" | "sent" | "fallback";

export function PanelHost() {
  const params = useSearchParams();
  const { close } = usePanels();
  const active = params.get("panel") as PanelName | null;

  return (
    <>
      <SidePanel
        open={active === "start"}
        onOpenChange={(o) => !o && close()}
        label="Start a project"
        title="Start a project"
        description="Three short questions. I read every one myself, and if it looks like a fit you'll hear back from me personally."
      >
        <StartForm />
      </SidePanel>
      <SidePanel
        open={active === "teardown"}
        onOpenChange={(o) => !o && close()}
        label="Free funnel teardown"
        title="Get a free funnel teardown."
        description="Send the link and where to reach you. The video comes to you, and it's yours to keep either way."
      >
        <TeardownForm />
      </SidePanel>
    </>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="grid gap-0.5">
        <span className="t-ui font-medium text-ink">{label}</span>
        {hint ? <span className="t-label">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-lg bg-white px-3.5 text-[14px] text-ink shadow-card outline-none placeholder:text-faint focus:shadow-[0_0_0_1.5px_var(--ink)]";

async function send(body: Record<string, unknown>): Promise<"sent" | "fallback"> {
  try {
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok ? "sent" : "fallback";
  } catch {
    return "fallback";
  }
}

function StartForm() {
  const [program, setProgram] = useState("");
  const [focus, setFocus] = useState<string[]>([]);
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const message = `Salam Sarib, I'd like to start a project.\n\nProgram: ${program}\nFocus: ${focus.join(", ") || "Not sure yet"}\nReply to: ${contact}`;

  if (status === "sent" || status === "fallback")
    return <Done status={status} message={message} sentLine="Received. I'll look at your program properly before I reply, so give me a day or two." />;

  return (
    <form
      className="grid gap-7"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("sending");
        setStatus(await send({ kind: "start", program, focus, contact }));
      }}
    >
      <Field label="1. What's your program, and where can I see it?">
        <input
          className={inputClass}
          required
          minLength={2}
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          placeholder="Program name and a link"
        />
      </Field>
      <fieldset className="grid gap-2">
        <legend className="t-ui mb-2 font-medium text-ink">2. Which part of the journey needs the most attention?</legend>
        <div className="flex flex-wrap gap-2">
          {focusOptions.map((opt) => {
            const on = focus.includes(opt);
            return (
              <button
                type="button"
                key={opt}
                aria-pressed={on}
                onClick={() => setFocus((f) => (on ? f.filter((x) => x !== opt) : [...f, opt]))}
                className={cn(
                  "t-ui inline-flex h-8 items-center gap-1.5 rounded-full px-3 font-medium",
                  on ? "bg-ink text-white" : "bg-white text-body shadow-card hover:text-ink",
                )}
              >
                {on ? <Check size={12} weight="bold" /> : null}
                {opt}
              </button>
            );
          })}
        </div>
      </fieldset>
      <Field label="3. Where should I reply?">
        <input
          className={inputClass}
          required
          minLength={3}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="WhatsApp number or email"
        />
      </Field>
      <div className="flex items-center gap-4 pt-1">
        <button className="btn btn-primary" disabled={status === "sending"}>
          <span className="btn-label">{status === "sending" ? "Sending" : "Send application"}</span>
        </button>
        <span className="t-label">Usually a reply within a day or two.</span>
      </div>
    </form>
  );
}

function TeardownForm() {
  const [link, setLink] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const message = `Salam Sarib, I'd like a free funnel teardown.\n\nFunnel: ${link}\nReply to: ${contact}`;

  if (status === "sent" || status === "fallback")
    return <Done status={status} message={message} sentLine="Got it. I'll walk through it as one of your leads and send the video over." />;

  return (
    <form
      className="grid gap-7"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("sending");
        setStatus(await send({ kind: "teardown", link, contact }));
      }}
    >
      <Field label="Funnel link">
        <input
          className={inputClass}
          required
          minLength={4}
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://"
          inputMode="url"
        />
      </Field>
      <Field label="WhatsApp or email">
        <input
          className={inputClass}
          required
          minLength={3}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Where the video should go"
        />
      </Field>
      <div className="pt-1">
        <button className="btn btn-primary" disabled={status === "sending"}>
          <span className="btn-label">{status === "sending" ? "Sending" : teardown.cta}</span>
        </button>
      </div>
    </form>
  );
}

function Done({ status, message, sentLine }: { status: Status; message: string; sentLine: string }) {
  if (status === "sent")
    return (
      <div className="fold-in grid gap-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-ink text-white">
          <Check size={16} weight="bold" />
        </span>
        <p className="t-lead text-ink">{sentLine}</p>
      </div>
    );
  return (
    <div className="fold-in grid gap-5">
      <p className="t-lead text-ink">One last tap. Send it straight to my WhatsApp and it lands with me directly.</p>
      <div className="flex flex-wrap items-center gap-3">
        <a className="btn btn-primary" href={whatsappLink(message)} target="_blank" rel="noreferrer">
          <WhatsappLogo size={16} weight="fill" className="relative z-1" />
          <span className="btn-label">Send on WhatsApp</span>
        </a>
        <a
          className="btn btn-ghost"
          href={`mailto:${site.email}?subject=${encodeURIComponent("New project")}&body=${encodeURIComponent(message)}`}
        >
          <span className="btn-label">Email instead</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
