"use client";

import { Pause, Play, X } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/shell/hooks";
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
        <div className="ag-pip" data-show={shown && !open ? "" : undefined}>
          <button type="button" className="ag-pip-open" onClick={openFilm} aria-label={`Watch the ${VSL.length} video`}>
            <video
              ref={teaser}
              src={armed ? (reduced ? `${VSL.src}#t=2` : VSL.src) : undefined}
              muted
              playsInline
              disablePictureInPicture
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
