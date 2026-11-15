import { footerLine, homeLabels } from "@/content/home";
import { Hero } from "@/components/home/hero";
import { Ledger } from "@/components/home/ledger";
import { StartHere } from "@/components/home/start-here";
import { Systems } from "@/components/home/systems";
import { TestimonialCard } from "@/components/home/testimonial-card";
import { Expertise } from "@/components/build/expertise";
import { Breadcrumb, Divider, Section, SectionLabel } from "@/components/ui/view";
import type { Metadata } from "next";
import { site } from "@/content/site";
import { expertiseTerms, homeStructuredData, jsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: { absolute: `${site.name}, ${site.tagline.toLowerCase()} · Xtarc` },
  keywords: [site.name, "Xtarc", ...expertiseTerms],
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(homeStructuredData())} />
      <Breadcrumb trail={[{ label: "Home" }]} />
      <Hero />

      <Divider className="mt-10 mb-10" />

      <Section>
        <SectionLabel>{homeLabels.currently}</SectionLabel>
        <Ledger />
      </Section>

      <Divider />

      <Section>
        <SectionLabel>{homeLabels.systems}</SectionLabel>
        <Systems />
      </Section>

      <div className="mt-10">
        <TestimonialCard />
      </div>

      <Section id="expertise" className="mt-16">
        <SectionLabel>{homeLabels.expertise}</SectionLabel>
        <Expertise />
      </Section>

      <Section className="mt-16">
        <SectionLabel>{homeLabels.startHere}</SectionLabel>
        <StartHere />
      </Section>

      <p className="t-label mt-24 max-w-[456px] text-[#0009]">{footerLine}</p>
    </>
  );
}
