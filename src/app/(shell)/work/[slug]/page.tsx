import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, openProjects, type Project } from "@/content/projects";
import { CaseFile } from "@/components/work/case-file";
import { Breadcrumb } from "@/components/ui/view";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return openProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? pageMetadata(project.name, project.situation || project.oneLine) : {};
}

export default async function CaseFilePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = openProjects.findIndex((p) => p.slug === slug);

  return (
    <>
      <Breadcrumb trail={[{ label: "Work", href: "/work" }, { label: project.name }]} />
      <CaseFile project={project} headingLevel="h1" />
      <Pager prev={openProjects[i - 1]} next={openProjects[i + 1]} />
    </>
  );
}

/**
 * Previous and next case in CMS order (NDA cases are skipped). At either end
 * the missing side leads back to all work, so there's never a dead end.
 */
function Pager({ prev, next }: { prev?: Project; next?: Project }) {
  return (
    <nav aria-label="More case files" className="mt-16 grid grid-cols-2 gap-3 border-t border-line pt-6">
      <PagerLink
        href={prev ? `/work/${prev.slug}` : "/work"}
        label={prev ? "Previous" : "All work"}
        title={prev?.name}
        dir="prev"
      />
      <PagerLink
        href={next ? `/work/${next.slug}` : "/work"}
        label={next ? "Next" : "All work"}
        title={next?.name}
        dir="next"
      />
    </nav>
  );
}

function PagerLink({ href, label, title, dir }: { href: string; label: string; title?: string; dir: "prev" | "next" }) {
  const Arrow = dir === "prev" ? ArrowLeft : ArrowRight;
  return (
    <Link
      href={href}
      className={cn(
        "group -mx-3 grid min-w-0 gap-0.5 rounded-[10px] px-3 py-2.5 hover:bg-tint",
        dir === "next" && "text-right",
      )}
    >
      <span className={cn("t-label flex items-center gap-1.5", dir === "next" && "justify-end")}>
        {dir === "prev" ? (
          <Arrow size={12} className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5" />
        ) : null}
        {label}
        {dir === "next" ? (
          <Arrow size={12} className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
        ) : null}
      </span>
      {title ? (
        <span className="truncate text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink">{title}</span>
      ) : null}
    </Link>
  );
}
