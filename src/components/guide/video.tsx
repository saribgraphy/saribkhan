"use client";

import { Play, PlayCircle } from "@phosphor-icons/react";
import { useState } from "react";

/**
 * A YouTube video as a clean poster with one play button. YouTube's player
 * (and its title bar, logo and suggestions) only loads after the click, then
 * plays straight away in privacy-enhanced mode with no related videos at the
 * end. Without an id it shows a marked placeholder.
 */
export function Video({ id, title }: { id?: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="frame !p-1.5">
      <div className="relative aspect-video overflow-hidden rounded-[6px] bg-ink">
        {!id ? (
          <div className="hatch absolute inset-0 flex flex-col items-center justify-center gap-2 bg-tint text-muted">
            <PlayCircle size={36} weight="light" />
            <span className="t-ui ph">[{title}]</span>
          </div>
        ) : playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&iv_load_policy=3&color=white`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 size-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- YouTube's own poster frame */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-[linear-gradient(transparent_55%,#0007)]" />
            <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_6px_20px_#0005] transition-transform duration-300 group-hover:scale-105">
              <Play size={20} weight="fill" className="translate-x-[1px]" />
            </span>
            <span className="t-ui absolute bottom-3 left-4 font-medium text-white">{title}</span>
          </button>
        )}
      </div>
    </figure>
  );
}
