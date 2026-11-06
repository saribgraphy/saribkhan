import { ArrowLeft, ArrowUpRight, EnvelopeSimple, Globe, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const CONTACT = [
  { label: "Website", href: "https://sarib.xtarc.agency/", Icon: Globe },
  { label: "Email", href: "mailto:contact.saribkhan@gmail.com", Icon: EnvelopeSimple },
  { label: "WhatsApp", href: "https://wa.me/923147503578", Icon: WhatsappLogo },
];

/** About me's two buttons: back to the site, and down to the contact links. */
export function AboutActions({ contactId }: { contactId: string }) {
  return (
    <div className="actions">
      <Link href="/" className="back">
        <ArrowLeft size={15} weight="bold" />
        Back to home
      </Link>
      <a href={`#${contactId}`} className="cta">
        <span>Get in touch</span>
      </a>
    </div>
  );
}

/** Website, email and WhatsApp as links that turn light on hover. */
export function ContactLinks() {
  return (
    <div className="contact">
      {CONTACT.map(({ label, href, Icon }) => (
        <a key={label} className="ct" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          <Icon size={18} />
          {label}
          <ArrowUpRight size={14} className="arrow" aria-hidden />
        </a>
      ))}
    </div>
  );
}
