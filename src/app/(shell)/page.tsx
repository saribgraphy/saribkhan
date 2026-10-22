import { footerLine, homeLabels } from "@/content/home";
import { Hero } from "@/components/home/hero";
import { Ledger } from "@/components/home/ledger";
import { StartHere } from "@/components/home/start-here";
import { Systems } from "@/components/home/systems";
import { TestimonialCard } from "@/components/home/testimonial-card";
import { Breadcrumb, Divider, Section, SectionLabel } from "@/components/ui/view";

export default function HomePage() {
  return (
    <>
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

      <Section className="mt-16">
        <SectionLabel>{homeLabels.startHere}</SectionLabel>
        <StartHere />
      </Section>

      <p className="t-label mt-24 max-w-[456px] text-[#0009]">{footerLine}</p>
    </>
  );
}
