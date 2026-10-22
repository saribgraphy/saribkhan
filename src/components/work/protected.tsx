"use client";

import { cn } from "@/lib/utils";

/**
 * Discourages saving an image: no right-click menu, no dragging, no
 * long-press "Save image" on iOS, and a transparent layer over the picture.
 * Nothing on the web is fully copy-proof (screenshots still work), but this
 * removes every casual way to download.
 */
export function Protected({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn("relative select-none [-webkit-touch-callout:none]", className)}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
      <div aria-hidden className="absolute inset-0" />
    </div>
  );
}
