import {
  ArrowClockwise,
  ArrowsLeftRight,
  CalendarCheck,
  ChatCircleText,
  Database,
  EnvelopeSimple,
  FunnelSimple,
  House,
  InstagramLogo,
  PhoneCall,
} from "@phosphor-icons/react/dist/ssr";
import { Check } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Interaction } from "@/components/shell/interaction";
import { Divider } from "@/components/ui/view";
import { site } from "@/content/site";
import { BookButton, BookingProvider } from "./booking";
import { cityFor, type CityKey } from "./cities";
import { PROJECTS, TESTIMONIALS } from "./content";
import { Dashboard } from "./dashboard";
import { Faq } from "./faq";
import { Greeting } from "./greeting";
import { HeroPhone } from "./hero-phone";
import { BookingMockup, CallMockup, EmailMockup, TextMockup } from "./mockups";
import { EyeButton, PreviewProvider } from "./preview";
import { Problems } from "./problem";
import { Skyline } from "./skyline";
import { StickyCta } from "./sticky-cta";
import { VideoCard } from "./video-card";
import "@/app/globals.css";
import "./agents.css";
import "./sections.css";

/** A [bracketed] placeholder Sarib fills before launch, in the site's own placeholder style. */
const Ph = ({ children }: { children: React.ReactNode }) => (
  <span className="ph">[{children}]</span>
);

/** A section heading in the site's voice: a small label, then a bigger line than other pages use. */
function Heading({
  label,
  children,
  sub,
}: {
  label: string;
  children: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="t-label mb-3">{label}</p>
      <h2 className="ag-h2">{children}</h2>
      {sub ? <p className="t-lead mt-3">{sub}</p> : null}
    </div>
  );
}

/** One "fix" row: the headline and line, then the animated mockup in a frame, then the eye button. */
function FixRow({
  title,
  line,
  eye,
  small,
  children,
}: {
  title: string;
  line: string;
  eye: string;
  small?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3
        className={
          small
            ? "text-[17px] leading-6 font-semibold tracking-[-0.015em] text-ink"
            : "text-[20px] leading-7 font-semibold tracking-[-0.015em] text-ink"
        }
      >
        {title}
      </h3>
      <p className="t-body mt-1">{line}</p>
      <div className="frame hatch -mx-4 mt-5 max-md:mx-0">{children}</div>
      <div className="mt-3">
        <EyeButton slug={eye} />
      </div>
    </div>
  );
}

const ROLES = [
  "Listing agent",
  "Buyer's agent",
  "Team lead",
  "Broker-owner",
  "Property manager",
  "Leasing agent",
  "Luxury agent",
  "Investor",
];

function Marquee({
  items,
  className,
}: {
  items: React.ReactNode[];
  className: string;
}) {
  // Two copies side by side; the strip slides by exactly one copy and loops.
  const row = (hidden: boolean) => (
    <ul className="ag-marquee-row" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
  return (
    <div className={`ag-marquee ${className}`}>
      <div className="ag-marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

const FEATURES: [React.ComponentType<{ size?: number }>, string][] = [
  [PhoneCall, "Call answering"],
  [ChatCircleText, "Text replies"],
  [InstagramLogo, "Instagram & Facebook DMs"],
  [EnvelopeSimple, "Email inbox"],
  [House, "Zillow & Realtor.com inquiries"],
  [CalendarCheck, "Showing bookings"],
  [FunnelSimple, "Lead qualifying"],
  [ArrowClockwise, "Follow-ups"],
  [ArrowsLeftRight, "Warm transfer to you"],
  [Database, "CRM logging"],
];

/** The site's quiet scaffolding: dashed column rules and edge strips, as on every other page. */
function GridRules() {
  return (
    <div aria-hidden>
      <span className="edge-strip left-0" />
      <span className="edge-strip right-0 -scale-x-100" />
      <span className="grid-rule hidden left-[calc(50%-var(--column)/2-1px)] md:block" />
      <span className="grid-rule hidden left-[calc(50%+var(--column)/2)] md:block" />
    </div>
  );
}

/**
 * Outreach page for US real estate agents, in the site's own style but
 * without the menu: the only thing to do here is book a call.
 */
export function AgentsLanding({ cityKey }: { cityKey: CityKey | null }) {
  const city = cityFor(cityKey);
  const ticker = ["Done for you", "Live in 7 days", "Works on your own number"];

  return (
    <div
      className="site-shell ag relative min-h-dvh overflow-x-clip bg-paper"
      data-ag-city={cityKey ?? "us"}
    >
      <BookingProvider city={cityKey ?? "us"}>
        <PreviewProvider>
          <GridRules />

          {/* 0. Announcement ticker */}
          <Marquee
            className="ag-announce"
            items={[
              ...ticker,
              <Ph key="spots">N setup spots left in MONTH</Ph>,
              ...ticker,
            ].map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          />

          <StickyCta />

          <main className="relative z-[1] mx-auto w-full max-w-[var(--column)] px-5 pt-14 md:px-0 md:pt-20">
            {/* 1. Hero */}
            <header>
              <nav
                aria-label="Breadcrumb"
                className="t-mono mb-6 flex flex-wrap items-center gap-2 text-muted"
              >
                <span className="text-faint">/</span>
                <Greeting />
                <span className="text-ink-2">
                  {city.name
                    ? `For real estate agents in ${city.name}`
                    : "For US real estate agents"}
                </span>
              </nav>
              <h1 className="t-display ag-h1 mb-6">
                Every lead gets an answer in seconds.{" "}
                <span className="text-[#0008]">
                  Even when you&apos;re at a showing.
                </span>
              </h1>
              <p className="t-lead">
                We set up an assistant that answers your calls, texts and emails
                day and night, and puts serious buyers straight into your
                calendar. It&apos;s live in 7 days, on the number your clients
                already have.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
                <BookButton position="hero" id="ag-hero-cta" />
                <div className="ag-trust t-label">
                  <span className="ag-faces" aria-hidden>
                    {["A", "M", "L", "D"].map((f) => (
                      <i key={f}>{f}</i>
                    ))}
                  </span>
                  <span>
                    Trusted by <Ph>40+</Ph> clients across <Ph>12</Ph> cities
                  </span>
                </div>
              </div>

              <div className="frame hatch relative mt-12 -mx-4 overflow-hidden pb-14 max-md:mx-0">
                <HeroPhone city={city} />
                <Skyline city={cityKey} />
              </div>
            </header>
          </main>

          {/* 2. What's included */}
          <Marquee
            className="ag-features mt-14"
            items={FEATURES.map(([Icon, label]) => (
              <span key={label}>
                <Icon size={15} />
                {label}
              </span>
            ))}
          />

          <div className="relative z-[1] mx-auto w-full max-w-[var(--column)] px-5 md:px-0">
            <Divider className="my-16" />

            {/* 3. The problem */}
            <section>
              <Heading
                label="The problem"
                sub="They message two or three agents at once. Whoever replies first usually gets the showing. Here's where leads slip away right now."
              >
                Most buyers go with the first agent who answers.
              </Heading>
              <Problems />
            </section>

            <Divider className="my-16" />

            {/* 4. The fix */}
            <section>
              <Heading label="The fix">
                Your assistant answers every way a client reaches you.
              </Heading>
              <div className="grid gap-14">
                <FixRow
                  title="Your phone gets answered, every time."
                  line="It picks up when you can't, answers questions about the listing, books the showing and texts you a summary. Want the call? It transfers it to you."
                  eye="mortime"
                >
                  <CallMockup city={city} />
                </FixRow>
                <FixRow
                  title="Every text gets a reply in seconds."
                  line="SMS, Instagram and Facebook messages get a friendly, accurate answer in your tone, with photos and times to view."
                  eye="chat-widget"
                >
                  <TextMockup city={city} />
                </FixRow>
                <FixRow
                  title="Inquiries stop getting buried."
                  line="Zillow, Realtor.com and website inquiries get answered, sorted and followed up after 48 hours if the buyer goes quiet."
                  eye="mortime"
                >
                  <EmailMockup city={city} />
                </FixRow>
                <FixRow
                  title="Showings book themselves."
                  line="Buyers pick a time from your calendar. You just get the confirmation."
                  eye="booking-calendar"
                  small
                >
                  <BookingMockup city={city} />
                </FixRow>
              </div>
            </section>

            <Divider className="my-16" />

            {/* 5. One screen for every lead */}
            <section>
              <Heading label="One screen">
                See every lead, and what happened, in one place.
              </Heading>
              <div className="frame -mx-4 max-md:mx-0">
                <Dashboard city={city} />
              </div>
              <p className="t-label mt-3">Sample dashboard.</p>
            </section>

            <Divider className="my-16" />

            {/* 6. How it works */}
            <section className="ag-blueprint">
              <Heading label="How it works">
                Live in 7 days. You don&apos;t lift a finger.
              </Heading>
              <ol className="grid gap-3">
                {[
                  [
                    "A 15-minute call.",
                    "We learn how you work, your listings and how you like to talk to clients.",
                  ],
                  [
                    "We build it for you.",
                    "Set up on your number, trained on your listings and FAQs. You approve every answer before it goes live.",
                  ],
                  [
                    "It answers. You show homes.",
                    "Hot leads come to you with their details and a booked time.",
                  ],
                ].map(([t, b], i) => (
                  <li key={t} className="card flex gap-4 !bg-white p-4">
                    <span className="t-mono pt-0.5 text-faint">0{i + 1}</span>
                    <span>
                      <span className="block text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink">
                        {t}
                      </span>
                      <span className="t-ui block font-normal text-body">
                        {b}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                <BookButton position="how" />
              </div>
            </section>

            <Divider className="my-16" />

            {/* 7. The video review */}
            <section>
              <VideoCard />
            </section>

            <Divider className="my-16" />

            {/* 8. Work we've built */}
            <section>
              <Heading
                label="Work"
                sub="Tap the eye on any project to look around it without leaving this page."
              >
                Built by the team behind Xtarc.
              </Heading>
            </section>
          </div>

          <div className="ag-work" role="list" aria-label="Projects">
            {PROJECTS.map((p) => (
              <article
                key={p.slug}
                role="listitem"
                className="ag-work-card card !bg-white"
              >
                <div className="ag-work-cover hatch">
                  {p.cover ? (
                    <Image
                      src={p.cover}
                      alt={`${p.name}, cover`}
                      fill
                      sizes="300px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <span className="t-label absolute inset-0 grid place-items-center">
                      <Ph>{p.name} cover</Ph>
                    </span>
                  )}
                </div>
                <div className="grid gap-1 p-4">
                  <p className="text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink">
                    {p.name}
                  </p>
                  <p className="t-ui font-normal text-body">{p.line}</p>
                  <div className="mt-3">
                    <EyeButton slug={p.slug} label="Look around" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="relative z-[1] mx-auto w-full max-w-[var(--column)] px-5 md:px-0">
            <Divider className="my-16" />

            {/* 9. What clients say */}
            <section>
              <Heading label="What clients say">
                Agents who stopped losing leads.
              </Heading>
              <div className="grid gap-3">
                {TESTIMONIALS.map((t) => (
                  <figure key={t.name} className="card !bg-white p-5">
                    <blockquote className="text-[16px] leading-6 tracking-[-0.015em] text-ink-2">
                      {t.quote.startsWith("[") ? (
                        <Ph>{t.quote.slice(1, -1)}</Ph>
                      ) : (
                        <>&ldquo;{t.quote}&rdquo;</>
                      )}
                    </blockquote>
                    <figcaption className="t-label mt-3">
                      <span className="text-ink-2">{t.name}</span>, {t.role}
                      {t.confirmed ? null : (
                        <>
                          {" "}
                          <Ph>confirm real client, happy to be quoted</Ph>
                        </>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          </div>

          <Marquee
            className="ag-features ag-roles mt-16"
            items={ROLES.map((r) => (
              <span key={r}>{r}</span>
            ))}
          />

          <div className="relative z-[1] mx-auto w-full max-w-[var(--column)] px-5 md:px-0">
            {/* 10. The offer */}
            <section className="mt-16">
              <div className="ag-offer">
                <h2 className="ag-h2 !text-white">Here&apos;s the deal.</h2>
                <ul className="mt-6 grid gap-3">
                  {[
                    "A free 15-minute call to see if it fits how you work",
                    "We set everything up for you, live in 7 days",
                    "It works on your current number, inbox and Instagram",
                    "You approve every answer before it talks to a client",
                  ].map((x) => (
                    <li key={x} className="ag-check">
                      <Check size={12} weight="bold" />
                      <span>{x}</span>
                    </li>
                  ))}
                  <li className="ag-check">
                    <Check size={12} weight="bold" />
                    <Ph>
                      Risk reversal Sarib picks: free 14-day trial / setup
                      refunded if it books no showings in 30 days / cancel any
                      month
                    </Ph>
                  </li>
                  <li className="ag-check">
                    <Check size={12} weight="bold" />
                    <Ph>Only N setups this month (only if true)</Ph>
                  </li>
                </ul>
                <div className="mt-8">
                  <BookButton position="offer" className="ag-cta-light" />
                </div>
              </div>
            </section>

            <Divider className="my-16" />

            {/* 11. Questions */}
            <section>
              <Heading label="Questions">What agents usually ask.</Heading>
              <Faq />
            </section>

            <Divider className="my-16" />

            {/* 12. Final call to action */}
            <section id="ag-final" className="pb-6">
              <h2 className="t-display mb-4">
                Your next buyer is going to message someone tonight.
              </h2>
              <p className="t-lead">
                Make sure you&apos;re the one who answers.
              </p>
              <div className="mt-8">
                <BookButton position="final" />
              </div>
              <p className="t-label mt-4">
                15 minutes. No pressure. You&apos;ll leave with a clear yes or
                no.
              </p>
            </section>

            <footer className="t-label ag-foot">
              © Xtarc ·{" "}
              <a className="u-link-plain" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </footer>
          </div>
          <Interaction />
        </PreviewProvider>
      </BookingProvider>
    </div>
  );
}
