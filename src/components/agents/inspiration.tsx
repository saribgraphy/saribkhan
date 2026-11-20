"use client";

import { useEffect, useRef } from "react";
import { INSPIRATION, type Inspiration } from "./content";

/** Dribbble's own resize: 800x600 is sharp at the strip's height and a fraction of the original's weight. */
const sized = (url: string) => `${url}?resize=800x600&vertical=center`;

/**
 * A video that only loads and plays while it's on screen, sitting on its still
 * image so the strip never changes width when the video arrives.
 */
function StripVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!v.src) v.src = src;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
    obs.observe(v);
    return () => obs.disconnect();
  }, [src]);
  return <video ref={ref} poster={poster} muted loop playsInline preload="none" aria-hidden className="ag-insp-video" />;
}

function Piece({ item, hidden }: { item: Inspiration; hidden: boolean }) {
  return (
    <figure className="ag-insp" aria-hidden={hidden || undefined}>
      <div className="ag-insp-media">
        {/* Plain <img> on purpose: the files stay on Dribbble's CDN, not proxied through this site. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sized(item.img)} alt={hidden ? "" : `Real estate UI design by ${item.by}`} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
        {item.video ? <StripVideo src={item.video} poster={sized(item.img)} /> : null}
      </div>
      <figcaption>Design by {item.by}</figcaption>
    </figure>
  );
}

/**
 * An endless, fairly quick strip of real estate UI ideas by other designers,
 * each credited by name (as plain text, so nobody leaves the page). Fixed
 * height, natural widths. Keeps moving on hover; with reduced motion it becomes a
 * plain swipeable row.
 */
export function InspirationStrip() {
  return (
    <div className="ag-insp-strip">
      <div className="ag-insp-track">
        {[false, true].map((hidden) => (
          <div key={String(hidden)} className="ag-insp-row">
            {INSPIRATION.map((item, i) => (
              <Piece key={`${item.img}-${i}`} item={item} hidden={hidden} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
