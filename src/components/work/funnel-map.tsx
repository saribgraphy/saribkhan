"use client";

import Image from "next/image";
import { useState } from "react";
import type { FunnelNode } from "@/content/projects";
import { Copy } from "@/components/ui/copy";
import { cn } from "@/lib/utils";

/** A horizontal chain of the funnel's screens. Click a node to swap the screenshot and note. */
export function FunnelMap({ nodes, project }: { nodes: FunnelNode[]; project: string }) {
  const [active, setActive] = useState(0);
  const node = nodes[active];

  return (
    <div className="grid gap-4">
      <div className="-mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
        <ol className="flex w-max items-center gap-1.5" role="tablist" aria-label={`${project} funnel steps`}>
          {nodes.map((n, i) => (
            <li key={n.label} className="flex items-center gap-1.5">
              <button
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "t-ui flex h-8 items-center gap-2 rounded-full pr-3 pl-1.5 font-medium whitespace-nowrap",
                  i === active ? "bg-ink text-white" : "bg-white text-body shadow-card hover:text-ink",
                )}
              >
                <span
                  className={cn(
                    "t-mono flex size-5 items-center justify-center rounded-full text-[10px]",
                    i === active ? "bg-white/15 text-white" : "bg-tint text-muted",
                  )}
                >
                  {i + 1}
                </span>
                {n.label}
              </button>
              {i < nodes.length - 1 ? (
                <span aria-hidden className={cn("h-px w-3", i < active ? "bg-ink" : "bg-line-2")} />
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <div className="frame" role="tabpanel">
        <div key={active} className="blur-in relative aspect-[16/10] overflow-hidden rounded-[6px] ring-[0.5px] ring-black/10">
          {node.image ? (
            <Image src={node.image} alt={`${project}, ${node.label}`} fill className="object-cover object-top" sizes="520px" />
          ) : (
            <div className="hatch flex h-full w-full items-center justify-center">
              <span className="t-mono ph rounded-sm bg-paper px-2">[Screenshot: {node.label}]</span>
            </div>
          )}
        </div>
      </div>
      {node.note ? (
        <p key={`n-${active}`} className="fold-in t-ui font-normal text-body">
          <span className="font-medium text-ink">{node.label}.</span> <Copy>{node.note}</Copy>
        </p>
      ) : null}
    </div>
  );
}
