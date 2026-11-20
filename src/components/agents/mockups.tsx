"use client";

import {
  CalendarCheck,
  Check,
  EnvelopeSimple,
  InstagramLogo,
  PaperPlaneTilt,
  PhoneIncoming,
  PhoneTransfer,
  Star,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { City } from "./cities";
import { useStory } from "./use-story";

const where = (c: City, area = c.neighbourhood) => (c.name ? `${area}, ${c.name}` : area);

/** Calls: a missed call during an open house becomes a handled call with a booked showing. */
export function CallMockup({ city }: { city: City }) {
  const { ref, step } = useStory<HTMLDivElement>([700, 1900, 3200]);
  const lines = [
    `Asked about the ${city.listing.beds}-bed at ${city.listing.street}`,
    "Pre-approved, wants to see it this weekend",
    "Booked: Sun 2:00 PM",
  ];
  return (
    <div ref={ref} className="ag-mock">
      <div className="ag-mock-row">
        <span className={cn("ag-mock-icon", step === 0 && "ag-ring")}>
          <PhoneIncoming size={16} weight="fill" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="ag-mock-title">
            {city.caller} · ({city.areaCode}) 555-0193
          </p>
          <p className="ag-mock-sub">{step === 0 ? `Missed call during open house, ${city.name ?? city.neighbourhood}` : "Answered by your assistant · 0:02"}</p>
        </div>
        <span className="ag-mock-time">Sat 1:14 PM</span>
      </div>
      <ul className="ag-mock-lines">
        {lines.map((l, i) => (
          <li key={l} data-show={step >= 2 || (step === 1 && i === 0) ? "" : undefined}>
            <Check size={11} weight="bold" />
            {l}
          </li>
        ))}
      </ul>
      <div className="ag-chips" data-show={step >= 3 ? "" : undefined}>
        <span>Call handled</span>
        <span>Showing booked</span>
        <span>Summary sent to you</span>
      </div>
      <p className="ag-mock-foot">
        <PhoneTransfer size={12} /> Want the call? It transfers it to you.
      </p>
    </div>
  );
}

/** Texts and DMs: a buyer messages, gets an accurate answer with photos and times in seconds. */
export function TextMockup({ city }: { city: City }) {
  const { ref, step } = useStory<HTMLDivElement>([600, 1700, 2900]);
  const l = city.listing;
  return (
    <div ref={ref} className="ag-mock">
      <div className="ag-mock-tabs" aria-hidden>
        <span>SMS</span>
        <span data-on="">
          <InstagramLogo size={12} /> Instagram
        </span>
        <span>Facebook</span>
      </div>
      <div className="ag-mini-thread">
        <div className="ag-bubble ag-bubble-buyer">
          Hey! Saw your post about the place in {city.area2}. What&apos;s the price and can I see it this week?
          <time>11:48 PM</time>
        </div>
        {step >= 1 ? (
          <div className="ag-bubble ag-bubble-agent">
            Hi {city.buyer}! It&apos;s {l.price}, {l.beds} bd · {l.baths} ba · {l.sqft} sqft in {where(city, city.area2)}. Here are a few photos.
            <span className="ag-photos" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <time>11:48 PM · replied in 6s</time>
          </div>
        ) : null}
        {step >= 2 ? (
          <div className="ag-bubble ag-bubble-agent">
            I can show you Thursday at 5:30 PM or Saturday at 11:00 AM. Which suits you?
            <time>11:48 PM</time>
          </div>
        ) : null}
        {step >= 3 ? (
          <div className="ag-bubble ag-bubble-buyer">
            Thursday please!
            <time>11:50 PM</time>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Email: a Zillow inquiry lands between newsletters and gets answered in 38 seconds. */
export function EmailMockup({ city }: { city: City }) {
  const { ref, step } = useStory<HTMLDivElement>([700, 1900, 3100]);
  const rows = [
    { from: "Title Co.", subject: "Closing documents for 512 Elm", time: "9:02 AM" },
    { from: "Market Weekly", subject: "This week in local real estate", time: "8:40 AM" },
    { from: "HOA Office", subject: "Annual meeting reminder", time: "Yesterday" },
  ];
  return (
    <div ref={ref} className="ag-mock ag-inbox">
      <div className="ag-mock-row !pb-2">
        <span className="ag-mock-icon">
          <EnvelopeSimple size={16} />
        </span>
        <p className="ag-mock-title flex-1">Inbox</p>
        <span className="ag-mock-time">{step >= 1 ? "4 new" : "3 new"}</span>
      </div>
      <ul>
        {step >= 1 ? (
          <li className="ag-mail ag-mail-lead fold-in">
            <span className="ag-mail-from">
              <Star size={11} weight="fill" /> Zillow inquiry · {city.emailer}
            </span>
            <span className="ag-mail-subject">
              Is the {city.listing.beds}-bed in {city.area2} still available?
            </span>
            <span className="ag-mail-tags">
              {step >= 2 ? <span className="ag-tag ag-tag-on">Replied in 38s</span> : <span className="ag-tag">New lead</span>}
              {step >= 3 ? <span className="ag-tag">Follow-up in 48h if quiet</span> : null}
            </span>
          </li>
        ) : null}
        {rows.map((r) => (
          <li key={r.subject} className="ag-mail">
            <span className="ag-mail-from">{r.from}</span>
            <span className="ag-mail-subject">{r.subject}</span>
            <span className="ag-mock-time">{r.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Showings book themselves: the buyer picks a day and a time, you get the confirmation. */
export function BookingMockup({ city }: { city: City }) {
  const { ref, step } = useStory<HTMLDivElement>([700, 1700, 2700]);
  const days = [
    ["Thu", "20"],
    ["Fri", "21"],
    ["Sat", "22"],
    ["Sun", "23"],
    ["Mon", "24"],
  ];
  const times = ["9:30 AM", "10:00 AM", "11:30 AM", "2:00 PM"];
  return (
    <div ref={ref} className="ag-mock">
      <p className="ag-mock-title">Book a showing · {city.listing.street}</p>
      <p className="ag-mock-sub">Pick a time that works for you.</p>
      <div className="ag-days">
        {days.map(([d, n]) => (
          <span key={n} data-on={step >= 1 && d === "Sat" ? "" : undefined}>
            <small>{d}</small>
            {n}
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
        <CalendarCheck size={18} weight="fill" />
        <span>
          <strong>Showing confirmed</strong>
          <small>Sat 10:00 AM · added to your calendar</small>
        </span>
        <PaperPlaneTilt size={14} className="ml-auto text-faint" />
      </div>
    </div>
  );
}
