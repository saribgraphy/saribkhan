"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const subscribeNoop = () => () => {};

/** "⌘" on Apple platforms, "Ctrl" elsewhere. Server renders "⌘". */
export function useModKey() {
  return useSyncExternalStore(
    subscribeNoop,
    () => (/Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl"),
    () => "⌘",
  );
}

const fmt = () =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

/** The visitor's own local time, ticking on the minute. Null until mounted. */
export function useLocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setTime(fmt());
      timer = setTimeout(tick, 60_000 - (Date.now() % 60_000) + 50);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);
  return time;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
