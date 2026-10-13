"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { collage } from "@/content/about";
import { Copy } from "@/components/ui/copy";
import { cn } from "@/lib/utils";

/**
 * The desk collage. Objects can be nudged and dragged a little, then spring
 * back. Real photos only: until they're added each object shows its label.
 */
export function Collage() {

  return (
    // Laid out on a fixed 640x520 board, zoomed down to fit narrow screens.
    <div
      className="relative mt-12 h-[520px] w-[640px] max-w-none -translate-x-10 max-md:mx-auto max-md:translate-x-0 max-md:[zoom:0.52] max-[380px]:[zoom:0.48]"
    >
      <Doodles />
      {collage.map((item, i) => (
        <motion.figure
          key={item.id}
          drag
          dragSnapToOrigin
          dragElastic={0.35}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          whileHover={{ scale: 1.03, rotate: item.rotate * 0.4 }}
          whileDrag={{ scale: 1.06, zIndex: 30, cursor: "grabbing" }}
          initial={{ opacity: 0, y: 12, rotate: item.rotate }}
          animate={{ opacity: 1, y: 0, rotate: item.rotate }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.15 + i * 0.05 }}
          className="group absolute cursor-grab touch-none select-none"
          style={{ left: `${item.x}%`, top: `${item.y}%`, width: item.w, zIndex: 10 + i }}
        >
          <Shape item={item} />
          <figcaption className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-md bg-ink px-1.5 py-0.5 text-[11px] leading-4 font-medium whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
            <Copy>{item.caption}</Copy>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

function Shape({ item }: { item: (typeof collage)[number] }) {
  const base = "shadow-[0_1px_2px_#0000001a,0_8px_24px_-6px_#00000026] ring-[0.5px] ring-black/10";
  const label = (
    <span className="t-mono px-3 text-center text-[10.5px] leading-4 text-muted">
      <Copy>{item.label}</Copy>
    </span>
  );

  if (item.shape === "sticker")
    return (
      <span
        className="flex items-center justify-center rounded-full border-[3px] border-white bg-ink px-4 text-[15px] font-semibold tracking-[-0.01em] text-white shadow-[0_2px_8px_#0003]"
        style={{ height: item.h }}
      >
        {item.label}
      </span>
    );

  if (item.shape === "badge")
    return (
      <span
        className={cn("flex items-center gap-2 rounded-[12px] bg-white px-3", base)}
        style={{ height: item.h }}
      >
        <svg width="14" height="20" viewBox="0 0 14 21" aria-hidden className="shrink-0 fill-ink">
          <path d="M0 0h14v7H7L0 0zm0 7h7l7 7H7v7l-7-7V7z" />
        </svg>
        <span className="text-[12px] leading-4 font-medium text-ink">{item.label}</span>
      </span>
    );

  return (
    <div
      className={cn(
        "overflow-hidden bg-white",
        item.shape === "round" ? "rounded-full" : item.shape === "photo" ? "rounded-[4px] p-1.5 pb-6" : "rounded-[10px]",
        base,
      )}
      style={{ height: item.h }}
    >
      {item.image ? (
        <Image src={item.image} alt={item.caption} width={item.w * 2} height={item.h * 2} className="h-full w-full object-cover" draggable={false} />
      ) : (
        <div className={cn("hatch flex h-full w-full items-center justify-center", item.shape === "round" ? "rounded-full" : "rounded-[3px]")}>
          {label}
        </div>
      )}
    </div>
  );
}

function Doodles() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 640 520" preserveAspectRatio="none" fill="none">
      <path d="M40 120C120 40 260 20 330 90s60 170 180 150" stroke="#0000001f" strokeWidth="1.25" strokeDasharray="3 5" />
      <path d="M560 60c30 50 40 120 0 180" stroke="#00000024" strokeWidth="1.25" />
      <path d="M552 236l8 6 6-9" stroke="#00000024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(470 330)" stroke="#00000033" strokeWidth="1.5" strokeLinecap="round">
        <path d="M0 -12V12M-10 -6L10 6M-10 6L10 -6" />
      </g>
      <path d="M90 440c30-30 70-30 100 0s70 30 100 0" stroke="#0000001c" strokeWidth="1.25" />
    </svg>
  );
}
