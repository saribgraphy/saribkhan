import Image from "next/image";
import { currently } from "@/content/home";
import { Copy } from "@/components/ui/copy";

function Logo({ row }: { row: (typeof currently)[number] }) {
  if (row.logo) return <Image src={row.logo} alt="" width={24} height={24} className="size-6 object-contain" />;
  return (
    <span className="text-[12px] leading-none font-semibold tracking-[-0.01em] text-ink">
      {row.logoText || row.name.slice(0, 1)}
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
              <Logo row={row} />
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink">{row.name}</span>
              <span className="t-ui font-normal text-muted">
                <Copy>{row.role}</Copy>
              </span>
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
