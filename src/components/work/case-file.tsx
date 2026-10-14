import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import type { Project } from "@/content/projects";
import { Copy } from "@/components/ui/copy";
import { BeforeAfter } from "./before-after";
import { FunnelMap } from "./funnel-map";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3">
      <h3 className="t-label">{label}</h3>
      {children}
    </section>
  );
}

/** Every project uses this structure, in the panel and on the direct-link page. */
export function CaseFile({ project, headingLevel = "h2" }: { project: Project; headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  const meta = [project.clientType, project.year, project.builtWith].filter(Boolean);
  const built = project.built.filter(Boolean);

  return (
    <article className="grid gap-10">
      <header className="grid gap-4">
        <div className="grid gap-2">
          <H className="text-[28px] leading-[32px] font-semibold tracking-[-0.015em] text-ink">{project.name}</H>
          <p className="t-lead">
            <Copy>{project.oneLine}</Copy>
          </p>
        </div>
        <p className="t-ui flex flex-wrap items-center gap-x-2 gap-y-1 font-normal text-muted">
          {meta.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              {i > 0 ? <span className="text-faint">·</span> : null}
              <Copy>{item}</Copy>
            </span>
          ))}
          {project.liveHref ? (
            <span className="inline-flex items-center gap-2">
              <span className="text-faint">·</span>
              <a href={project.liveHref} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-0.5 text-ink">
                <span className="u-link">
                  <Copy>{project.liveLabel || new URL(project.liveHref).host}</Copy>
                </span>
                <ArrowUpRight size={11} className="text-faint group-hover:text-ink" />
              </a>
            </span>
          ) : null}
        </p>
      </header>

      {project.situation ? (
        <Block label="The situation">
          <p className="t-body">
            <Copy>{project.situation}</Copy>
          </p>
        </Block>
      ) : null}

      {built.length || project.builtText ? (
        <Block label="What I built">
          {built.length ? (
            <ul className="grid gap-2">
              {built.map((b) => (
                <li key={b} className="t-body flex gap-3">
                  <span className="mt-[10px] size-1 shrink-0 rounded-full bg-faint" aria-hidden />
                  <span>
                    <Copy>{b}</Copy>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="t-body first-letter:uppercase">
              <Copy>{project.builtText}</Copy>
            </p>
          )}
        </Block>
      ) : null}

      <Block label="Funnel map">
        {project.funnel.length ? (
          <FunnelMap nodes={project.funnel} project={project.name} />
        ) : (
          <p className="t-ui font-normal text-muted">
            <Copy>[Funnel steps and screenshots to be added.]</Copy>
          </p>
        )}
      </Block>

      {project.beforeImage && project.afterImage ? (
        <Block label="Before and after">
          <BeforeAfter before={project.beforeImage} after={project.afterImage} caption={project.beforeCaption} />
        </Block>
      ) : null}

      {project.detail || project.detailImage ? (
        <Block label="One detail worth noticing">
          <div className="frame">
            <div className="hatch relative aspect-[16/9] overflow-hidden rounded-[6px] ring-[0.5px] ring-black/10">
              {project.detailImage ? (
                <Image src={project.detailImage} alt={project.detail.replace(/\[|\]/g, "")} fill sizes="(max-width: 640px) 100vw, 520px" className="object-cover" />
              ) : null}
            </div>
          </div>
          {project.detail ? (
            <p className="t-ui font-normal text-body">
              <Copy>{project.detail}</Copy>
            </p>
          ) : null}
        </Block>
      ) : null}

      {project.clientWords ? (
        <Block label="Client words">
          <blockquote className="font-serif text-[22px] leading-[28px] text-ink">
            <Copy>{project.clientWords}</Copy>
          </blockquote>
        </Block>
      ) : null}
    </article>
  );
}
