"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Player = {
  play: () => void;
  pause: () => void;
  destroy: () => void;
  goToAndStop: (value: number, isFrame?: boolean) => void;
  totalFrames: number;
  addEventListener: (name: string, cb: () => void) => void;
};

/**
 * Plays one of the recovered Framer Lottie files from /public/lottie.
 * Loads only when scrolled near, plays only while on screen, and holds a
 * still frame for visitors who prefer reduced motion.
 */
export function Lottie({ src, label, className }: { src: string; label: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let anim: Player | null = null;
    let visible = false;
    let cancelled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const load = async () => {
      const [{ default: lottie }, data] = await Promise.all([
        import("lottie-web/build/player/lottie_light"),
        fetch(src).then((r) => r.json()),
      ]);
      if (cancelled) return;
      anim = lottie.loadAnimation({
        container: el,
        renderer: "svg",
        loop: true,
        autoplay: false,
        animationData: data,
        rendererSettings: { preserveAspectRatio: "xMidYMid meet", progressiveLoad: true },
      }) as unknown as Player;
      anim.addEventListener("DOMLoaded", () => {
        if (reduced) anim?.goToAndStop(Math.round((anim?.totalFrames ?? 0) * 0.4), true);
        else if (visible) anim?.play();
      });
    };

    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !started) {
          started = true;
          void load();
        }
        if (!anim || reduced) return;
        if (visible) anim.play();
        else anim.pause();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      anim?.destroy();
    };
  }, [src]);

  return <div ref={box} role="img" aria-label={label} className={cn("aspect-[400/298]", className ?? "w-full")} />;
}
