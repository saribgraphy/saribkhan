/** Calls the Meta Pixel if it's on the page. A no-op locally and on previews, where it isn't loaded. */
export function fbq(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const f = (window as Window & { fbq?: (...a: unknown[]) => void }).fbq;
  f?.(...args);
}

/** Reads the Meta click cookies (_fbp, _fbc). If _fbc isn't set yet but the URL has an fbclid, builds it the way Meta does. */
export function metaCookies(): { fbp?: string; fbc?: string } {
  if (typeof document === "undefined") return {};
  const get = (k: string) => document.cookie.match(new RegExp(`(?:^|; )${k}=([^;]*)`))?.[1];
  let fbp = get("_fbp");
  if (!fbp && "fbq" in window) {
    // Same format fbevents.js uses; it adopts an existing _fbp instead of making its own.
    fbp = `fb.1.${Date.now()}.${Math.floor(Math.random() * 2147483647)}`;
    document.cookie = `_fbp=${fbp}; path=/; max-age=${60 * 60 * 24 * 90}; SameSite=Lax; Secure`;
  }
  let fbc = get("_fbc");
  if (!fbc) {
    const id = new URLSearchParams(location.search).get("fbclid");
    if (id) fbc = `fb.1.${Date.now()}.${id}`;
  }
  return { ...(fbp ? { fbp } : {}), ...(fbc ? { fbc: fbc.slice(0, 200) } : {}) };
}
