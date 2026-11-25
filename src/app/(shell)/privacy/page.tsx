import type { Metadata } from "next";
import { Breadcrumb, Divider, Section, SectionLabel, Title } from "@/components/ui/view";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

const INTRO =
  "This site collects what you choose to send through its forms, plus visit statistics from Google Analytics. It also uses the Meta Pixel to measure my ads on Facebook and Instagram. Your details are never sold.";

export const metadata: Metadata = pageMetadata("Privacy", INTRO, "/privacy");

const SECTIONS: { label: string; body: React.ReactNode }[] = [
  {
    label: "What the forms collect",
    body: (
      <>
        The project and walkthrough forms send what you type (your business, what you need help with, a link and a
        way to reply) to me by email, through Resend, an email delivery service. The free guide&apos;s waitlist stores your
        email address, and your name if you add it, in a private Google Sheet that only I can open, and emails me a copy. I
        use these details only to reply to you and, for the waitlist, to invite you to the Xtarc community.
      </>
    ),
  },
  {
    label: "Booking a call",
    body: (
      <>
        The booking calendar on the real estate pages is provided by Cal.com. When you book, Cal.com receives your name,
        email, any answers you give and the time you choose, along with which page and ad campaign you came from (the
        UTM tags in the link) and the Meta cookies described below, and sends the booking to me. I use it only to hold the call and follow up with you about
        it. Cal.com&apos;s own privacy policy covers how it stores your booking.
      </>
    ),
  },
  {
    label: "Advertising (Meta Pixel)",
    body: (
      <>
        I advertise on Facebook and Instagram, so the site uses the Meta Pixel. It tells Meta (the company behind
        Facebook and Instagram) which pages you view and whether you watch half of the real estate video, open the
        booking calendar or book a call. Meta matches this to Facebook and Instagram accounts with its own cookies, so
        I can see which ads work and show ads to people who have already visited. When you book a call, the site also
        sends Meta the booking with your name and email address, scrambled (hashed) first so they aren&apos;t sent as
        plain text. You can turn off ads based on your activity in your Facebook or Instagram ad settings, or block the
        pixel with any content blocker.
      </>
    ),
  },
  {
    label: "What the site stores on your device",
    body: (
      <>
        Whether you prefer the Work page as a grid or a list, kept in your browser&apos;s local storage; it never leaves your
        device. Google Analytics also sets its own cookies (named _ga) to count visits, and the Meta Pixel sets _fbp and _fbc to
        measure ads, as described above and below.
      </>
    ),
  },
  {
    label: "Third parties",
    body: (
      <>
        The site is hosted on Vercel, which handles every request and keeps standard server logs (such as IP address and
        browser) for security and reliability. Google Analytics counts visits: which pages are viewed, how people arrive,
        and their rough location and device. It doesn&apos;t receive what you type into the forms, and Google Analytics
        doesn&apos;t store IP addresses. You can block it with any content blocker or Google&apos;s opt-out add-on. Meta receives the visits and bookings described under Advertising, and its own privacy policy covers how it uses them. Emails are delivered by Resend; waitlist entries live in Google Sheets. The
        guide&apos;s video only loads from YouTube&apos;s privacy-enhanced domain (youtube-nocookie.com) after you press play,
        and the video on the real estate pages is served from Dribbble&apos;s file storage.
        Links to Instagram, LinkedIn, WhatsApp and other sites follow those sites&apos; own policies.
      </>
    ),
  },
  {
    label: "How long it's kept",
    body: (
      <>
        Messages stay in my inbox for as long as we&apos;re in touch. Waitlist entries stay until the community launches or
        you ask me to remove them.
      </>
    ),
  },
  {
    label: "Your choices",
    body: (
      <>
        You can ask to see, correct or delete anything you&apos;ve sent me at any time: email{" "}
        <a className="u-link" href={`mailto:${site.email}`}>
          {site.email}
        </a>{" "}
        and I&apos;ll do it within a few days. Questions about this page go to the same address.
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Privacy" }]} />
      <Title>Privacy</Title>
      <p className="t-lead">{INTRO}</p>
      {SECTIONS.map((s) => (
        <div key={s.label}>
          <Divider />
          <Section>
            <SectionLabel>{s.label}</SectionLabel>
            <p className="t-ui font-normal text-body">{s.body}</p>
          </Section>
        </div>
      ))}
      <p className="t-label mt-16 text-muted">
        {site.name}, saribkhan.com. Last updated 25 November 2026.
      </p>
    </>
  );
}
