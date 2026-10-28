import type { Metadata } from "next";
import { ApplicationStep } from "@/components/demos/application-step";
import { BookingCard } from "@/components/demos/booking-card";
import { Calculator } from "@/components/demos/calculator";
import { Capabilities } from "@/components/build/capabilities";
import { Expertise } from "@/components/build/expertise";
import { XRay } from "@/components/build/xray";
import { Breadcrumb, Divider, Section, SectionLabel, Title } from "@/components/ui/view";
import { bookingCaption, buildHeading, buildLabels, buildIntro, tryLeadIn, xrayLeadIn, xrayOutro } from "@/content/touchpoints";

export const metadata: Metadata = { title: "What I build" };

export default function BuildPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "What I build" }]} />
      <Title>{buildHeading}</Title>
      <p className="t-lead">{buildIntro}</p>

      <Divider />

      <Section id="xray">
        <SectionLabel>{buildLabels.xray}</SectionLabel>
        <p className="t-body mb-6">{xrayLeadIn}</p>
        <XRay />
        <p className="t-body mt-6">{xrayOutro}</p>
      </Section>

      <Divider className="my-16" />

      <Section id="expertise">
        <SectionLabel>{buildLabels.expertise}</SectionLabel>
        <Expertise />
      </Section>

      <Divider className="my-16" />

      <Section>
        <SectionLabel>{buildLabels.make}</SectionLabel>
        <Capabilities />
      </Section>

      <Divider className="my-16" />

      <Section id="try">
        <SectionLabel>{buildLabels.tryIt}</SectionLabel>
        <p className="t-body mb-8">{tryLeadIn}</p>
        <div className="grid gap-10">
          <Demo n="01" title={buildLabels.calculator}>
            <Calculator />
          </Demo>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-4">
            <Demo n="02" title={buildLabels.application}>
              <ApplicationStep />
            </Demo>
            <Demo n="03" title={buildLabels.booking} caption={bookingCaption}>
              <BookingCard />
            </Demo>
          </div>
        </div>
      </Section>
    </>
  );
}

function Demo({ n, title, caption, children }: { n: string; title: string; caption?: string; children: React.ReactNode }) {
  return (
    <figure className="grid content-start gap-3">
      <figcaption className="t-ui flex items-center gap-2 font-medium text-ink">
        <span className="t-mono text-faint">{n}</span>
        {title}
      </figcaption>
      {children}
      {caption ? <p className="t-label">{caption}</p> : null}
    </figure>
  );
}
