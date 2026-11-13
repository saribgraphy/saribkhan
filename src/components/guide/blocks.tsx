import { CheckCircle, Info } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

/** A numbered step: big mono number on the left, the heading and body beside it. */
export function Step({ n, id, title, children }: { n: number; id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="grid scroll-mt-28 grid-cols-[40px_minmax(0,1fr)] gap-x-4 max-sm:grid-cols-[32px_minmax(0,1fr)]">
      <span className="t-mono pt-1 text-faint" aria-hidden>
        {String(n).padStart(2, "0")}
      </span>
      <div className="grid gap-4">
        <h2 className="text-[20px] leading-7 font-semibold tracking-[-0.015em] text-ink">
          <span className="sr-only">Step {n}. </span>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="t-body">{children}</p>;
}

/** Inline mono for names you type or click, like a folder name. */
export function K({ children }: { children: React.ReactNode }) {
  return <code className="t-mono rounded-[5px] bg-tint px-1.5 py-0.5 text-[12.5px] text-ink-2">{children}</code>;
}

export function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="u-link font-medium text-ink">
      {children}
    </a>
  );
}

/** A prompt to copy into Claude, in a quiet card with a copy button. */
export function Prompt({ children, label = "Prompt" }: { children: string; label?: string }) {
  return (
    <figure className="frame !p-0 overflow-hidden">
      <figcaption className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="t-label">{label}</span>
        <CopyButton text={children} />
      </figcaption>
      <pre className="t-mono overflow-x-auto px-4 py-3.5 text-[12.5px] leading-[21px] whitespace-pre-wrap text-ink-2">{children}</pre>
    </figure>
  );
}

/** What to have ready, with a tick for each item. */
export function Checklist({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item, i) => (
        <li key={i} className="t-body flex gap-3">
          <CheckCircle size={18} weight="fill" className="mt-[2px] shrink-0 text-ink" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** A short list of bold lead-ins, for "keep building". */
export function Points({ items }: { items: { lead: string; body: React.ReactNode }[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((p) => (
        <li key={p.lead} className="t-body flex gap-3">
          <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-faint" aria-hidden />
          <span>
            <strong className="font-medium text-ink">{p.lead}</strong> {p.body}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** A two-column comparison, in the site's card style. Scrolls sideways on narrow phones. */
export function Compare({ head, rows }: { head: [string, string, string]; rows: [string, string, string][] }) {
  return (
    <div className="card overflow-x-auto !p-0">
      <table className="w-full min-w-[480px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            {head.map((h, i) => (
              <th key={i} scope="col" className={cn("t-label px-4 py-3 font-medium", i === 2 && "text-ink")}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, a, b]) => (
            <tr key={label} className="border-b border-line last:border-0">
              <th scope="row" className="t-ui px-4 py-3 align-top font-medium text-ink">
                {label}
              </th>
              <td className="t-ui px-4 py-3 align-top font-normal text-muted">{a}</td>
              <td className="t-ui px-4 py-3 align-top font-normal text-ink-2">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A tip or note set apart from the steps. */
export function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="t-ui flex gap-2.5 rounded-[10px] bg-tint px-4 py-3 font-normal text-body">
      <Info size={16} className="mt-0.5 shrink-0 text-muted" />
      <span>{children}</span>
    </p>
  );
}
