"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Click copies the address (with a small "Copied" tag), like wireframe.co. */
export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(0);

  return (
    <span className="relative inline-flex items-center">
      <a
        href={`mailto:${site.email}`}
        onClick={async (e) => {
          if (!navigator.clipboard) return;
          e.preventDefault();
          try {
            await navigator.clipboard.writeText(site.email);
            setCopied((n) => n + 1);
          } catch {
            window.location.href = `mailto:${site.email}`;
          }
        }}
        className={cn("t-ui u-link text-body hover:text-ink", className)}
        title="Click to copy"
      >
        {site.email}
      </a>
      {copied ? (
        <span
          key={copied}
          role="status"
          className="copied pointer-events-none absolute top-1/2 left-[calc(100%+8px)] rounded-md bg-tint-2 px-1.5 py-[3px] text-[11px] leading-none font-medium text-ink"
        >
          Copied
        </span>
      ) : null}
    </span>
  );
}
