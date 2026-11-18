import type { Metadata } from "next";
import Link from "next/link";
import { PanelButton } from "@/components/ui/panel-button";
import { Breadcrumb, Divider, Section, SectionLabel, Title } from "@/components/ui/view";
import { site, socials, whatsappLink } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

const INTRO = `I'm ${site.name}. I help businesses with design, websites, software, AI and content for clients worldwide. Email or WhatsApp reach me directly, and I reply myself, usually within one working day.`;

export const metadata: Metadata = pageMetadata("Contact", INTRO, "/contact");

export default function ContactPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Contact" }]} />
      <Title>Contact</Title>
      <p className="t-lead">{INTRO}</p>

      <Divider />

      <Section>
        <SectionLabel>Reach me</SectionLabel>
        <dl className="t-ui grid gap-4 font-normal text-body">
          <div>
            <dt className="text-muted">Email</dt>
            <dd>
              <a className="u-link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted">WhatsApp</dt>
            <dd>
              <a className="u-link" href={whatsappLink()} target="_blank" rel="noreferrer">
                Message on WhatsApp
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted">Time zones</dt>
            <dd>I overlap with UK, Europe and Gulf working hours every day, and work with US clients too.</dd>
          </div>
          {socials.map((s) => (
            <div key={s.label}>
              <dt className="text-muted">{s.label}</dt>
              <dd>
                <a className="u-link" href={s.href} target="_blank" rel="noreferrer">
                  {s.handle}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Divider />

      <Section>
        <SectionLabel>Starting a project</SectionLabel>
        <p className="t-ui font-normal text-body">
          The quickest way in is the short application: what you sell, what you&apos;d like to change, and where to reply. If
          you&apos;d rather write, send a link to your website or Instagram and a few lines about your business. Prices
          and how projects run are on the{" "}
          <Link className="u-link" href="/working-together">
            Working together
          </Link>{" "}
          page. What happens to what you send is on the{" "}
          <Link className="u-link" href="/privacy">
            Privacy
          </Link>{" "}
          page.
        </p>
        <PanelButton panel="start" className="btn btn-primary mt-6">
          Start a project
        </PanelButton>
      </Section>
    </>
  );
}
