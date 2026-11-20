"use client";

import { CalendarCheck, CaretLeft } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/shell/hooks";
import type { City } from "./cities";
import { PHOTOS } from "./content";

type Msg = { from: "buyer" | "agent"; text: string; time: string };

/**
 * The hero phone: a buyer texts late at night, the assistant answers in
 * seconds with the details and two showing times, the buyer picks one and a
 * "Showing booked" card slides in. Plays once when visible, then holds.
 * With reduced motion it shows the finished conversation straight away.
 */
export function HeroPhone({ city }: { city: City }) {
  const l = city.listing;
  const where = city.name ? `${city.neighbourhood}, ${city.name}` : city.neighbourhood;
  const messages: Msg[] = [
    { from: "buyer", text: `Hi! Is the ${l.beds}-bed on ${l.street.replace(/^\d+ /, "")} in ${city.neighbourhood} still available?`, time: "11:48 PM" },
    {
      from: "agent",
      text: `Yes, it is! ${l.price}, ${l.beds} bed, ${l.baths} bath in ${where}. I can show you Saturday at 10:00 AM or Sunday at 2:00 PM.`,
      time: "11:48 PM",
    },
    { from: "buyer", text: "Saturday at 10 works!", time: "11:49 PM" },
    { from: "agent", text: "Booked! See you Saturday at 10:00 AM.", time: "11:49 PM" },
  ];

  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        // buyer, (typing) agent "in 4 seconds", buyer, (typing) agent, then the booked card.
        at(400, () => setShown(1));
        at(1100, () => setTyping(true));
        at(2600, () => (setTyping(false), setShown(2)));
        at(4200, () => setShown(3));
        at(4800, () => setTyping(true));
        at(5900, () => (setTyping(false), setShown(4)));
        at(6600, () => setDone(true));
      },
      { threshold: 0.4 },
    );
    if (root.current) obs.observe(root.current);
    return () => {
      obs.disconnect();
      timers.forEach(clearTimeout);
    };
    // The script is fixed for the page; it plays once (again only if reduced motion is switched off).
  }, [reduced]);

  // Reduced motion: the finished conversation, no movement.
  const count = reduced ? messages.length : shown;
  const finished = reduced || done;

  return (
    <div ref={root} className="ag-phone" aria-label={`A buyer texts at 11:48 PM and gets an answer in seconds, then books a showing.`}>
      <div className="ag-phone-notch" aria-hidden />
      <div className="ag-phone-head">
        <CaretLeft size={16} aria-hidden />
        <span className="ag-avatar" aria-hidden>
          {city.buyer[0]}
        </span>
        <span>
          <strong>{city.buyer}</strong>
          <small>
            ({city.areaCode}) 555-0148 · Text message
          </small>
        </span>
      </div>
      <div className="ag-phone-thread">
        {messages.slice(0, count).map((m, i) => (
          <div key={i} className={`ag-bubble ag-bubble-${m.from}`}>
            {m.from === "agent" && i === 1 ? (
              <span className="ag-hero-photo">
                <Image src={PHOTOS.houseDusk} alt="" fill sizes="240px" className="object-cover" />
              </span>
            ) : null}
            {m.text}
            <time>{m.from === "agent" && i === 1 ? `${m.time} · replied in 4s` : m.time}</time>
          </div>
        ))}
        {typing && !reduced ? (
          <div className="ag-bubble ag-bubble-agent ag-typing" aria-hidden>
            <i />
            <i />
            <i />
          </div>
        ) : null}
      </div>
      <div className="ag-booked-toast" data-show={finished ? "" : undefined} aria-hidden={!finished}>
        <CalendarCheck size={20} weight="fill" aria-hidden />
        <span>
          <strong>Showing booked</strong>
          <small>
            Sat 10:00 AM · {l.street}
          </small>
        </span>
      </div>
    </div>
  );
}
