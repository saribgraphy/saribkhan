"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/shell/hooks";

/**
 * Plays a short story once, the first time the element scrolls into view:
 * step 0 (before), then each later step after its delay. With reduced motion
 * it jumps straight to the last step.
 *
 * @param delays ms after entering view for each step from 1 onwards, e.g. [600, 1800, 3000]
 */
export function useStory<T extends HTMLElement>(delays: number[]) {
  const ref = useRef<T>(null);
  const [step, setStep] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const timers: number[] = [];
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        delays.forEach((ms, i) => timers.push(window.setTimeout(() => setStep(i + 1), ms)));
      },
      { threshold: 0.45 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      timers.forEach(clearTimeout);
    };
    // The delays are fixed for each mockup; the story plays once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return { ref, step: reduced ? delays.length : step };
}

/** Counts from 0 to `to` once, when `run` turns true. Reduced motion shows the final number. */
export function useCountUp(to: number, run: boolean, ms = 1200) {
  const [n, setN] = useState(0);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!run || reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, reduced, to, ms]);
  return reduced ? to : n;
}
