import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProject, openProjects } from "@/content/projects";
import { CaseFile } from "@/components/work/case-file";
import { CaseFilePanel } from "@/components/work/case-file-panel";

export function generateStaticParams() {
  return openProjects.map((p) => ({ slug: p.slug }));
}

/** The intercepted case file. Params are read inside Suspense so the navigation stays instant. */
export default function CaseFileIntercepted({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={null}>
      <Panel params={params} />
    </Suspense>
  );
}

async function Panel({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <CaseFilePanel slug={slug}>
      <CaseFile project={project} />
    </CaseFilePanel>
  );
}
