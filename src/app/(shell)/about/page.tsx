import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { Collage } from "@/components/about/collage";
import { Copy } from "@/components/ui/copy";
import { Breadcrumb, Divider, Section, SectionLabel, Title } from "@/components/ui/view";
import { aboutBody, aboutHeading, aboutLabels, elsewhere } from "@/content/about";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "About" }]} />
      <Title>{aboutHeading}</Title>
      <div className="grid gap-4">
        {aboutBody.map((p, i) => (
          <p key={i} className="t-body">
            <Copy>{p}</Copy>
          </p>
        ))}
      </div>

      <Collage />
      <p className="t-mono mt-6 text-[10px] tracking-[0.05em] text-faint uppercase">Drag things around. They come back.</p>

      <Divider className="my-16" />

      <Section>
        <SectionLabel>{aboutLabels.elsewhere}</SectionLabel>
        <ul className="grid gap-3 sm:grid-cols-2">
          {elsewhere.map((s) => (
            <li key={s.label} className="flex items-center justify-between gap-4 border-b border-line pb-3">
              <span className="t-ui font-medium text-ink">{s.label}</span>
              {"href" in s && s.href ? (
                <a href={s.href} target="_blank" rel="noreferrer" className="t-ui group inline-flex items-center gap-1 font-normal text-muted hover:text-ink">
                  <span className="u-link-plain">{s.handle}</span>
                  <ArrowUpRight size={11} />
                </a>
              ) : (
                <span className="t-ui font-normal text-muted">
                  <Copy>{s.handle}</Copy>
                </span>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
