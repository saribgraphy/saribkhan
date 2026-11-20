"use client";

import { Play } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { VIDEO } from "./content";
import { track } from "./track";

const Ph = ({ children }: { children: React.ReactNode }) => <span className="ph">[{children}]</span>;

/**
 * The one video review as a story card, so it doesn't look like a lonely
 * video. Before the click: a silent captioned loop (or the poster). After:
 * the full review with sound and controls.
 */
export function VideoCard() {
  const [playing, setPlaying] = useState(false);
  const full = useRef<HTMLVideoElement>(null);

  const play = () => {
    if (!VIDEO.src) return;
    setPlaying(true);
    track("video_play");
    requestAnimationFrame(() => full.current?.play().catch(() => {}));
  };

  return (
    <figure className="card ag-video !bg-white">
      <div className="ag-video-frame hatch">
        {playing && VIDEO.src ? (
          <video ref={full} src={VIDEO.src} poster={VIDEO.poster ?? undefined} controls playsInline className="size-full object-cover">
            <track kind="captions" />
          </video>
        ) : (
          <>
            {VIDEO.loop ? (
              <video src={VIDEO.loop} poster={VIDEO.poster ?? undefined} muted loop autoPlay playsInline aria-hidden className="size-full object-cover" />
            ) : VIDEO.poster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={VIDEO.poster} alt="" className="size-full object-cover" />
            ) : (
              <span className="t-label absolute inset-x-0 bottom-4 text-center">
                <Ph>Client video and poster</Ph>
              </span>
            )}
            <button type="button" className="ag-play" onClick={play} aria-label="Play the client story with sound" disabled={!VIDEO.src}>
              <Play size={18} weight="fill" />
              <span>{VIDEO.length}</span>
            </button>
          </>
        )}
      </div>
      <figcaption className="grid content-start gap-4 p-5">
        <span className="t-label">Client story</span>
        <blockquote className="text-[20px] leading-7 font-medium tracking-[-0.015em] text-ink">
          {VIDEO.quote ? <>&ldquo;{VIDEO.quote}&rdquo;</> : <Ph>One sentence from the review, in the client&apos;s words</Ph>}
        </blockquote>
        <p className="t-ui font-normal text-body">
          {VIDEO.name ?? <Ph>Name</Ph>}, {VIDEO.role ?? <Ph>role</Ph>}, {VIDEO.city ?? <Ph>city</Ph>}
        </p>
        <div className="ag-chips" data-show="">
          {VIDEO.chips.length ? (
            VIDEO.chips.map((c) => <span key={c}>{c}</span>)
          ) : (
            <>
              <span>
                <Ph>No more missed weekend leads</Ph>
              </span>
              <span>
                <Ph>Live in X days</Ph>
              </span>
            </>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
