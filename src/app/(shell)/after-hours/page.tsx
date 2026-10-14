import { ArrowUpRight, Asterisk, Cards, Hand, Layout, Plus, Timer } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import { Copy } from "@/components/ui/copy";
import { Breadcrumb, Title } from "@/components/ui/view";
import { afterHours, afterHoursHeading, afterHoursIntro } from "@/content/about";

export const metadata: Metadata = { title: "Built after hours" };

const icons = { hand: Hand, layout: Layout, timer: Timer, cards: Cards, asterisk: Asterisk, plus: Plus };

export default function AfterHoursPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Built after hours" }]} />
      <Title>{afterHoursHeading}</Title>
      <p className="t-lead">{afterHoursIntro}</p>

      <ul className="mt-12 grid gap-16">
        {afterHours.map((p) => {
          const Icon = icons[p.icon] ?? Plus;
          return (
            <li key={p.name} className="grid gap-5 border-t border-line pt-10 first:border-0 first:pt-0">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {p.iconImage ? (
                    <Image src={p.iconImage} alt="" width={44} height={44} className="size-11 rounded-[11px] object-cover shadow-[0_1px_2px_#0003]" />
                  ) : (
                    <span className="flex size-11 items-center justify-center rounded-[11px] bg-[linear-gradient(#2a2b2e,#141516)] text-white shadow-[0_1px_2px_#0003,inset_0_1px_0_#ffffff26]">
                      <Icon size={20} weight="fill" />
                    </span>
                  )}
                  <span className="text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink">
                    <Copy>{p.name}</Copy>
                  </span>
                </div>
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noreferrer" className="t-ui group inline-flex items-center gap-1 text-muted hover:text-ink">
                    <span className="u-link-plain">{new URL(p.href).host}</span>
                    <ArrowUpRight size={11} />
                  </a>
                ) : null}
              </div>
              <div className="frame -mx-4 max-md:mx-0">
                <div className="hatch relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[6px] ring-[0.5px] ring-black/10">
                  {p.shot ? (
                    <Image src={p.shot} alt={`${p.name}, product shot`} fill sizes="(max-width: 640px) 100vw, 560px" className="object-cover object-top" />
                  ) : (
                    <span className="t-mono ph rounded-sm bg-paper px-2 text-[11px]">[Product shot]</span>
                  )}
                </div>
              </div>
              <p className="t-ui font-normal text-body">
                <Copy>{p.body}</Copy>
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
