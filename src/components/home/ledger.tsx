import { FramerLogo } from "@phosphor-icons/react/dist/ssr";
import { currently } from "@/content/home";
import { Copy } from "@/components/ui/copy";

function Logo({ mark }: { mark: string }) {
  if (mark === "framer") return <FramerLogo size={22} weight="fill" className="text-ink" />;
  return (
    <span className="text-[12px] leading-none font-semibold tracking-[-0.01em] text-ink">
      {mark}
    </span>
  );
}

/** "Currently", rendered like wireframe.co's career list. */
export function Ledger() {
  return (
    <ul className="flex flex-col gap-6">
      {currently.map((row) => (
        <li key={row.name} className="flex items-end justify-between gap-4">
          <div className="flex min-w-0 items-center gap-5">
            <span className="logo-box" aria-hidden>
              <Logo mark={row.logo} />
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink">{row.name}</span>
              <span className="t-ui font-normal text-muted">{row.role}</span>
            </div>
          </div>
          <span className="t-ui shrink-0 font-normal whitespace-nowrap text-muted tabular-nums">
            <Copy>{row.years}</Copy>
          </span>
        </li>
      ))}
    </ul>
  );
}
