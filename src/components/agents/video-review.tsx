"use client";

import { Play, Star } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/shell/hooks";
import { track } from "./track";

const VIDEO = {
  full: "/agents/review/review.mp4",
  loop: "/agents/review/review-loop.mp4",
  poster: "/agents/review/review-poster.jpg",
  length: "1:04",
};

/**
 * The client's video review as a story card. Before the click, a silent
 * six-second loop plays once the card is on screen (the poster with reduced
 * motion), so it feels alive without downloading the full video. The click
 * swaps in the full review with sound and controls.
 */
export function VideoReview() {
  const frame = useRef<HTMLDivElement>(null);
  const full = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const play = () => {
    setPlaying(true);
    track("video_play");
    requestAnimationFrame(() => full.current?.play().catch(() => {}));
  };

  return (
    <figure className="ag-review">
      <div ref={frame} className="ag-review-video">
        {playing ? (
          <video ref={full} src={VIDEO.full} poster={VIDEO.poster} controls playsInline preload="auto" />
        ) : (
          <>
            {visible && !reduced ? (
              <video src={VIDEO.loop} poster={VIDEO.poster} muted loop autoPlay playsInline aria-hidden />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={VIDEO.poster} alt="" />
            )}
            <button type="button" className="ag-review-play" onClick={play} aria-label="Play the client's video review with sound">
              <span>
                <Play size={20} weight="fill" />
              </span>
              Watch the review · {VIDEO.length}
            </button>
          </>
        )}
      </div>
      <figcaption className="ag-review-copy">
        <span className="ag-stars" aria-label="Five stars">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={18} weight="fill" />
          ))}
        </span>
        <blockquote>
          &ldquo;We&apos;ve probably had 10 to 12 websites built over the last 25 years, and by far these guys have been the most
          professional.&rdquo;
        </blockquote>
        <p className="ag-review-who">A business owner, in his own words</p>
        <div className="flex flex-wrap gap-2">
          <span className="ag-pill ag-pill-green">&ldquo;Really delivered&rdquo;</span>
          <span className="ag-pill ag-pill-amber">&ldquo;Five star&rdquo;</span>
          <span className="ag-pill ag-pill-blue">&ldquo;The best we&apos;ve ever used&rdquo;</span>
        </div>
      </figcaption>
    </figure>
  );
}
