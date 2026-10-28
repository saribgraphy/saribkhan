import data from "./data/work.json";
import { withLabels } from "./labels";
import type { WorkData } from "./types";

// Edited in the CMS (/keystatic → Work). Anything in [square brackets] is a
// placeholder and stays visible on the page until replaced.
const d = data as unknown as WorkData;

export type Project = WorkData["projects"][number];
export type FunnelNode = Project["funnel"][number];

export const workHeading = d.heading;
export const workIntro = d.intro;
export const workFooterNote = d.footerNote;
export const workLabels = withLabels("work", d.labels);

// The CMS leaves empty fields out of the JSON, so fill the gaps here.
export const projects: Project[] = d.projects
  .filter((p) => p.slug && p.name)
  .map((p) => ({
    ...p,
    nda: Boolean(p.nda),
    oneLine: p.oneLine ?? "",
    tags: p.tags ?? [],
    cover: p.cover ?? null,
    clientType: p.clientType ?? "",
    year: p.year ?? "",
    builtWith: p.builtWith ?? "",
    liveLabel: p.liveLabel ?? "",
    liveHref: p.liveHref ?? null,
    situation: p.situation ?? "",
    built: p.built ?? [],
    builtText: p.builtText ?? "",
    funnel: (p.funnel ?? []).map((n) => ({ label: n.label ?? "", note: n.note ?? "", image: n.image ?? null })),
    detailLabel: p.detailLabel ?? "",
    detail: p.detail ?? "",
    detailImage: p.detailImage ?? null,
    clientWords: p.clientWords ?? "",
    clientWordsBy: p.clientWordsBy ?? "",
    beforeImage: p.beforeImage ?? null,
    afterImage: p.afterImage ?? null,
    beforeCaption: p.beforeCaption ?? "",
  }));

/** Case files that can be opened (NDA projects only appear in the list). */
export const openProjects = projects.filter((p) => !p.nda);

export const getProject = (slug: string) => openProjects.find((p) => p.slug === slug);

export const gallery = (d.gallery ?? []).filter((g) => g.image) as { image: string; label: string }[];
