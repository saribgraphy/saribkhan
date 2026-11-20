"use client";

import { sendGAEvent } from "@next/third-parties/google";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const STORE = "ag-utm";

type Utms = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/** Saves the UTMs from the landing URL for this tab, so they survive until the booking. */
export function captureUtms() {
  try {
    const params = new URLSearchParams(location.search);
    const found: Utms = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 100);
    }
    if (Object.keys(found).length) sessionStorage.setItem(STORE, JSON.stringify(found));
  } catch {}
}

export function utms(): Utms {
  try {
    return JSON.parse(sessionStorage.getItem(STORE) ?? "{}") as Utms;
  } catch {
    return {};
  }
}

/** The ?n= first name: letters, spaces and hyphens only, 20 characters at most. Anything else is ignored. */
export function firstName(): string | null {
  try {
    const n = new URLSearchParams(location.search).get("n")?.trim() ?? "";
    return /^[\p{L} -]{1,20}$/u.test(n) ? n : null;
  } catch {
    return null;
  }
}

/** Sends a GA4 event with the city and UTMs attached. A no-op where GA isn't loaded (local and previews). */
export function track(name: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined" || !("dataLayer" in window)) return;
  const city = document.querySelector<HTMLElement>("[data-ag-city]")?.dataset.agCity ?? "us";
  sendGAEvent("event", name, { city, ...utms(), ...params });
}
