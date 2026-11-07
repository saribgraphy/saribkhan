"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import { Lottie } from "@/components/build/lottie";
import { site, socials } from "@/content/site";
import { useKarachiTime } from "./hooks";

export function StatusLine({ className }: { className?: string }) {
  return (
    <span className={`t-label inline-flex items-center gap-2 text-muted ${className ?? ""}`}>
      <span className="status-dot" aria-hidden />
      {site.status}
    </span>
  );
}

export function KarachiClock({ className }: { className?: string }) {
  const time = useKarachiTime();
  return (
    <span className={`t-label inline-flex items-center gap-1.5 text-muted ${className ?? ""}`}>
      <span className="t-mono text-[11.5px] text-ink-2" suppressHydrationWarning>
        {time ?? "--:--"}
      </span>
      in {site.city}
    </span>
  );
}

/** Top-right meta column on wide screens, where wireframe.co keeps its visitor count and follow link. */
export function RightRail() {
  return (
    <div className="navfade absolute top-[120px] right-0 z-10 hidden flex-col items-end gap-1 min-[1200px]:flex">
      <StatusLine />
      <KarachiClock />
      <span className="my-4 h-px w-6 bg-tint-2" />
      <span className="t-label mb-1 text-muted">Follow</span>
      <ul className="flex flex-col items-end gap-1.5">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="t-ui group inline-flex items-center gap-1 text-body hover:text-ink"
            >
              <span className="u-link-plain">{s.label}</span>
              <ArrowUpRight size={11} className="text-faint group-hover:text-ink" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The animated SK mark from the old Framer site, fixed in the bottom-right on
 * wide screens to mirror the contact block in the bottom-left. Links home.
 * With reduced motion it holds frame ~295 of 569, where the mark is fully drawn.
 */
export function LogoMark() {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      className="navfade fixed right-[max(24px,calc(50%-var(--container)/2))] bottom-10 z-[60] hidden min-[1200px]:block"
    >
      <Lottie src="/lottie/originals/sk-logo-icon.json" label="Sarib Khan logo" ratio="aspect-square" still={0.52} className="w-10" />
    </Link>
  );
}
