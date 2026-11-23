"use client";

import { Pause, Play } from "@phosphor-icons/react";
import { useRef, useState } from "react";

/**
 * A video in a guide, with our own player: the still frame, one big play and
 * pause button and the length. No browser controls, no download, no picture in
 * picture. A tap plays it with sound; tapping again pauses.
 */
export function Film({ src, poster, length, label }: { src: string; poster: string; length: string; label: string }) {
  const film = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = film.current;
    if (!v) return;
    if (!v.paused) return v.pause();
    v.muted = false;
    v.play().catch(() => {});
  };

  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-[8px] bg-black ring-[0.5px] ring-black/10" onClick={toggle}>
      <video
        ref={film}
        src={src}
        poster={poster}
        aria-label={label}
        className="block aspect-video w-full bg-black"
        playsInline
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        aria-label={playing ? "Pause the video" : "Play the video"}
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
        className={`absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#111111e6] text-white shadow-[0_10px_30px_-8px_#000a] transition-opacity duration-200 md:size-[72px] ${
          playing ? "opacity-0 [@media(hover:hover)]:group-hover:opacity-100" : "opacity-100"
        }`}
      >
        {playing ? <Pause size={28} weight="fill" /> : <Play size={28} weight="fill" className="ml-0.5" />}
      </button>
      {!playing ? (
        <span className="t-mono pointer-events-none absolute right-3 bottom-3 rounded-full bg-black/65 px-2.5 py-1 text-[12px] text-white">
          {length}
        </span>
      ) : null}
    </div>
  );
}
