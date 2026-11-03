"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  ["you", "Who you are"],
  ["summary", "The short version"],
  ["map", "Where traffic goes"],
  ["websites", "Websites"],
  ["links", "Link test log"],
  ["seo", "SEO and tracking"],
  ["funnel", "Funnel and offer"],
  ["brand", "Brand and copy"],
  ["channels", "Channels"],
  ["reputation", "Reputation"],
  ["fix", "What I'd fix"],
  ["roadmap", "12-week roadmap"],
  ["me", "About me"],
] as const;

/** The sticky index on the left. The section in view is highlighted. */
export function ReportIndex({ brand }: { brand: string }) {
  const [on, setOn] = useState<string | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setOn(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    SECTIONS.forEach(([id]) => {
      const s = document.getElementById(id);
      if (s) io.observe(s);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav className="toc" aria-label="Sections">
      <span className="brand">{brand}</span>
      <ol>
        {SECTIONS.map(([id, label], i) => (
          <li key={id}>
            <a href={`#${id}`} className={on === id ? "on" : undefined}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Click any screenshot (a .shot button with data-full) to see it full size.
 * One listener for the whole report, so the sections can stay server-rendered.
 */
export function ScreenshotZoom() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [shot, setShot] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const b = (e.target as Element | null)?.closest<HTMLElement>(".shot[data-full]");
      if (!b) return;
      setShot({ src: b.dataset.full ?? "", alt: b.querySelector("img")?.alt ?? "" });
      dialog.current?.showModal?.();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <dialog
      ref={dialog}
      id="zoom"
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
    >
      <button type="button" onClick={() => dialog.current?.close()}>
        Close
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element -- full-size screenshot, shown as is */}
      {shot ? <img src={shot.src} alt={shot.alt} /> : null}
    </dialog>
  );
}

/** The larger blocks that rise in as they reach the viewport. */
const REVEAL =
  ".stamp, .card, .num, .score, .prio > li, .mapwrap, .figs > figure, section > figure, .findings, .tablewrap, .journey, .dist, .gantt, .phase, .me, .contact, .pull";

/**
 * Blocks already on screen stay put; everything below fades and rises in once
 * it scrolls into view. Siblings in the same row follow each other by 70ms.
 * Without JavaScript (or with reduced motion) everything is simply visible.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".audit");
    if (!root || !("IntersectionObserver" in window)) return;
    const els = [...root.querySelectorAll<HTMLElement>(REVEAL)];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => {
      el.setAttribute("data-reveal", "");
      const siblings = el.parentElement ? [...el.parentElement.children].filter((c) => c.matches(REVEAL)) : [];
      el.style.transitionDelay = `${(siblings.indexOf(el) % 4) * 70}ms`;
      // Already in view on load: no animation, so nothing blinks out.
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
      else io.observe(el);
    });
    root.classList.add("reveal-ready");
    return () => io.disconnect();
  }, []);

  return null;
}
