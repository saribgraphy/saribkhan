"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Opens every new page at the very top.
 *
 * Next skips its own reset when the new page's top edge is already on screen.
 * Our pages start 100px or so down the document, so a small scroll on the last
 * page would carry over to the next one. This runs before the new page paints.
 * Back and forward keep their restored position, and links to a #section keep
 * scrolling to it.
 */
export function ScrollReset() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  const popped = useRef<string | null>(null);

  useEffect(() => {
    const onPop = () => {
      popped.current = location.pathname;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useLayoutEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    const isHistoryMove = popped.current === pathname;
    popped.current = null;
    if (isHistoryMove || location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
