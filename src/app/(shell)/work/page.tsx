import { ArrowRight, LockSimple } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects, workFooterNote, workHeading, workIntro, workLabels, type Project } from "@/content/projects";
import { Copy } from "@/components/ui/copy";
import { Breadcrumb, Divider, Title } from "@/components/ui/view";
import { WorkGallery } from "@/components/work/gallery";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Work" };

const rowClass = "group flex items-center gap-4 rounded-[10px] px-3 py-3 hover:bg-tint";

export default function WorkPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Work" }]} />
      <Title>{workHeading}</Title>
      <p className="t-lead">{workIntro}</p>

      <Divider />

      <ul className="-mx-3 grid">
        {projects.map((p) => (
          <li key={p.slug}>
            {p.nda ? (
              // Listed, but not openable: same row, same hover, no link.
              <div className={cn(rowClass, "cursor-default")} aria-label={`${p.name}, under NDA`}>
                <Row project={p} />
              </div>
            ) : (
              <Link href={`/work/${p.slug}`} scroll={false} className={rowClass}>
                <Row project={p} />
              </Link>
            )}
          </li>
        ))}
      </ul>

      <Divider />
      <p className="t-ui max-w-[456px] font-normal text-muted">{workFooterNote}</p>

      <WorkGallery />
    </>
  );
}

function Row({ project: p }: { project: Project }) {
  return (
    <>
      <span className="hatch relative h-12 w-16 shrink-0 overflow-hidden rounded-md ring-[0.5px] ring-black/10" aria-hidden>
        {p.cover ? (
          <Image
            src={p.cover}
            alt=""
            fill
            sizes="64px"
            className={cn("object-cover object-top", p.nda && "scale-110 blur-[6px]")}
          />
        ) : (
          <>
            <span className="absolute inset-x-2 top-2 h-1 rounded-full bg-black/10" />
            <span className="absolute inset-x-2 top-4 h-1 w-6 rounded-full bg-black/10" />
          </>
        )}
        {p.nda ? (
          <span className="absolute inset-0 flex items-center justify-center bg-white/45 backdrop-blur-[3px]">
            <span className="flex size-6 items-center justify-center rounded-full bg-white text-muted shadow-card">
              <LockSimple size={11} weight="fill" />
            </span>
          </span>
        ) : null}
      </span>
      <span className="grid min-w-0 flex-1 gap-0.5">
        <span className="flex items-center gap-2">
          <span className="truncate text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink">{p.name}</span>
          {p.nda ? (
            <span className="t-mono inline-flex h-[18px] shrink-0 items-center rounded-[5px] bg-white px-1.5 text-[10px] leading-none text-muted shadow-card">
              {workLabels.nda}
            </span>
          ) : null}
        </span>
        <span className="t-ui truncate font-normal text-muted">
          <Copy>{p.oneLine}</Copy>
        </span>
      </span>
      <span className="hidden shrink-0 items-center gap-1 sm:flex">
        {p.tags.map((t) => (
          <span key={t} className="t-mono rounded-[5px] bg-white px-1.5 text-[10.5px] leading-5 text-muted shadow-card">
            {t}
          </span>
        ))}
      </span>
      {/* Kept in place (invisible) on NDA rows so the tags don't shift. */}
      <ArrowRight
        size={14}
        aria-hidden
        className={cn("shrink-0 text-faint group-hover:text-ink", p.nda && "invisible")}
      />
    </>
  );
}
