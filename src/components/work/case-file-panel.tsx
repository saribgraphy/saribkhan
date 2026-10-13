"use client";

import { ArrowsOutSimple } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SidePanel } from "@/components/ui/side-panel";

/**
 * Wraps an intercepted /work/[slug] in the right-side panel. Closing plays
 * the exit animation, then steps back in history so the URL returns to
 * where the visitor was. The back button closes it the same way.
 */
export function CaseFilePanel({ slug, children }: { slug: string; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const left = useRef(false);
  const here = pathname === `/work/${slug}`;

  const leave = () => {
    if (left.current || !here) return;
    left.current = true;
    router.back();
  };

  // If the exit transition never reports back (background tab, frozen
  // timeline), still leave once it would have finished.
  useEffect(() => {
    if (open) return;
    const t = setTimeout(leave, 650);
    return () => clearTimeout(t);
  });

  return (
    <SidePanel
      open={open && here}
      onOpenChange={(o) => {
        if (!o) setOpen(false);
      }}
      onClosed={leave}
      label={`Case file / ${slug}`}
      footer={
        <a href={`/work/${slug}`} className="t-ui inline-flex items-center gap-1.5 text-muted hover:text-ink">
          <ArrowsOutSimple size={13} />
          Open as a page
        </a>
      }
    >
      {children}
    </SidePanel>
  );
}
