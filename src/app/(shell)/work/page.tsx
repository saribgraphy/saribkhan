import type { Metadata } from "next";
import { projects, workFooterNote, workHeading, workIntro, workLabels } from "@/content/projects";
import { Breadcrumb, Divider, Title } from "@/components/ui/view";
import { WorkGallery } from "@/components/work/gallery";
import { ProjectList } from "@/components/work/project-list";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Work" }]} />
      <Title>{workHeading}</Title>
      <p className="t-lead">{workIntro}</p>

      <Divider />

      <ProjectList projects={projects} label={workLabels.projects} ndaLabel={workLabels.nda} />

      <Divider />
      <p className="t-ui max-w-[456px] font-normal text-muted">{workFooterNote}</p>

      <WorkGallery />
    </>
  );
}
