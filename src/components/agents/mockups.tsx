"use client";

import { CalendarCheck, Check, House, InstagramLogo, PaperPlaneRight, Star } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { City } from "./cities";
import { PHOTOS } from "./content";
import { useStory } from "./use-story";

/** A person's photo inside an avatar circle (the circle's size and ring come from its class). */
export function Face({ src, className }: { src: string; className: string }) {
  return (
    <span className={cn(className, "ag-face")}>
      <Image src={src} alt="" fill sizes="64px" className="object-cover" />
    </span>
  );
}

/** A photo backdrop with a dark fade, behind each illustration. */
export function PhotoStage({ src, children, className }: { src: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("ag-stage", className)}>
      <Image src={src} alt="" fill sizes="(max-width: 640px) 100vw, 600px" className="object-cover" />
      <div className="ag-stage-fade" aria-hidden />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

/** Seconds ticking up while `run` is true. */
function useTimer(run: boolean) {
  const [s, setS] = useState(0);
  useEffect(() => {
    if (!run) return;
    const id = window.setInterval(() => setS((n) => Math.min(n + 1, 59)), 140);
    return () => clearInterval(id);
  }, [run]);
  return `0:${String(s).padStart(2, "0")}`;
}

/** Calls: a missed open-house call gets answered, the transcript types in, and the summary lands. */
export function CallMockup({ city }: { city: City }) {
  const { ref, step } = useStory<HTMLDivElement>([800, 1700, 2700, 3700, 4700]);
  const timer = useTimer(step >= 1 && step < 5);
  const lines = [
    ["caller", `Hi, is the ${city.listing.beds}-bed on ${city.listing.street.replace(/^\d+ /, "")} still available?`],
    ["ai", `It is! ${city.listing.price}, ${city.listing.beds} bed, ${city.listing.baths} bath. Would Sunday at 2:00 PM work for a showing?`],
    ["caller", "Sunday at 2 is perfect."],
  ] as const;
  return (
    <div ref={ref} className="ag-call">
      <div className="ag-call-top">
        <Face src={city.faces.caller} className={cn("ag-call-avatar", step === 0 && "ag-pulse")} />
        <div className="min-w-0 flex-1">
          <p className="ag-call-name">{city.caller}</p>
          <p className="ag-call-num">({city.areaCode}) 555-0193</p>
        </div>
      </div>
      <div className="ag-call-status">
        {step === 0 ? (
          <span className="ag-pill ag-pill-orange">Incoming while you&apos;re at an open house</span>
        ) : (
          <span className="ag-pill ag-pill-green">
            <i className="ag-live" /> Answered by your assistant · {step >= 5 ? "0:42" : timer}
          </span>
        )}
      </div>
      <div className="ag-wave" data-on={step >= 1 && step < 5 ? "" : undefined} aria-hidden>
        {Array.from({ length: 28 }, (_, i) => (
          <i key={i} style={{ animationDelay: `${(i % 7) * 0.09}s` }} />
        ))}
      </div>
      <div className="ag-transcript">
        {lines.map(([who, text], i) =>
          step >= i + 2 ? (
            <p key={i} className={cn("fold-in", who === "ai" && "ag-t-ai")}>
              <b>{who === "ai" ? "Your assistant" : city.caller}</b>
              {text}
            </p>
          ) : null,
        )}
      </div>
      <div className="ag-summary" data-show={step >= 5 ? "" : undefined}>
        <span className="ag-pill ag-pill-green">
          <CalendarCheck size={15} weight="fill" /> Showing booked, Sun 2:00 PM
        </span>
        <span className="ag-pill ag-pill-blue">
          <PaperPlaneRight size={14} weight="fill" /> Summary texted to you
        </span>
        <span className="ag-pill ag-pill-amber">
          <Star size={14} weight="fill" /> Hot lead
        </span>
      </div>
    </div>
  );
}

/** Texts and DMs: an Instagram question gets photos, two times, and a booked showing. */
export function TextMockup({ city }: { city: City }) {
  const { ref, step } = useStory<HTMLDivElement>([700, 1800, 2900, 3700]);
  const l = city.listing;
  return (
    <div ref={ref} className="ag-dm">
      <div className="ag-dm-head">
        <Face src={city.faces.buyer} className="ag-dm-avatar" />
        <div className="min-w-0 flex-1">
          <p className="ag-call-name !text-ink">{city.buyer.toLowerCase()}.homes</p>
          <p className="text-[13px] text-muted">Instagram · Active now</p>
        </div>
        <InstagramLogo size={22} className="text-[#d6249f]" />
      </div>
      <div className="ag-dm-thread">
        <div className="ag-bubble ag-bubble-buyer">
          Saw your post about the place in {city.area2}! What&apos;s the price, and can I see it this week?
          <time>11:48 PM</time>
        </div>
        {step >= 1 ? (
          <div className="ag-bubble ag-bubble-agent ag-bubble-media">
            <span className="ag-media">
              <span className="ag-media-main">
                <Image src={PHOTOS.houseWhite} alt="" fill sizes="220px" className="object-cover" />
              </span>
              <span>
                <Image src={PHOTOS.living} alt="" fill sizes="110px" className="object-cover" />
              </span>
              <span>
                <Image src={PHOTOS.sofa} alt="" fill sizes="110px" className="object-cover" />
              </span>
            </span>
            It&apos;s {l.price}, {l.beds} bed, {l.baths} bath, {l.sqft} sqft. Here are a few photos!
            <time>11:48 PM · replied in 6s</time>
          </div>
        ) : null}
        {step >= 2 ? (
          <div className="ag-bubble ag-bubble-agent">
            I can show you Thursday or Saturday. Tap a time that suits you.
            <span className="ag-slots">
              <span data-on={step >= 3 ? "" : undefined}>{step >= 3 ? <Check size={13} weight="bold" /> : null}Thu 5:30 PM</span>
              <span>Sat 11:00 AM</span>
            </span>
          </div>
        ) : null}
      </div>
      <div className="ag-toast" data-show={step >= 4 ? "" : undefined}>
        <CalendarCheck size={20} weight="fill" />
        <span>
          <strong>Showing booked</strong>
          <small>Thu 5:30 PM · {l.street}</small>
        </span>
      </div>
    </div>
  );
}

const SENDERS = [
  { from: "Title Co.", subject: "Closing documents for review", time: "9:02 AM", color: "#64748b" },
  { from: "Market Weekly", subject: "This week in local real estate", time: "8:40 AM", color: "#a855f7" },
  { from: "HOA Office", subject: "Annual meeting reminder", time: "Yesterday", color: "#0ea5e9" },
];

/** Email: a Zillow inquiry arrives between the noise, gets answered in 38 seconds, and a follow-up is set. */
export function EmailMockup({ city }: { city: City }) {
  const { ref, step } = useStory<HTMLDivElement>([800, 2000, 3200]);
  return (
    <div ref={ref} className="ag-inbox">
      <div className="ag-inbox-head">
        <p className="ag-call-name !text-ink">Inbox</p>
        <span className="ag-pill ag-pill-blue">{step >= 1 ? "4 new" : "3 new"}</span>
      </div>
      {step >= 1 ? (
        <div className="ag-mail ag-mail-lead fold-in">
          <span className="relative flex-none">
            <Face src={city.faces.emailer} className="ag-mail-avatar" />
            <span className="ag-mail-badge" aria-hidden>
              <House size={10} weight="fill" />
            </span>
          </span>
          <div className="min-w-0 flex-1">
            <p className="ag-mail-from">Zillow inquiry · {city.emailer}</p>
            <p className="ag-mail-subject">
              Is the {city.listing.beds}-bed in {city.area2} still available?
            </p>
            {step >= 2 ? (
              <div className="ag-reply fold-in">
                <span className="ag-reply-img">
                  <Image src={PHOTOS.houseClassic} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span>
                  Hi {city.emailer}, yes! It&apos;s {city.listing.price}. Here are the photos and two times to see it this week.
                </span>
              </div>
            ) : null}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {step >= 2 ? <span className="ag-pill ag-pill-green">Replied in 38s</span> : <span className="ag-pill ag-pill-orange">New lead</span>}
              {step >= 3 ? <span className="ag-pill ag-pill-violet">Follow-up in 48h if quiet</span> : null}
            </div>
          </div>
        </div>
      ) : null}
      {SENDERS.map((m) => (
        <div key={m.subject} className="ag-mail">
          <span className="ag-mail-avatar" style={{ background: m.color }}>
            {m.from[0]}
          </span>
          <div className="min-w-0 flex-1">
            <p className="ag-mail-from">{m.from}</p>
            <p className="ag-mail-subject">{m.subject}</p>
          </div>
          <span className="ag-mail-time">{m.time}</span>
        </div>
      ))}
    </div>
  );
}

/** Showings book themselves: the buyer picks a day and a time, and the confirmation lands. */
export function BookingMockup({ city }: { city: City }) {
  const { ref, step } = useStory<HTMLDivElement>([800, 1700, 2600]);
  const days = [
    ["Thu", "20", "few"],
    ["Fri", "21", "many"],
    ["Sat", "22", "many"],
    ["Sun", "23", "few"],
    ["Mon", "24", "many"],
  ];
  const times = ["9:30 AM", "10:00 AM", "11:30 AM", "2:00 PM"];
  return (
    <div ref={ref} className="ag-book">
      <div className="ag-book-hero">
        <Image src={PHOTOS.housePool} alt="" fill sizes="(max-width: 640px) 100vw, 520px" className="object-cover" />
        <span className="ag-book-price">{city.listing.price}</span>
      </div>
      <div className="grid gap-3 p-4">
        <div>
          <p className="ag-call-name !text-ink">Book a showing</p>
          <p className="text-[14px] text-muted">
            {city.listing.street} · {city.listing.beds} bd · {city.listing.baths} ba · {city.listing.sqft} sqft
          </p>
        </div>
        <div className="ag-days">
          {days.map(([d, n, a]) => (
            <span key={n} data-on={step >= 1 && d === "Sat" ? "" : undefined}>
              <small>{d}</small>
              {n}
              <i data-a={a} />
            </span>
          ))}
        </div>
        <div className="ag-times">
          {times.map((t) => (
            <span key={t} data-on={step >= 2 && t === "10:00 AM" ? "" : undefined}>
              {t}
            </span>
          ))}
        </div>
        <div className="ag-confirm" data-show={step >= 3 ? "" : undefined}>
          <span className="ag-confirm-check">
            <Check size={16} weight="bold" />
          </span>
          <span>
            <strong>You&apos;re booked for Sat 10:00 AM</strong>
            <small>Added to the agent&apos;s calendar</small>
          </span>
        </div>
      </div>
    </div>
  );
}
