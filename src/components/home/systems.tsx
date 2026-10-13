import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Fragment } from "react";
import { systems, systemsTail } from "@/content/home";
import { Copy } from "@/components/ui/copy";
import { PanelButton } from "@/components/ui/panel-button";

/** The inline client list. It ends with an empty seat: "Your program". */
export function Systems() {
  return (
    <p className="text-[15px] leading-[26px] font-[450] tracking-[-0.015em] text-body">
      {systems.map((s) => (
        <Fragment key={s.name}>
          {s.href ? (
            <a href={s.href} target="_blank" rel="noreferrer" className="u-link-plain font-medium text-ink">
              {s.name}
            </a>
          ) : (
            <span className="font-medium text-ink">{s.name}</span>
          )}
          {", "}
        </Fragment>
      ))}
      <Copy>{systemsTail.extra}</Copy>
      {", "}
      <Copy>{systemsTail.rest}</Copy>{" "}
      <PanelButton
        panel="start"
        className="sheen inline-flex items-center gap-0.5 rounded-sm align-baseline font-medium text-muted hover:text-ink"
      >
        {systemsTail.last.replace(/\.$/, "")}
        <CaretRight size={11} weight="bold" className="caret-nudge" />
      </PanelButton>
    </p>
  );
}
