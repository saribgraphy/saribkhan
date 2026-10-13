"use client";

import Image from "next/image";
import { useState } from "react";

/** Drag the handle across the old and new version. Only rendered when a real "before" exists. */
export function BeforeAfter({ before, after, caption }: { before: string; after: string; caption: string }) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="grid gap-3">
      <div className="frame">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] select-none">
          <Image src={after} alt="After" fill className="object-cover object-top" sizes="520px" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image src={before} alt="Before" fill className="object-cover object-top" sizes="520px" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_0_0.5px_#0003]" style={{ left: `${pos}%` }}>
            <span className="absolute top-1/2 left-1/2 flex h-8 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-pop">
              <span className="h-3 w-px bg-faint" />
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Compare before and after"
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
          <span className="t-mono absolute top-2 left-2 rounded bg-black/60 px-1.5 text-[10px] text-white">Before</span>
          <span className="t-mono absolute top-2 right-2 rounded bg-black/60 px-1.5 text-[10px] text-white">After</span>
        </div>
      </div>
      <figcaption className="t-label">{caption}</figcaption>
    </figure>
  );
}
