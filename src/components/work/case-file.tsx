import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Fragment } from "react";
import { workLabels, type Project } from "@/content/projects";
import { Copy } from "@/components/ui/copy";
import { BeforeAfter } from "./before-after";
import { FunnelMap } from "./funnel-map";
import { ImageStack, type StackImage } from "./image-stack";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="reveal-after grid gap-3" style={{ "--d": "520ms" } as React.CSSProperties}>
      <h3 className="t-label">{label}</h3>
      {children}
    </section>
  );
}

/** Every project uses this structure. */
export function CaseFile({ project, headingLevel = "h2" }: { project: Project; headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  const meta = [project.clientType, project.year, project.builtWith].filter(Boolean);
  const built = project.built.filter(Boolean);
  const words = project.name.split(" ");
  const after = (i: number) => ({ "--d": `${180 + words.length * 55 + i * 90}ms` }) as React.CSSProperties;

  return (
    <article className="grid gap-10">
      <header className="grid gap-4">
        <div className="grid gap-4">
          <H className="t-display" aria-label={project.name}>
            {words.map((w, i) => (
              <Fragment key={i}>
                <span aria-hidden className="reveal-word" style={{ "--i": i } as React.CSSProperties}>
                  {w}
                </span>
                {i < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </H>
          <p className="t-lead reveal-after" style={after(0)}>
            <Copy>{project.oneLine}</Copy>
          </p>
        </div>
        <p className="t-ui reveal-after flex flex-wrap items-center gap-x-2 gap-y-1 font-normal text-muted" style={after(1)}>
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
        <Block label={workLabels.situation}>
          <p className="t-body">
            <Copy>{project.situation}</Copy>
          </p>
        </Block>
      ) : null}

      {built.length || project.builtText ? (
        <Block label={workLabels.built}>
          {project.builtText ? (
            <p className="t-body first-letter:uppercase">
              <Copy>{project.builtText}</Copy>
            </p>
          ) : null}
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
          ) : null}
        </Block>
      ) : null}

      {project.funnel.length ? (
        <Block label={workLabels.funnel}>
          <FunnelMap nodes={project.funnel} project={project.name} />
        </Block>
      ) : null}

      {project.showcase.length ? (
        <Block label={workLabels.showcase}>
          <ImageStack
            items={project.showcase as readonly StackImage[]}
            bleed={false}
            sizes="(max-width: 640px) 100vw, 520px"
            altFallback={`${project.name} design work`}
          />
        </Block>
      ) : null}

      {project.beforeImage && project.afterImage ? (
        <Block label={workLabels.beforeAfter}>
          <BeforeAfter before={project.beforeImage} after={project.afterImage} caption={project.beforeCaption} />
        </Block>
      ) : null}

      {project.detail || project.detailImage ? (
        <Block label={project.detailLabel || workLabels.detail}>
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
        <Block label={workLabels.clientWords}>
          <blockquote className="font-quote text-[19px] leading-[27px] font-medium tracking-[-0.01em] text-ink">
            <Copy>{project.clientWords}</Copy>
          </blockquote>
          {project.clientWordsBy ? (
            <p className="t-ui font-normal text-muted">
              <Copy>{project.clientWordsBy}</Copy>
            </p>
          ) : null}
        </Block>
      ) : null}
    </article>
  );
}
