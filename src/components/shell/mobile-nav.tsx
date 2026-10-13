"use client";

import { Dialog } from "@base-ui/react/dialog";
import { MagnifyingGlass, WhatsappLogo, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { afterHours } from "@/content/about";
import { nav, site, socials, whatsappLink } from "@/content/site";
import { cn } from "@/lib/utils";
import { CopyEmail } from "./copy-email";
import { KarachiClock, StatusLine } from "./right-rail";
import { isActive, openCommandMenu } from "./sidebar";

/** Below 1200px the rails fold into a floating "/" pill that opens a bottom sheet. */
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = nav.find((n) => isActive(pathname, n.href))?.label ?? "Home";

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="fixed inset-x-4 top-4 z-[70] flex justify-center min-[1200px]:hidden">
        <Dialog.Trigger
          className="flex h-10 items-center gap-2.5 rounded-full bg-[linear-gradient(#ececec99,#e1e1e199)] pr-4 pl-3 text-[14px] font-medium text-ink shadow-card backdrop-blur-[6px] active:scale-[0.97]"
          aria-label={`Open menu, current view ${current}`}
        >
          <span className="t-mono flex size-5 items-center justify-center rounded-full bg-white text-[12px] text-ink shadow-card">
            /
          </span>
          <span key={current} className="fold-in">
            {current}
          </span>
        </Dialog.Trigger>
      </div>

      <Dialog.Portal>
        <Dialog.Backdrop className="panel-backdrop" />
        <Dialog.Popup className="sheet p-2" aria-label="Menu">
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <Dialog.Title className="text-[15px] font-semibold text-ink">{site.name}</Dialog.Title>
            <Dialog.Close className="-mr-1 flex size-8 items-center justify-center rounded-md text-muted hover:bg-tint" aria-label="Close menu">
              <X size={16} />
            </Dialog.Close>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setTimeout(openCommandMenu, 220);
            }}
            className="mx-2 mb-2 flex h-10 w-[calc(100%-16px)] items-center gap-2 rounded-lg bg-white px-3 text-[14px] text-muted shadow-card"
          >
            <MagnifyingGlass size={15} />
            Look around
          </button>
          <ul className="grid">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex h-11 items-center justify-between rounded-lg px-4 text-[15px]",
                      active ? "bg-tint font-medium text-ink" : "text-body hover:bg-tint",
                    )}
                  >
                    {item.label}
                    {item.href === "/after-hours" ? (
                      <span className="t-mono text-[11px] text-muted">{afterHours.length}</span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mx-4 my-3 h-px bg-line" />
          <div className="grid gap-2 px-4 pb-3">
            <p className="text-[11px] leading-[18px] text-body">For new projects</p>
            <CopyEmail />
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="t-ui inline-flex items-center gap-1.5 text-body">
              <WhatsappLogo size={14} /> {site.whatsapp.display}
            </a>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
              <StatusLine />
              <KarachiClock />
            </div>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="t-ui text-body hover:text-ink">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
