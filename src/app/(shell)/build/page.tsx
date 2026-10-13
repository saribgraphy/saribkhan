import type { Metadata } from "next";
import { ApplicationStep } from "@/components/demos/application-step";
import { BookingCard } from "@/components/demos/booking-card";
import { Calculator } from "@/components/demos/calculator";
import { Capabilities } from "@/components/build/capabilities";
import { XRay } from "@/components/build/xray";
import { Breadcrumb, Divider, Section, SectionLabel, Title } from "@/components/ui/view";
import { xrayLeadIn, xrayOutro } from "@/content/touchpoints";

export const metadata: Metadata = { title: "What I build" };

export default function BuildPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "What I build" }]} />
      <Title>Everything your lead touches, designed on purpose.</Title>
      <p className="t-lead">
        Your offer might be worth five figures, but your lead never sees the offer first. They see an ad, a page, a
        form, a booking screen and a message from a setter, and they decide what you&apos;re worth long before the
        call. I design all of it, so every single step tells them the same thing.
      </p>

      <Divider />

      <Section id="xray">
        <SectionLabel>The Funnel X-ray</SectionLabel>
        <p className="t-body mb-6">{xrayLeadIn}</p>
        <XRay />
        <p className="t-body mt-6">{xrayOutro}</p>
      </Section>

      <Divider className="my-16" />

      <Section>
        <SectionLabel>Things I make</SectionLabel>
        <Capabilities />
      </Section>

      <Divider className="my-16" />

      <Section id="try">
        <SectionLabel>Try it</SectionLabel>
        <p className="t-body mb-8">
          Screenshots only go so far, so here are a few small things you can actually use. These are the kinds of tools
          I build inside companies.
        </p>
        <div className="grid gap-10">
          <Demo n="01" title={"The “one deal” calculator"}>
            <Calculator />
          </Demo>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-4">
            <Demo n="02" title="An application step">
              <ApplicationStep />
            </Demo>
            <Demo n="03" title="A coach booking card" caption="From the coaches platform I built for IMA Accelerator.">
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
