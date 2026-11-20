"use client";

import { X } from "@phosphor-icons/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { captureUtms, firstName, track, utms } from "./track";

/** e.g. "sarib/agents-intro". Set NEXT_PUBLIC_CAL_LINK in Vercel. */
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "";
const CAL_URL = CAL_LINK ? `https://cal.com/${CAL_LINK}` : "";
const NS = "agents";

type CalApi = ((...args: unknown[]) => void) & { ns?: Record<string, (...args: unknown[]) => void>; loaded?: boolean };
declare global {
  interface Window {
    Cal?: CalApi;
  }
}

type Booking = { open: (position: string) => void; isOpen: boolean; name: string | null };
const Ctx = createContext<Booking>({ open: () => {}, isOpen: false, name: null });
export const useBooking = () => useContext(Ctx);

/** Cal's official embed loader, as a function so it only runs when we call it. */
function loadCal() {
  /* eslint-disable */
  (function (C: any, A: string, L: string) {
    const p = function (a: any, ar: any) {
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  /* eslint-enable */
}

/**
 * Owns the booking overlay. The Cal calendar is loaded and rendered in the
 * background once the page is idle (hidden with opacity and visibility, never
 * display:none, so the iframe really renders). Any "Book" button then just
 * reveals it, so the calendar is already there when the agent taps.
 */
export function BookingProvider({ city, children }: { city: string; children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [booked, setBooked] = useState(false);
  // The ?n= first name, read from the URL on the client (null while prerendering).
  const name = useSyncExternalStore(
    () => () => {},
    firstName,
    () => null,
  );
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const readyRef = useRef(false);
  const openRef = useRef(false);

  // Landing: keep the UTMs and the first name.
  useEffect(() => {
    captureUtms();
    track("page_view_agents", { path: location.pathname });
    // Scroll depth, once each at 50% and 90%.
    const sent = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (max <= 0) return;
      const pct = (scrollY / max) * 100;
      for (const mark of [50, 90]) {
        if (pct >= mark && !sent.has(mark)) {
          sent.add(mark);
          track("scroll_depth", { percent: mark });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Preload Cal after first paint, when the browser is idle (2s fallback).
  useEffect(() => {
    if (!CAL_LINK) return;
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      loadCal();
      const cal = window.Cal!;
      cal("init", NS, { origin: "https://cal.com" });
      const api = cal.ns![NS];
      const u = utms();
      const n = firstName();
      api("inline", {
        elementOrSelector: "#ag-cal",
        calLink: CAL_LINK,
        layout: "month_view",
        config: {
          theme: "light",
          ...(n ? { name: n } : {}),
          "metadata[city]": city,
          ...(u.utm_source ? { "metadata[utm_source]": u.utm_source } : {}),
          ...(u.utm_medium ? { "metadata[utm_medium]": u.utm_medium } : {}),
          ...(u.utm_campaign ? { "metadata[utm_campaign]": u.utm_campaign } : {}),
        },
      });
      api("ui", { theme: "light", hideEventTypeDetails: false, cssVarsPerTheme: { light: { "cal-brand": "#212223" } } });
      api("on", {
        action: "linkReady",
        callback: () => {
          readyRef.current = true;
          setReady(true);
        },
      });
      const onBooked = () => {
        setBooked(true);
        track("booking_complete");
      };
      api("on", { action: "bookingSuccessfulV2", callback: onBooked });
      api("on", { action: "bookingSuccessful", callback: onBooked });
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 2000 });
    else setTimeout(start, 2000);
    return () => {
      cancelled = true;
    };
  }, [city]);

  const close = useCallback((fromHistory = false) => {
    openRef.current = false;
    setOpen(false);
    document.documentElement.style.removeProperty("overflow");
    if (!fromHistory && history.state?.agBooking) history.back();
    lastFocus.current?.focus?.();
  }, []);

  const open = useCallback(
    (position: string) => {
      track("cta_click", { position });
      openRef.current = true;
      lastFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
      track("booking_overlay_open", { position });
      document.documentElement.style.overflow = "hidden";
      history.pushState({ agBooking: true }, "");
      requestAnimationFrame(() => closeBtn.current?.focus());
      // If the calendar still isn't ready 4 seconds after the tap, open Cal in a new tab instead.
      if (CAL_URL) {
        window.setTimeout(() => {
          if (openRef.current && !readyRef.current) {
            window.open(CAL_URL, "_blank", "noopener");
            close();
          }
        }, 4000);
      }
    },
    [close],
  );

  // Back button and Esc close it; Tab stays inside it.
  useEffect(() => {
    const onPop = () => {
      if (isOpen) close(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("button, a[href], iframe, [tabindex]:not([tabindex='-1'])");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <Ctx.Provider value={{ open, isOpen, name }}>
      {children}
      <div
        className="ag-overlay"
        data-open={isOpen ? "" : undefined}
        aria-hidden={!isOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div ref={panel} className="ag-overlay-panel" role="dialog" aria-modal="true" aria-label="Book a call">
          <div className="ag-overlay-bar">
            <span className="t-ui font-medium text-ink">Book a free 15-minute call</span>
            <button ref={closeBtn} type="button" onClick={() => close()} aria-label="Close" className="ag-icon-btn">
              <X size={18} />
            </button>
          </div>
          <div className="ag-overlay-body">
            {booked ? (
              <div className="ag-booked">
                <p className="t-display">You&apos;re booked.</p>
                <p className="t-lead">You&apos;ll get a calendar invite in a minute.</p>
              </div>
            ) : CAL_LINK ? (
              <>
                {!ready ? <div className="ag-cal-skeleton" aria-hidden /> : null}
                <div id="ag-cal" className="ag-cal" />
              </>
            ) : (
              <div className="ag-booked">
                <p className="t-display">
                  <span className="ph">[Cal link goes here]</span>
                </p>
                <p className="t-lead">Set NEXT_PUBLIC_CAL_LINK in Vercel and the booking calendar appears here, already loaded.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Ctx.Provider>
  );
}

/** The one button on the page. Every instance opens the same booking overlay. */
export function BookButton({
  position,
  children = "Book a free 15-minute call",
  className = "",
  id,
}: {
  position: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const { open } = useBooking();
  return (
    <button id={id} type="button" className={`btn btn-primary ag-cta ${className}`} onClick={() => open(position)}>
      <span className="btn-label">{children}</span>
    </button>
  );
}
