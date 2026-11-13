"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useState } from "react";

/** Copies a prompt, then says so for a moment. */
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {}
      }}
      className="t-label inline-flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-tint hover:text-ink"
      aria-label={copied ? "Copied" : "Copy prompt"}
    >
      {copied ? <Check size={13} weight="bold" /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
