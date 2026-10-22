import { VideoCamera } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { Calculator } from "@/components/demos/calculator";
import { EngagementCards } from "@/components/pricing/engagement-cards";
import { Faq } from "@/components/pricing/faq";
import { Copy } from "@/components/ui/copy";
import { PanelButton } from "@/components/ui/panel-button";
import { Breadcrumb, Divider, Section, SectionLabel, Title } from "@/components/ui/view";
import { pricingHeading, pricingLabels, pricingIntro, pricingSmallLine, teardown, theMath } from "@/content/pricing";

export const metadata: Metadata = { title: "Working together" };

export default function WorkingTogetherPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Working together" }]} />
      <Title>{pricingHeading}</Title>
      <p className="t-lead">{pricingIntro}</p>

      <div className="mt-10">
        <EngagementCards />
        <p className="t-ui mt-5 font-normal text-muted">
          <Copy>{pricingSmallLine}</Copy>
        </p>
      </div>

      <Divider className="my-16" />

      <Section id="math">
        <SectionLabel>{pricingLabels.math}</SectionLabel>
        <p className="t-body mb-6">{theMath}</p>
        <Calculator compact />
      </Section>

      <Section id="teardown" className="mt-16">
        <div className="relative -mx-2 overflow-hidden rounded-[14px] bg-white p-1.5 shadow-[0_0.5px_0.5px_#2122231a,0_12px_24px_-8px_#21222326,0_0_0_0.5px_#2122231f] max-md:mx-0">
          <div className="rounded-[8px] bg-[radial-gradient(90%_120%_at_100%_0%,#f1f1ef,transparent_60%)] px-6 pt-6 pb-6 ring-[0.5px] ring-black/[0.06]">
            <span className="mb-5 flex size-9 items-center justify-center rounded-[9px] bg-ink text-white shadow-[inset_0_1px_0_#ffffff26]">
              <VideoCamera size={16} weight="fill" />
            </span>
            <h2 className="text-[19px] leading-[26px] font-semibold tracking-[-0.015em] text-ink">{teardown.title}</h2>
            <p className="t-body mt-2">{teardown.body}</p>
            <PanelButton panel="teardown" className="btn btn-primary mt-6">
              <span className="btn-label">{teardown.cta}</span>
            </PanelButton>
          </div>
        </div>
      </Section>

      <Divider className="my-16" />

      <Section id="faq">
        <SectionLabel>{pricingLabels.faq}</SectionLabel>
        <Faq />
      </Section>
    </>
  );
}
