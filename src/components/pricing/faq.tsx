"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Plus } from "@phosphor-icons/react";
import { faq } from "@/content/pricing";

export function Faq() {
  return (
    <Accordion.Root multiple defaultValue={[0]} className="grid gap-6">
      {faq.map((item, i) => (
        <Accordion.Item key={item.q} value={i}>
          <Accordion.Header>
            <Accordion.Trigger className="group t-ui flex w-full items-center justify-between gap-3 text-left font-[550] text-ink hover:text-body">
              {item.q}
              <Plus size={12} className="shrink-0 text-muted transition-transform duration-300 ease-out group-data-[panel-open]:rotate-45" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="acc-panel">
            <p className="t-ui pt-1.5 font-[450] text-body">{item.a}</p>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
