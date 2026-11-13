import {
  ArrowRight,
  ArrowUpRight,
  Article,
  CalendarCheck,
  CaretDown,
  ChatCircle,
  CheckCircle,
  Code,
  DownloadSimple,
  FileCode,
  FolderSimple,
  GitBranch,
  GithubLogo,
  Globe,
  Laptop,
  PaperPlaneRight,
  Lightning,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/**
 * Small, quiet illustrations for each step of the guide, all built around
 * the same example project (Fade Room). Monochrome with the site's purple
 * accent for whatever the step is about.
 */
function Stage({ children, className, label }: { children: React.ReactNode; className?: string; label: string }) {
  return (
    <figure
      role="img"
      aria-label={label}
      className={cn(
        "relative flex h-[220px] items-center justify-center overflow-hidden rounded-[10px] bg-paper-3 shadow-card max-sm:h-[200px]",
        "bg-[radial-gradient(circle,#00000012_1px,transparent_1.2px)] [background-size:16px_16px]",
        className,
      )}
    >
      {/* Scaled down a little on phones so the wider scenes fit. */}
      <div className="max-sm:scale-[0.78]">{children}</div>
    </figure>
  );
}

const Bar = ({ w, className }: { w: string; className?: string }) => (
  <span className={cn("block h-1.5 rounded-full bg-black/10", className)} style={{ width: w }} />
);

/** The pointer from the site's own cursor. */
const Pointer = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 19 21" width="17" height="19" className={cn("absolute drop-shadow-sm", className)} aria-hidden>
    <path d="M1.99 1.74C1.61 1.55 1.19 1.87 1.27 2.28L4.55 18.97C4.64 19.44 5.27 19.53 5.48 19.1L8.57 13.1C8.76 12.74 9.02 12.43 9.34 12.19 9.66 11.95 10.03 11.78 10.42 11.71L17.14 10.39C17.61 10.3 17.7 9.66 17.27 9.45L1.99 1.74Z" fill="#fff" stroke="#000" strokeWidth="1.1" />
  </svg>
);

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("rounded-[10px] bg-white shadow-card", className)}>{children}</div>
);

export function InstallScene() {
  return (
    <Stage label="The Claude desktop app downloading and installing">
      <Card className="flex w-[300px] items-center gap-4 p-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-[12px] bg-iris-soft text-iris">
          <Sparkle size={24} weight="fill" />
        </span>
        <span className="grid flex-1 gap-2">
          <span className="flex items-center justify-between">
            <span className="text-[14px] font-medium text-ink">Claude for desktop</span>
            <CheckCircle size={16} weight="fill" className="text-iris" />
          </span>
          <span className="block h-1.5 overflow-hidden rounded-full bg-black/10">
            <span className="block h-full w-full rounded-full bg-iris" />
          </span>
          <span className="t-label flex items-center gap-1 text-[11.5px]">
            <DownloadSimple size={12} /> Installed · Mac and Windows
          </span>
        </span>
      </Card>
    </Stage>
  );
}

export function GitScene() {
  const commits = ["Add the hero and booking button", "Add services and prices", "Fix the menu on phones"];
  return (
    <Stage label="Git keeping a history of saved versions of the Fade Room site">
      <Card className="w-[320px] p-4">
        <span className="t-label mb-3 flex items-center gap-1.5 text-[11.5px]">
          <GitBranch size={13} /> fade-room · main
        </span>
        <ol className="relative grid gap-3 pl-5">
          <span className="absolute top-1.5 bottom-1.5 left-[5px] w-px bg-black/15" aria-hidden />
          {commits.map((c, i) => (
            <li key={c} className="relative flex items-center justify-between gap-3">
              <span
                className={cn(
                  "absolute -left-5 size-[11px] rounded-full border-2 bg-white",
                  i === commits.length - 1 ? "border-iris" : "border-black/25",
                )}
              />
              <span className={cn("text-[13px]", i === commits.length - 1 ? "font-medium text-ink" : "text-body")}>{c}</span>
              <span className="t-mono text-[10.5px] text-faint">{["a1f3", "7c2e", "e09b"][i]}</span>
            </li>
          ))}
        </ol>
      </Card>
    </Stage>
  );
}

export function CodeTabScene() {
  return (
    <Stage label="Switching from the Chat tab to the Code tab">
      <div className="relative">
        <div className="flex gap-1 rounded-[12px] bg-black/[0.06] p-1">
          <span className="flex h-11 w-[124px] items-center justify-center gap-2 rounded-[9px] text-[14px] text-muted">
            <ChatCircle size={16} /> Chat
          </span>
          <span className="flex h-11 w-[124px] items-center justify-center gap-2 rounded-[9px] bg-white text-[14px] font-medium text-ink shadow-card">
            <Code size={16} className="text-iris" /> Code
          </span>
        </div>
        <Pointer className="top-[30px] left-[188px]" />
        <p className="t-label mt-4 text-center text-[11.5px]">Chat is for talking. Code is for building.</p>
      </div>
    </Stage>
  );
}

export function FolderScene() {
  return (
    <Stage label="Opening the empty fade-room folder in Claude Code">
      <div className="flex items-center gap-6 max-sm:gap-3">
        <div className="grid justify-items-center gap-1.5">
          <FolderSimple size={64} weight="fill" className="text-[#c9cbe8]" />
          <span className="t-mono rounded-[5px] bg-white px-1.5 text-[11px] text-ink shadow-card">fade-room</span>
        </div>
        <ArrowRight size={16} className="text-faint" />
        <Card className="relative w-[190px] p-1.5">
          <span className="flex items-center justify-between px-2 py-1.5 text-[12px] text-muted">
            <span className="flex items-center gap-1.5">
              <Laptop size={13} /> Local
            </span>
            <CaretDown size={11} />
          </span>
          <span className="flex items-center gap-2 rounded-[7px] bg-iris-soft px-2 py-1.5 text-[12.5px] font-medium text-iris">
            <FolderSimple size={14} weight="fill" /> Open folder…
          </span>
          <span className="px-2 py-1.5 text-[12px] text-faint">Recent folders</span>
          <Pointer className="top-[46px] left-[120px]" />
        </Card>
      </div>
    </Stage>
  );
}

export function PlanScene() {
  const steps = ["Set up Next.js and Tailwind", "Hero with a Book a cut button", "Services, gallery and reviews", "Hours, map and footer"];
  return (
    <Stage label="Claude's plan for the Fade Room site in Plan mode">
      <Card className="w-[320px] p-4">
        <span className="mb-3 flex items-center justify-between">
          <span className="text-[13px] font-medium text-ink">Plan for Fade Room</span>
          <span className="rounded-full bg-iris-soft px-2 py-0.5 text-[11px] font-medium text-iris">Plan mode</span>
        </span>
        <ol className="grid gap-2">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2.5 text-[12.5px] text-body">
              <span className="t-mono flex size-5 items-center justify-center rounded-[5px] bg-paper-3 text-[10.5px] text-ink">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <span className="mt-3.5 flex items-center justify-end gap-1.5 text-[12px] font-medium text-ink">
          Looks good, switch to Accept edits <ArrowRight size={12} />
        </span>
      </Card>
    </Stage>
  );
}

export function PromptScene() {
  const files = [
    ["app/page.tsx", "+148"],
    ["app/layout.tsx", "+32"],
    ["components/services.tsx", "+64"],
  ];
  return (
    <Stage label="The Fade Room prompt sent to Claude, and the first files it creates">
      <div className="grid w-[330px] gap-2.5">
        <Card className="flex items-end gap-2 p-3">
          <span className="flex-1 text-[12.5px] leading-[18px] text-ink-2">
            Build a one-page website for a barber shop called Fade Room in Manchester…
          </span>
          <span className="flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-iris text-white">
            <PaperPlaneRight size={13} weight="fill" />
          </span>
        </Card>
        <Card className="grid gap-1 p-2.5">
          {files.map(([f, n]) => (
            <span key={f} className="flex items-center justify-between rounded-[6px] px-1.5 py-1 text-[12px]">
              <span className="flex items-center gap-2 text-body">
                <FileCode size={13} className="text-muted" /> {f}
              </span>
              <span className="t-mono text-[10.5px] text-[#1e7d4f]">{n}</span>
            </span>
          ))}
        </Card>
      </div>
    </Stage>
  );
}

export function PreviewScene() {
  return (
    <Stage label="The Fade Room site open in the Browser pane inside the app">
      <Card className="w-[340px] overflow-hidden">
        <span className="flex items-center gap-2 border-b border-line px-3 py-2">
          <span className="flex gap-1">
            <i className="size-2 rounded-full bg-black/15" />
            <i className="size-2 rounded-full bg-black/15" />
            <i className="size-2 rounded-full bg-black/15" />
          </span>
          <span className="t-mono flex-1 rounded-[5px] bg-paper-3 px-2 py-0.5 text-[10.5px] text-muted">localhost:3000</span>
        </span>
        <span className="block bg-[#141414] px-5 pt-4 pb-5">
          <span className="mb-4 flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.18em] text-white">FADE ROOM</span>
            <span className="flex gap-2">
              <Bar w="20px" className="!bg-white/25" />
              <Bar w="20px" className="!bg-white/25" />
            </span>
          </span>
          <span className="block text-[19px] leading-[22px] font-semibold text-white">Sharp cuts in Manchester.</span>
          <span className="mt-2 block">
            <Bar w="70%" className="!bg-white/20" />
          </span>
          <span className="mt-3.5 inline-flex rounded-[7px] bg-[#c9a24a] px-3 py-1.5 text-[11.5px] font-semibold text-[#141414]">
            Book a cut
          </span>
        </span>
      </Card>
    </Stage>
  );
}

export function GithubScene() {
  return (
    <Stage label="The Fade Room code pushed from the computer to a GitHub repository">
      <div className="flex items-center gap-5 max-sm:gap-3">
        <Card className="flex size-[84px] flex-col items-center justify-center gap-1.5">
          <Laptop size={28} className="text-ink" />
          <span className="t-mono text-[10px] text-muted">fade-room</span>
        </Card>
        <span className="grid justify-items-center gap-1">
          <span className="t-mono text-[10px] text-iris">git push</span>
          <span className="flex items-center gap-1 text-iris">
            <span className="h-px w-10 bg-iris" />
            <ArrowRight size={13} weight="bold" />
          </span>
        </span>
        <Card className="w-[170px] p-3">
          <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink">
            <GithubLogo size={15} weight="fill" /> your-name / fade-room
          </span>
          <span className="mt-2 grid gap-1.5">
            <Bar w="90%" />
            <Bar w="70%" />
          </span>
          <span className="t-label mt-2.5 flex items-center gap-1 text-[11px]">
            <CheckCircle size={12} weight="fill" className="text-[#1e7d4f]" /> Up to date
          </span>
        </Card>
      </div>
    </Stage>
  );
}

export function VercelScene() {
  return (
    <Stage label="Vercel deploying the Fade Room site to a live link">
      <Card className="w-[320px] p-4">
        <span className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-ink">fade-room</span>
          <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-[#1e7d4f]">
            <span className="size-1.5 rounded-full bg-[#1e7d4f]" /> Ready
          </span>
        </span>
        <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-black/10">
          <span className="block h-full w-full rounded-full bg-ink" />
        </span>
        <span className="t-label mt-1.5 block text-[11px]">Built and deployed in 48s</span>
        <span className="mt-3.5 flex items-center justify-between rounded-[8px] bg-paper-3 px-3 py-2">
          <span className="flex items-center gap-2 text-[12.5px] font-medium text-ink">
            <Globe size={14} className="text-iris" /> fade-room.vercel.app
          </span>
          <ArrowUpRight size={13} className="text-muted" />
        </span>
      </Card>
    </Stage>
  );
}

export function KeepBuildingScene() {
  const tiles = [
    { Icon: CalendarCheck, label: "Booking form", note: "Emails new bookings" },
    { Icon: Globe, label: "Your domain", note: "fade-room.co.uk" },
    { Icon: Article, label: "A blog", note: "Grooming tips" },
    { Icon: Lightning, label: "Skills", note: "Your own commands" },
  ];
  return (
    <Stage label="Ideas to add to the Fade Room site next">
      <div className="grid w-[340px] grid-cols-2 gap-2.5 max-sm:w-[300px]">
        {tiles.map(({ Icon, label, note }, i) => (
          <Card key={label} className="flex items-center gap-2.5 p-3">
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-[8px]",
                i === 0 ? "bg-iris-soft text-iris" : "bg-paper-3 text-ink",
              )}
            >
              <Icon size={15} />
            </span>
            <span className="grid">
              <span className="text-[12.5px] font-medium text-ink">{label}</span>
              <span className="text-[11px] text-muted">{note}</span>
            </span>
          </Card>
        ))}
      </div>
    </Stage>
  );
}
