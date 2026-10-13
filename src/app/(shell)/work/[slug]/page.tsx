import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { CaseFile } from "@/components/work/case-file";
import { Breadcrumb } from "@/components/ui/view";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.name, description: project.oneLine.replace(/\[|\]/g, "") } : {};
}

/** Direct link to a case file (e.g. shared in a DM) renders as a full page. */
export default async function CaseFilePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Breadcrumb trail={[{ label: "Work", href: "/work" }, { label: project.name }]} />
      <CaseFile project={project} headingLevel="h1" />
      <Link href="/work" className="t-ui mt-16 inline-flex items-center gap-1.5 text-muted hover:text-ink">
        <ArrowLeft size={13} />
        All work
      </Link>
    </>
  );
}
