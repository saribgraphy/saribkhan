"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { fbq } from "@/lib/meta-pixel";

/**
 * The Meta Pixel (Meta's standard base code). The small fbq stub is set up at
 * once so no event is lost, and Meta's script (fbevents.js) only loads when the
 * page is idle, so it never slows the first paint. Fires PageView on load and
 * on every client-side route change. Rendered by the root layout on the live
 * site only.
 */
export function MetaPixel({ id }: { id: string }) {
  const path = usePathname();

  useEffect(() => {
    const w = window as Window & { fbq?: unknown; _fbq?: unknown; requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.fbq) return;
    /* eslint-disable */
    const n: any = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    /* eslint-enable */
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    w.fbq = w._fbq = n;
    fbq("init", id);
    const load = () => {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(s);
    };
    if (w.requestIdleCallback) w.requestIdleCallback(load, { timeout: 2500 });
    else setTimeout(load, 1500);
  }, [id]);

  useEffect(() => {
    fbq("track", "PageView");
  }, [path]);

  return null;
}
