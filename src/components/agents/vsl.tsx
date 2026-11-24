"use client";

import { Pause, Play, X } from "@phosphor-icons/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/shell/hooks";
import { fbq } from "@/lib/meta-pixel";
import { useBooking } from "./booking";
import { VSL } from "./content";
import { track } from "./track";

/** Seconds of watching before the button under the video becomes active. */
const UNLOCK_SECONDS = 30;
/** The corner teaser loops the opening seconds only, so it never downloads the whole film. */
const TEASER_SECONDS = 12;

/**
 * The page's video. A small muted teaser plays in the bottom-left corner (it
 * loads after the page is idle, so it never slows the first paint). Tapping it
 * opens the film with sound on a plain paper overlay, with the booking button
 * underneath. The player is our own: no browser controls, no download, just
 * one big play/pause button. The button below fills like a fuel gauge over the
 * first 30 seconds of watching, then becomes clickable, so visitors see most of
 * the pitch before they book.
 *
 * The overlay stays mounted (hidden) so the film element already exists when
 * the teaser is tapped: play() runs inside the tap itself, which browsers treat
 * as permission to play with sound straight away.
 */
export function VslWidget() {
  const { open: openBooking, isOpen: bookingOpen } = useBooking();
  const reduced = usePrefersReducedMotion();
  const teaser = useRef<HTMLVideoElement>(null);
  const film = useRef<HTMLVideoElement>(null);
  const cta = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const watched = useRef(0);
  const last = useRef(0);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  // Where the teaser sits after it has been dragged: the left or right edge, and its distance from the bottom.
  const [place, setPlace] = useState<{ side: "left" | "right"; bottom: number } | null>(null);
  const pip = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; id: number; moved: boolean } | null>(null);
  const dragged = useRef(false);
  const flipFrom = useRef<DOMRect | null>(null);

  // Load the teaser once the page is idle.
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const arm = () => setArmed(true);
    const start = () => (w.requestIdleCallback ? w.requestIdleCallback(arm, { timeout: 3000 }) : window.setTimeout(arm, 1500));
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  // The teaser only plays while nothing covers it.
  useEffect(() => {
    const v = teaser.current;
    if (!v || !armed) return;
    if (open || bookingOpen || reduced) v.pause();
    else v.play().catch(() => {});
  }, [armed, open, bookingOpen, reduced]);

  // The film pauses while the booking calendar is open over it.
  useEffect(() => {
    if (open && bookingOpen) film.current?.pause();
    // Closing the calendar unlocks page scroll; the film overlay still needs it locked.
    if (open && !bookingOpen) document.documentElement.style.overflow = "hidden";
  }, [open, bookingOpen]);

  const close = useCallback((fromHistory = false) => {
    film.current?.pause();
    setOpen(false);
    document.documentElement.style.removeProperty("overflow");
    if (!fromHistory && history.state?.agVsl) history.back();
  }, []);

  // Called straight from the tap, so the film starts with sound at once.
  const openFilm = () => {
    const v = film.current;
    if (v) {
      if (v.ended) v.currentTime = 0;
      v.muted = false;
      v.play().catch(() => setPlaying(false));
    }
    track("vsl_open");
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
    history.pushState({ agVsl: true }, "");
    requestAnimationFrame(() => closeBtn.current?.focus());
  };

  // Drag the teaser anywhere; on release it glides to the nearer side edge and keeps its height.
  const onPipDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragged.current = false;
    if (e.button !== 0 || (e.target as HTMLElement).closest(".ag-pip-close")) return;
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: false };
  };
  const onPipMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = pip.current;
    if (!d || !el || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved) {
      if (Math.hypot(dx, dy) < 6) return;
      d.moved = true;
      try {
        el.setPointerCapture(d.id);
      } catch {}
      el.dataset.dragging = "";
    }
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const onPipUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = pip.current;
    drag.current = null;
    if (!d || !el || !d.moved || e.pointerId !== d.id) return;
    dragged.current = true;
    const r = el.getBoundingClientRect();
    flipFrom.current = r;
    el.style.transform = "";
    setPlace({
      side: r.left + r.width / 2 < window.innerWidth / 2 ? "left" : "right",
      bottom: Math.max(0, window.innerHeight - r.bottom),
    });
  };
  // Glide from where it was dropped to its new resting place.
  useLayoutEffect(() => {
    const el = pip.current;
    const from = flipFrom.current;
    if (!el || !from) return;
    flipFrom.current = null;
    const to = el.getBoundingClientRect();
    el.animate([{ transform: `translate(${from.left - to.left}px, ${from.top - to.top}px)` }, { transform: "none" }], {
      duration: reduced ? 0 : 420,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });
    delete el.dataset.dragging;
  }, [place, reduced]);

  const toggle = () => {
    const v = film.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  // Esc and the back button close it (unless the calendar is open on top, which closes first).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !bookingOpen) close();
    };
    const onPop = () => {
      if (history.state?.agVsl) return;
      close(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPop);
    };
  }, [open, bookingOpen, close]);

  // Count real watching time (skipping ahead doesn't count) and fill the button with it.
  const onProgress = () => {
    const v = film.current;
    if (!v) return;
    const t = v.currentTime;
    const d = t - last.current;
    last.current = t;
    if (d > 0 && d < 1.5) watched.current += d;
    const p = Math.min(1, watched.current / UNLOCK_SECONDS);
    cta.current?.style.setProperty("--fuel", `${(p * 100).toFixed(2)}%`);
    if (p >= 1 && !ready) {
      setReady(true);
      track("vsl_cta_ready");
    }
  };

  const book = () => {
    if (!ready) return;
    film.current?.pause();
    openBooking("vsl");
  };

  return (
    <>
      {!hidden ? (
        <div
          ref={pip}
          className="ag-pip"
          data-show={shown && !open ? "" : undefined}
          onPointerDown={onPipDown}
          onPointerMove={onPipMove}
          onPointerUp={onPipUp}
          onPointerCancel={onPipUp}
          style={
            place
              ? {
                  left: place.side === "left" ? "var(--pip-gap)" : "auto",
                  right: place.side === "right" ? "var(--pip-gap)" : "auto",
                  bottom: `max(var(--pip-min), min(${Math.round(place.bottom)}px, calc(100dvh - var(--pip-h) - 72px)))`,
                }
              : undefined
          }
        >
          <button
            type="button"
            className="ag-pip-open"
            onClick={() => {
              // The click that ends a drag doesn't open the film.
              if (dragged.current) return;
              openFilm();
            }}
            aria-label={`Watch the ${VSL.length} video. Drag to move it.`}
          >
            <video
              ref={teaser}
              src={armed ? (reduced ? `${VSL.src}#t=2` : VSL.src) : undefined}
              muted
              playsInline
              disablePictureInPicture
              draggable={false}
              autoPlay={!reduced}
              preload={armed ? (reduced ? "metadata" : "auto") : "none"}
              onLoadedData={() => setShown(true)}
              onTimeUpdate={(e) => {
                if (e.currentTarget.currentTime >= TEASER_SECONDS) e.currentTarget.currentTime = 0;
              }}
              aria-hidden
            />
            <span className="ag-pip-play" aria-hidden>
              <Play size={18} weight="fill" />
            </span>
          </button>
          <button type="button" className="ag-pip-close" onClick={() => setHidden(true)} aria-label="Hide the video">
            <X size={12} weight="bold" />
          </button>
        </div>
      ) : null}

      <div
        className="ag-vsl"
        data-open={open ? "" : undefined}
        role="dialog"
        aria-modal="true"
        aria-label="Video: how it works"
        aria-hidden={!open}
        inert={!open}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <button ref={closeBtn} type="button" onClick={() => close()} aria-label="Close the video" className="ag-icon-btn ag-vsl-close">
          <X size={18} />
        </button>
        <div className="ag-vsl-body">
          <div className="ag-vsl-stage" data-playing={playing ? "" : undefined} onClick={toggle}>
            <video
              ref={film}
              src={armed ? VSL.src : undefined}
              className="ag-vsl-video"
              playsInline
              disablePictureInPicture
              controlsList="nodownload noplaybackrate noremoteplayback"
              preload={armed ? "metadata" : "none"}
              onContextMenu={(e) => e.preventDefault()}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={onProgress}
              onSeeked={(e) => {
                last.current = e.currentTarget.currentTime;
              }}
              onEnded={() => {
                setPlaying(false);
                track("vsl_complete");
              }}
            />
            <button
              type="button"
              className="ag-vsl-toggle"
              aria-label={playing ? "Pause the video" : "Play the video"}
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
            >
              {playing ? <Pause size={30} weight="fill" /> : <Play size={30} weight="fill" />}
            </button>
          </div>
          <button
            ref={cta}
            type="button"
            className="ag-fuel"
            data-ready={ready ? "" : undefined}
            aria-disabled={!ready}
            onClick={book}
            style={{ "--fuel": ready ? "100%" : "0%" } as React.CSSProperties}
          >
            <span className="ag-fuel-base">Book a free 15-minute call</span>
            <span className="ag-fuel-fill" aria-hidden>
              Book a free 15-minute call
            </span>
          </button>
          <p className="ag-vsl-note">
            {ready ? "15 minutes. No pressure. You'll leave with a clear yes or no." : "The button unlocks while you watch."}
          </p>
        </div>
      </div>
    </>
  );
}

/**
 * The film in the page itself (the /agents/watch page): the still frame with a
 * big play button and the length. A tap plays it with sound; tapping again
 * pauses. It pauses by itself when the booking calendar opens.
 */
export function VslInline({ label }: { label: string }) {
  const { isOpen: bookingOpen } = useBooking();
  const film = useRef<HTMLVideoElement>(null);
  const started = useRef(false);
  const half = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (bookingOpen) film.current?.pause();
  }, [bookingOpen]);

  const toggle = () => {
    const v = film.current;
    if (!v) return;
    if (!v.paused) return v.pause();
    v.muted = false;
    v.play().catch(() => {});
    if (!started.current) {
      started.current = true;
      track("vsl_play", { position: "page" });
    }
  };

  return (
    <div className="ag-vsl-stage ag-vsl-inline" data-playing={playing ? "" : undefined} onClick={toggle}>
      <video
        ref={film}
        src={VSL.src}
        poster={VSL.poster}
        aria-label={label}
        className="ag-vsl-video"
        playsInline
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (!half.current && v.duration && v.currentTime / v.duration >= 0.5) {
            half.current = true;
            track("vsl_50", { position: "page" });
            fbq("track", "ViewContent", { content_name: "vsl" });
          }
        }}
        onEnded={() => {
          setPlaying(false);
          track("vsl_complete", { position: "page" });
        }}
      />
      <button
        type="button"
        className="ag-vsl-toggle"
        aria-label={playing ? "Pause the video" : "Play the video"}
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
      >
        {playing ? <Pause size={34} weight="fill" /> : <Play size={34} weight="fill" />}
      </button>
      {!playing ? <span className="ag-vsl-length">{VSL.length}</span> : null}
    </div>
  );
}
