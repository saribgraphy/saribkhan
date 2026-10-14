import { Check } from "@phosphor-icons/react/dist/ssr";
import { engagements } from "@/content/pricing";
import { Copy } from "@/components/ui/copy";
import { PanelButton } from "@/components/ui/panel-button";
import { cn } from "@/lib/utils";

/**
 * Two engagements: a light card for the fixed project and a dark one for
 * the ongoing partnership, the way wireframe.co sets its pricing.
 */
export function EngagementCards() {
  return (
    <div className="-mx-2 grid gap-4 max-md:mx-0">
      {engagements.map((e) => {
        const dark = e.style === "dark";
        return (
          <article
            key={e.name}
            className={cn(
              "grid gap-6 rounded-[10px] p-1.5 pb-6",
              dark ? "bg-[#1b1c1d] text-white shadow-[0_0.5px_3.25px_#21222333,0_6px_8px_#21222333]" : "card",
            )}
          >
            <div
              className={cn(
                "grid gap-6 rounded-[4px] px-[18px] pt-4 pb-6",
                dark ? "border-[0.5px] border-white/15 bg-white/[0.04]" : "card-inset",
              )}
            >
              <header className="flex items-start justify-between gap-4">
                <div className="grid gap-1">
                  <h3 className={cn("t-ui font-semibold", dark ? "text-white" : "text-ink")}>{e.name}</h3>
                  <p className={cn("t-ui font-normal", dark ? "text-white/65" : "text-body")}>{e.line}</p>
                </div>
                <span
                  className={cn(
                    "t-mono shrink-0 rounded-[6px] px-2 text-[10.5px] leading-6",
                    dark ? "bg-white/[0.08] text-white ring-[0.5px] ring-white/20" : "bg-white text-muted shadow-card",
                  )}
                >
                  {e.label}
                </span>
              </header>
              <ul className="grid gap-3">
                {e.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-5 items-center">
                      <span
                        className={cn(
                          "flex size-4 items-center justify-center rounded-full",
                          dark ? "bg-white/15 text-white" : "bg-ink/[0.08] text-ink",
                        )}
                      >
                        <Check size={9} weight="bold" />
                      </span>
                    </span>
                    <span className={cn("t-ui font-medium", dark ? "text-white/75" : "text-body")}>
                      <Copy>{item}</Copy>
                    </span>
                  </li>
                ))}
              </ul>
              {e.delivery ? (
                <>
                  <span className={cn("border-t border-dashed", dark ? "border-white/15" : "border-muted/30")} />
                  <p className={cn("t-ui font-normal", dark ? "text-white/60" : "text-muted")}>
                    <Copy>{e.delivery}</Copy>
                  </p>
                </>
              ) : null}
            </div>
            <footer className="mx-[18px] flex flex-wrap items-end justify-between gap-4">
              <div className="grid gap-1">
                {e.priceLabel ? (
                  <span className={cn("t-ui font-medium", dark ? "text-white/70" : "text-muted")}>{e.priceLabel}</span>
                ) : null}
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <span
                    className={cn(
                      "text-[24px] leading-8 font-semibold tracking-[-0.015em] [&_.ph]:bg-none",
                      dark ? "text-white [&_.ph]:text-white" : "text-ink [&_.ph]:text-ink",
                    )}
                  >
                    <Copy>{e.price}</Copy>
                  </span>
                  {e.priceUnit ? (
                    <span className={cn("t-ui font-medium", dark ? "text-white/70" : "text-muted")}>{e.priceUnit}</span>
                  ) : null}
                </span>
              </div>
              <PanelButton panel="start" className={cn("btn", dark ? "btn-light" : "btn-primary")}>
                <span className="btn-label">{e.cta}</span>
              </PanelButton>
            </footer>
          </article>
        );
      })}
    </div>
  );
}
