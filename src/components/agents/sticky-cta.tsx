"use client";

import { useEffect, useState } from "react";
import { BookButton, useBooking } from "./booking";

/**
 * Appears once the hero button scrolls out of view. Hides again while the
 * booking overlay is open or the final call to action is on screen, so two
 * buttons never compete. Desktop: slim top bar. Mobile: thumb-reach bottom bar.
 */
export function StickyCta() {
  const { isOpen } = useBooking();
  const [heroGone, setHeroGone] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("ag-hero-cta");
    const final = document.getElementById("ag-final");
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0);
        if (e.target === final) setFinalVisible(e.isIntersecting);
      }
    });
    if (hero) obs.observe(hero);
    if (final) obs.observe(final);
    return () => obs.disconnect();
  }, []);

  const show = heroGone && !finalVisible && !isOpen;
  return (
    <div className="ag-sticky" data-show={show ? "" : undefined} aria-hidden={!show}>
      <div className="ag-sticky-inner">
        <span className="ag-logo text-[16px] font-semibold tracking-[-0.015em] text-ink">Never miss another lead.</span>
        <BookButton position="sticky" className="ag-cta-sticky">
          Book a free call
        </BookButton>
      </div>
    </div>
  );
}
