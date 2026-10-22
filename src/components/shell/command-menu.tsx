"use client";

import { Dialog } from "@base-ui/react/dialog";
import {
  ArrowRight,
  Copy as CopyIcon,
  FileText,
  Folder,
  MagnifyingGlass,
  PaperPlaneTilt,
  VideoCamera,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { notes } from "@/content/notes";
import { openProjects } from "@/content/projects";
import { nav, site, whatsappLink } from "@/content/site";
import { usePanels } from "./panel-context";

type Item = {
  id: string;
  label: string;
  hint?: string;
  keywords?: string[];
  icon: React.ReactNode;
  run: () => void;
};

/** ⌘K / Ctrl K (or "/") opens a jump-anywhere menu. Type "funnel", "price", "skool" or "book". */
export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const panels = usePanels();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target?.closest("input, textarea, [contenteditable='true']");
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-menu", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-menu", onOpen);
    };
  }, []);

  const go = (fn: () => void) => () => {
    setOpen(false);
    // Let the menu start closing before the view changes underneath it.
    setTimeout(fn, 60);
  };

  const groups: { heading: string; items: Item[] }[] = [
    {
      heading: "Views",
      items: nav.map((n) => ({
        id: `nav-${n.href}`,
        label: n.label,
        keywords: n.keywords,
        icon: <ArrowRight size={14} />,
        run: go(() => router.push(n.href)),
      })),
    },
    {
      heading: "Jump to",
      items: [
        {
          id: "xray",
          label: "The Funnel X-ray",
          hint: "What I build",
          keywords: ["funnel", "touchpoints", "skool", "application", "booking", "pre-call", "onboarding"],
          icon: <MagnifyingGlass size={14} />,
          run: go(() => router.push("/build#xray")),
        },
        {
          id: "demos",
          label: "Try the live demos",
          hint: "Calculator, application step, booking card",
          keywords: ["calculator", "roi", "quiz", "book", "coach"],
          icon: <ArrowRight size={14} />,
          run: go(() => router.push("/build#try")),
        },
        {
          id: "pricing",
          label: "Prices and engagements",
          hint: "Working together",
          keywords: ["price", "cost", "pricing", "rebuild", "partner", "retainer"],
          icon: <ArrowRight size={14} />,
          run: go(() => router.push("/working-together")),
        },
        {
          id: "faq",
          label: "Questions people ask",
          hint: "Working together",
          keywords: ["faq", "time zone", "payment", "webflow", "framer"],
          icon: <ArrowRight size={14} />,
          run: go(() => router.push("/working-together#faq")),
        },
        {
          id: "translator",
          label: "The Translator",
          hint: "Notes",
          keywords: ["pop", "font", "cheap", "client"],
          icon: <ArrowRight size={14} />,
          run: go(() => router.push("/notes#translator")),
        },
      ],
    },
    {
      heading: "Work",
      items: openProjects.map((p) => ({
        id: `p-${p.slug}`,
        label: p.name,
        hint: "Case file",
        keywords: ["funnel", "work", ...p.tags],
        icon: <Folder size={14} />,
        run: go(() => router.push(`/work/${p.slug}`)),
      })),
    },
    {
      heading: "Notes",
      items: notes.map((n) => ({
        id: `n-${n.slug}`,
        label: n.title,
        hint: n.readingTime,
        icon: <FileText size={14} />,
        run: go(() => router.push(`/notes/${n.slug}`)),
      })),
    },
    {
      heading: "Get in touch",
      items: [
        {
          id: "start",
          label: "Start a project",
          keywords: ["book", "apply", "hire", "contact"],
          icon: <PaperPlaneTilt size={14} />,
          run: go(() => panels.open("start")),
        },
        {
          id: "teardown",
          label: "Get a free funnel teardown",
          keywords: ["free", "audit", "review", "video", "loom"],
          icon: <VideoCamera size={14} />,
          run: go(() => panels.open("teardown")),
        },
        {
          id: "voice",
          label: "Send a voice note",
          hint: "WhatsApp",
          keywords: ["whatsapp", "book", "call", "message"],
          icon: <WhatsappLogo size={14} />,
          run: go(() => window.open(whatsappLink(), "_blank", "noopener")),
        },
        {
          id: "copy-email",
          label: "Copy email address",
          hint: site.email,
          keywords: ["email", "mail"],
          icon: <CopyIcon size={14} />,
          run: go(() => navigator.clipboard?.writeText(site.email)),
        },
      ],
    },
  ];

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(o) => {
        if (!o) setSearch("");
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="panel-backdrop !bg-[#fdfdfc66]" />
        <Dialog.Popup className="cmdk" aria-label="Look around">
          <Dialog.Title className="sr-only">Look around</Dialog.Title>
          <Command label="Look around" loop>
            <div className="flex h-12 items-center gap-2.5 border-b border-line px-4">
              <MagnifyingGlass size={15} className="text-muted" />
              <Command.Input
                value={search}
                onValueChange={setSearch}
                autoFocus
                placeholder="Try funnel, price, skool or book"
                className="h-full flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-faint"
              />
              <kbd className="t-mono rounded-[4px] bg-white px-1.5 text-[10.5px] leading-[18px] text-muted shadow-card">esc</kbd>
            </div>
            <Command.List className="max-h-[min(380px,60vh)] overflow-y-auto overscroll-contain p-2">
              <Command.Empty className="t-ui px-3 py-6 text-center text-muted">
                Nothing for that yet. Try &ldquo;funnel&rdquo; or &ldquo;price&rdquo;.
              </Command.Empty>
              {groups.map((g) => (
                <Command.Group
                  key={g.heading}
                  heading={g.heading}
                  className="[&_[cmdk-group-heading]]:t-label [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1"
                >
                  {g.items.map((item) => (
                    <Command.Item
                      key={item.id}
                      value={`${item.label} ${item.hint ?? ""}`}
                      keywords={item.keywords}
                      onSelect={item.run}
                      className="t-ui flex h-9 cursor-pointer items-center gap-2.5 rounded-md px-3 text-body"
                    >
                      <span className="text-faint">{item.icon}</span>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.hint ? <span className="t-label truncate">{item.hint}</span> : null}
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
