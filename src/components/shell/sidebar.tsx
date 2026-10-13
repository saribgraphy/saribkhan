"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { afterHours } from "@/content/about";
import { nav, site, whatsappLink } from "@/content/site";
import { cn } from "@/lib/utils";
import { CopyEmail } from "./copy-email";
import { useModKey } from "./hooks";
import { Specimen } from "./wordmark";

export const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function openCommandMenu() {
  window.dispatchEvent(new CustomEvent("open-command-menu"));
}

/** Fixed left rail on wide screens. Same posture as wireframe.co's nav. */
export function Sidebar() {
  const pathname = usePathname();
  const mod = useModKey();

  return (
    <>
      <nav
        aria-label="Primary"
        className="sidebar navfade fixed top-[120px] left-[max(24px,calc(50%-var(--container)/2))] z-10 hidden w-[200px] flex-col items-start min-[1200px]:flex"
      >
        <Link href="/" className="mb-6 flex items-center gap-2" aria-label={`${site.name}, home`}>
          <span className="text-[16px] leading-[18px] font-semibold tracking-[-0.01em] whitespace-nowrap text-ink-2">
            {site.name}
          </span>
          <Specimen />
        </Link>

        <ul className="flex flex-col items-start gap-2">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href} className="flex items-center">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn("nav-link t-ui inline-flex items-center gap-2", active && "is-active")}
                >
                  {item.href === "/" ? <span className="t-mono -mr-0.5 text-faint">/</span> : null}
                  {item.label}
                  {item.href === "/after-hours" ? (
                    <span className="t-mono inline-flex h-4 min-w-4 items-center justify-center rounded-[4px] bg-tint px-1 text-[10px] leading-none text-muted">
                      {afterHours.length}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <span className="my-6 h-px w-6 bg-tint-2" />

        <button
          type="button"
          onClick={openCommandMenu}
          className="t-label inline-flex items-center gap-1.5 text-muted hover:text-ink"
        >
          Press
          <kbd className="t-mono inline-flex h-[18px] items-center rounded-[4px] bg-white px-1 text-[10.5px] text-ink shadow-card">
            {mod} K
          </kbd>
          to look around
        </button>
      </nav>

      <div className="navfade fixed bottom-10 left-[max(24px,calc(50%-var(--container)/2))] z-[60] hidden flex-col gap-2 min-[1200px]:flex">
        <p className="text-[11px] leading-[18px] text-body">For new projects</p>
        <CopyEmail />
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="t-ui group inline-flex items-center gap-1.5 text-body hover:text-ink"
        >
          <WhatsappLogo size={14} weight="regular" className="text-faint group-hover:text-ink" />
          <span className="u-link">{site.whatsapp.display}</span>
        </a>
      </div>
    </>
  );
}
