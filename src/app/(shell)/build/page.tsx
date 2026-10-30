import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ApplicationStep } from "@/components/demos/application-step";
import { BookingCard } from "@/components/demos/booking-card";
import { Calculator } from "@/components/demos/calculator";
import { Capabilities } from "@/components/build/capabilities";
import { XRay } from "@/components/build/xray";
import { Breadcrumb, Divider, Section, SectionLabel, Title } from "@/components/ui/view";
import { bookingCaption, buildHeading, buildLabels, buildIntro, tryLeadIn, xrayLeadIn, xrayOutro } from "@/content/touchpoints";

export const metadata: Metadata = pageMetadata("What I build", buildIntro);

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

      <Section>
        <SectionLabel>{buildLabels.make}</SectionLabel>
        <Capabilities />
      </Section>

      <Divider className="my-16" />

      <Section id="try">
        <SectionLabel>{buildLabels.tryIt}</SectionLabel>
        <p className="t-body mb-8">{tryLeadIn}</p>
        <div className="grid gap-12">
          <Demo n="01" title={buildLabels.calculator}>
            <Calculator />
          </Demo>
          <Demo n="02" title={buildLabels.application} demoNote="A sample application. Answers aren't sent anywhere." framed>
            <ApplicationStep />
          </Demo>
          <Demo
            n="03"
            title={buildLabels.booking}
            caption={bookingCaption}
            demoNote="A sample coach and sample times. Nothing gets booked."
            framed
          >
            <BookingCard />
          </Demo>
        </div>
      </Section>
    </>
  );
}

function Demo({
  n,
  title,
  caption,
  demoNote,
  framed = false,
  children,
}: {
  n: string;
  title: string;
  caption?: string;
  /** Marks the demo as sample data, with a badge and a one-line note. */
  demoNote?: string;
  /** Wide white card with the content centred at a comfortable width. */
  framed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <figure className="grid content-start gap-3">
      <figcaption className="t-ui flex items-center gap-2 font-medium text-ink">
        <span className="t-mono text-faint">{n}</span>
        {title}
      </figcaption>
      {framed ? (
        <div className="card relative -mx-4 !bg-white px-5 pt-12 pb-8 max-md:mx-0">
          {demoNote ? <DemoBadge /> : null}
          <div className="mx-auto w-full max-w-[400px]">{children}</div>
        </div>
      ) : (
        children
      )}
      {caption || demoNote ? (
        <p className="t-label">
          {caption}
          {caption && demoNote ? " " : null}
          {demoNote ? <span className="text-muted">{demoNote}</span> : null}
        </p>
      ) : null}
    </figure>
  );
}

function DemoBadge() {
  return (
    <span className="t-label absolute top-3.5 left-4 inline-flex items-center gap-1.5 rounded-full bg-iris-soft px-2 py-0.5 text-[11px] leading-4 font-medium text-iris">
      <span className="size-1.5 rounded-full bg-iris" aria-hidden />
      Demo
    </span>
  );
}
