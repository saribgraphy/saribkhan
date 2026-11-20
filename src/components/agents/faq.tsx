"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Plus } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const Ph = ({ children }: { children: React.ReactNode }) => <span className="ph">[{children}]</span>;

const QUESTIONS: [string, React.ReactNode][] = [
  [
    "Will it say the wrong thing to my clients?",
    "It only answers from your listings and the FAQs you approve. Anything it isn't sure about goes straight to you.",
  ],
  ["Is it going to replace me?", "No. It handles the first reply, the questions and the booking. You do the showings and the closing."],
  ["Do I need a new number or new software?", "No. It works with the number, inbox and accounts you already use."],
  ["Will it text people who never asked?", "No. It only replies to people who contacted you first."],
  [
    "What does it cost?",
    <Ph key="price">Price or range Sarib chooses, or: We&apos;ll give you an exact price on the call. Most agents make it back with one extra deal.</Ph>,
  ],
  ["What if it doesn't work for me?", <Ph key="risk">Same risk reversal as the offer card</Ph>],
];

/** The six questions, in the same accordion style as the X-ray on /build. */
export function Faq() {
  return (
    <Accordion.Root multiple className="card overflow-hidden !bg-white">
      {QUESTIONS.map(([q, a], i) => (
        <Accordion.Item key={q} className={cn(i > 0 && "border-t border-line")}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex min-h-12 w-full items-center gap-4 px-4 py-3 text-left hover:bg-paper-3 data-[panel-open]:bg-paper-3">
              <span className="t-ui flex-1 font-medium text-ink">{q}</span>
              <Plus size={13} className="shrink-0 text-muted transition-transform duration-300 ease-out group-data-[panel-open]:rotate-45" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="acc-panel">
            <p className="t-ui px-4 py-5 font-normal text-body">{a}</p>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
