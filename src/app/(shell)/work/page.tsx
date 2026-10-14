import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects, workFooterNote, workHeading, workIntro } from "@/content/projects";
import { Copy } from "@/components/ui/copy";
import { Breadcrumb, Divider, Title } from "@/components/ui/view";

export const metadata: Metadata = { title: "Work" };

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
            <Link
              href={`/work/${p.slug}`}
              scroll={false}
              className="group flex items-center gap-4 rounded-[10px] px-3 py-3 hover:bg-tint"
            >
              <span className="hatch relative h-12 w-16 shrink-0 overflow-hidden rounded-md ring-[0.5px] ring-black/10" aria-hidden>
                {p.cover ? (
                  <Image src={p.cover} alt="" fill sizes="64px" className="object-cover object-top" />
                ) : (
                  <>
                    <span className="absolute inset-x-2 top-2 h-1 rounded-full bg-black/10" />
                    <span className="absolute inset-x-2 top-4 h-1 w-6 rounded-full bg-black/10" />
                  </>
                )}
              </span>
              <span className="grid min-w-0 flex-1 gap-0.5">
                <span className="text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink">{p.name}</span>
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
              <ArrowRight size={14} className="shrink-0 text-faint group-hover:text-ink" />
            </Link>
          </li>
        ))}
      </ul>

      <Divider />
      <p className="t-ui max-w-[456px] font-normal text-muted">{workFooterNote}</p>
    </>
  );
}
