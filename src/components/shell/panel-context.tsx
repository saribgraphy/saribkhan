"use client";

import { createContext, useCallback, useContext, useMemo, useRef } from "react";

export type PanelName = "start" | "teardown";

type Ctx = {
  open: (name: PanelName) => void;
  close: () => void;
};

const PanelContext = createContext<Ctx | null>(null);

/**
 * Form panels live in the URL as `?panel=start` so the browser back button
 * closes them before leaving the view, and Sarib can deep-link one in a DM.
 * Native history calls sync with Next's router (useSearchParams updates).
 */
export function PanelProvider({ children }: { children: React.ReactNode }) {
  const pushed = useRef(false);

  const open = useCallback((name: PanelName) => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("panel") === name) return;
    url.searchParams.set("panel", name);
    url.hash = "";
    window.history.pushState(null, "", url);
    pushed.current = true;
  }, []);

  const close = useCallback(() => {
    if (pushed.current) {
      pushed.current = false;
      window.history.back();
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete("panel");
    window.history.replaceState(null, "", url);
  }, []);

  const value = useMemo(() => ({ open, close }), [open, close]);
  return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>;
}

export function usePanels() {
  const ctx = useContext(PanelContext);
  if (!ctx) throw new Error("usePanels must be used inside PanelProvider");
  return ctx;
}
