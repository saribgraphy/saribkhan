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
