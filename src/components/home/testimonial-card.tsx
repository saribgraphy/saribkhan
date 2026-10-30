"use client";

import { Play } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { testimonials } from "@/content/home";
import { Copy } from "@/components/ui/copy";
import { cn } from "@/lib/utils";

/**
 * One quote at a time, as a single heavy object. With two or more quotes it
 * gets pagination dots and auto-advances every 8s, pausing on hover.
 */
export function TestimonialCard() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const many = testimonials.length > 1;

  useEffect(() => {
    if (!many || paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % testimonials.length), 8000);
    return () => clearInterval(id);
  }, [many, paused]);

  return (
    <figure
      className="relative -mx-4 grid overflow-hidden rounded-[10px] bg-[#161718] text-white shadow-[0_0.5px_3px_#21222333,0_6px_8px_#21222333] max-md:mx-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Every quote sits in the same cell and they crossfade, so the card is never blank between them. */}
      {testimonials.map((t, n) => (
        <div
          key={n}
          aria-hidden={n !== i}
          className={cn(
            "relative col-start-1 row-start-1 transition-opacity duration-700 ease-out",
            n === i ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <CardBackdrop image={t.background} />
          <div key={n === i ? `on-${i}` : "off"} className={cn("relative flex min-h-[307px] flex-col justify-end gap-6 p-10 max-md:p-6", n === i && "wipe")}>
            <blockquote className="font-quote text-[22px] leading-[30px] font-medium tracking-[-0.01em] text-white max-md:text-[19px] max-md:leading-[26px]">
              &ldquo;<Copy>{(t.quote ?? "").replace(/^"|"$/g, "")}</Copy>&rdquo;
            </blockquote>
            <div className="h-px bg-white/20" />
            <figcaption className="flex items-center justify-between gap-4">
              <span className="t-ui font-medium text-white/80 [&_.ph]:text-white/60">
                <Copy>{t.name}</Copy>, <Copy>{t.role}</Copy>, <Copy>{t.company}</Copy>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                {t.audio ? (
                  <a
                    href={t.audio}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={n === i ? undefined : -1}
                    className="flex size-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 hover:bg-white/20"
                    aria-label="Play voice note"
                  >
                    <Play size={12} weight="fill" />
                  </a>
                ) : null}
                {/* No logo yet: the slot is simply left out. */}
                {t.logo ? (
                  <Image src={t.logo} alt={t.company} width={100} height={26} className="h-[22px] w-auto object-contain" />
                ) : null}
              </span>
            </figcaption>
          </div>
        </div>
      ))}
      {many ? (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {testimonials.map((_, n) => (
            <button
              key={n}
              onClick={() => setI(n)}
              aria-label={`Show quote ${n + 1}`}
              className={cn("size-1.5 rounded-full", n === i ? "bg-white/70" : "bg-white/20")}
            />
          ))}
        </div>
      ) : null}
    </figure>
  );
}

/** Stand-in for the soft project image: a dim light and a hairline curve. */
function CardBackdrop({ image }: { image: string | null }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {image ? (
        <Image src={image} alt="" fill sizes="(max-width: 640px) 100vw, 600px" className="object-cover object-[50%_22%]" />
      ) : null}
      {image ? null : (
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_85%_-10%,#ffffff1f,transparent_55%),linear-gradient(#1d1e20,#0c0d0e)]" />
      )}
      <svg className="absolute -top-16 left-[30%] h-[281px] w-[559px] opacity-60" viewBox="0 0 559 281" fill="none">
        <path d="M1 280C80 150 220 40 558 1" stroke="url(#g)" strokeWidth="1" />
        <path d="M1 250C120 140 260 70 558 40" stroke="url(#g)" strokeWidth="0.75" />
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="559" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" stopOpacity="0" />
            <stop offset="0.6" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(#0000_0%,#000a_80%,#000_100%)]" />
    </div>
  );
}
