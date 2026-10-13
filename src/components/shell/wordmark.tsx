"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "./hooks";

const faces = [
  { name: "Inter", className: "font-sans font-semibold" },
  { name: "Instrument Serif", className: "font-serif italic" },
  { name: "Geist Mono", className: "font-mono font-medium" },
  { name: "Instrument Serif", className: "font-serif" },
];

/** The "Aa" specimen. Cycles the faces used on the page every 2.5s. */
export function Specimen({ size = "sm", className }: { size?: "sm" | "lg"; className?: string }) {
  const [i, setI] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((n) => (n + 1) % faces.length), 2500);
    return () => clearInterval(id);
  }, [reduced]);

  const face = faces[i];
  return (
    <span
      className={cn(
        "group/spec relative inline-flex select-none items-center justify-center align-middle text-ink",
        size === "sm"
          ? "h-5 min-w-7 rounded-[5px] px-1 text-[12px] leading-none shadow-card bg-white"
          : "mx-1 h-[38px] min-w-[54px] -translate-y-[3px] rounded-[9px] px-2 text-[26px] leading-none shadow-card bg-white max-md:h-[32px] max-md:min-w-[46px] max-md:text-[22px]",
        className,
      )}
      title={face.name}
      aria-label={`Type specimen: ${face.name}`}
    >
      <span key={i} className={cn("blur-in inline-block", face.className)}>
        Aa
      </span>
      <span
        className={cn(
          "pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-1.5 py-0.5 font-sans text-[10.5px] leading-4 font-medium text-white opacity-0 transition-opacity group-hover/spec:opacity-100",
          size === "sm" ? "top-[calc(100%+6px)]" : "-top-7",
        )}
      >
        {face.name}
      </span>
    </span>
  );
}
