"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PRESSABLE = 'a[href], button:not(:disabled), [role="button"], [role="radio"], [role="tab"], summary';
/** Taps shorter than this still show the pressed state for this long. */
const MIN_PRESS = 140;

/**
 * Site-wide touch feedback and navigation continuity.
 *
 * - Anything pressable gets `data-pressed` while held (and for a beat after a
 *   quick tap), so every click visibly lands. Small controls shrink, wide
 *   blocks shrink less, inline links dim.
 * - Clicking an internal link marks the page as navigating: the current view
 *   softens and a thin bar runs along the top if the next page takes a moment.
 *   The new view then folds in, so there's no jump between the two.
 */
export function Interaction() {
  const pathname = usePathname();
  const [navigating, setNavigating] = useState<{ from: string } | null>(null);
  // Navigation ends when the path changes (adjusted during render, not in an effect).
  if (navigating && navigating.from !== pathname) setNavigating(null);

  useEffect(() => {
    let pressed: HTMLElement | null = null;
    let since = 0;
    let timer: number | undefined;

    const release = (delay = 0) => {
      const el = pressed;
      pressed = null;
      window.clearTimeout(timer);
      if (!el) return;
      if (delay > 0) timer = window.setTimeout(() => el.removeAttribute("data-pressed"), delay);
      else el.removeAttribute("data-pressed");
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const el = (e.target as Element | null)?.closest<HTMLElement>(PRESSABLE);
      if (!el) return;
      release();
      const inline = getComputedStyle(el).display === "inline";
      el.setAttribute("data-pressed", inline ? "inline" : el.offsetWidth > 240 ? "lg" : "sm");
      pressed = el;
      since = performance.now();
    };
    const onUp = () => release(Math.max(0, MIN_PRESS - (performance.now() - since)));
    // A scroll that started on a link is not a press.
    const onCancel = () => release();

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (url.pathname.startsWith("/keystatic") || url.pathname.startsWith("/api")) return;
      setNavigating({ from: location.pathname });
    };

    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("pointerup", onUp, true);
    document.addEventListener("pointercancel", onCancel, true);
    document.addEventListener("dragstart", onCancel, true);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("pointerup", onUp, true);
      document.removeEventListener("pointercancel", onCancel, true);
      document.removeEventListener("dragstart", onCancel, true);
      document.removeEventListener("click", onClick);
      release();
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!navigating) {
      root.removeAttribute("data-navigating");
      return;
    }
    root.setAttribute("data-navigating", "");
    // Never leave the page dimmed if a navigation is abandoned.
    const t = window.setTimeout(() => setNavigating(null), 10_000);
    return () => window.clearTimeout(t);
  }, [navigating]);

  return <div className="nav-progress" data-active={navigating ? "" : undefined} aria-hidden />;
}
