import {
  ArrowClockwise,
  ArrowsLeftRight,
  CalendarCheck,
  ChatCircleText,
  Check,
  Database,
  EnvelopeSimple,
  FunnelSimple,
  House,
  InstagramLogo,
  PhoneCall,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { TestimonialCard } from "@/components/home/testimonial-card";
import { Interaction } from "@/components/shell/interaction";
import { site } from "@/content/site";
import { BookButton, BookingProvider } from "./booking";
import { cityFor, type CityKey } from "./cities";
import { AGENT_TESTIMONIALS, CITY_PHOTO, CLIENT_FACES, PHOTOS } from "./content";
import { Dashboard } from "./dashboard";
import { Greeting } from "./greeting";
import { HeroPhone } from "./hero-phone";
import { InspirationStrip } from "./inspiration";
import { BookingMockup, CallMockup, EmailMockup, PhotoStage, TextMockup } from "./mockups";
import { PreviewProvider } from "./preview";
import { Problems } from "./problem";
import { StickyCta } from "./sticky-cta";
import { VideoReview } from "./video-review";
import { WorkCarousel } from "./work";
import "@/app/globals.css";
import "./agents.css";
import "./sections.css";

function Marquee({ items, className }: { items: React.ReactNode[]; className: string }) {
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

/** A section heading: a small label, then a big line. */
function Heading({ label, children, sub, light }: { label: string; children: React.ReactNode; sub?: React.ReactNode; light?: boolean }) {
  return (
    <div className="mb-8">
      <p className={light ? "ag-label !text-white/70" : "ag-label"}>{label}</p>
      <h2 className={light ? "ag-h2 !text-white" : "ag-h2"}>{children}</h2>
      {sub ? <p className={light ? "ag-sub !text-white/80" : "ag-sub"}>{sub}</p> : null}
    </div>
  );
}

/** One "fix": a big headline and line, then the animated illustration over a photo. */
function Fix({ title, line, photo, children }: { title: string; line: string; photo: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="ag-h3">{title}</h3>
      <p className="ag-sub !mt-2">{line}</p>
      <PhotoStage src={photo} className="mt-6">
        {children}
      </PhotoStage>
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

const ROLES = ["Listing agent", "Buyer's agent", "Team lead", "Broker-owner", "Property manager", "Leasing agent", "Luxury agent", "Investor"];

const STEPS = [
  ["A 15-minute call.", "We learn how you work, your listings and how you like to talk to clients.", PHOTOS.living2],
  ["We build it for you.", "Set up on your number, trained on your listings. You approve every answer before it goes live.", PHOTOS.houseWhite],
  ["It answers. You show homes.", "Hot leads come to you with their details and a booked time.", PHOTOS.coupleKeys],
] as const;

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

const Column = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative z-[1] mx-auto w-full max-w-[var(--column)] px-5 md:px-0 ${className}`}>{children}</div>
);

/**
 * Outreach page for US real estate agents, in the site's own style but
 * without the menu: the only thing to do here is book a call.
 */
export function AgentsLanding({ cityKey }: { cityKey: CityKey | null }) {
  const city = cityFor(cityKey);
  const cityPhoto = CITY_PHOTO[cityKey ?? "us"];
  const ticker = ["Done for you", "Live in 7 days", "Works on your own number", "Only 2 setup spots left this month"];

  return (
    <div className="site-shell ag relative min-h-dvh overflow-x-clip bg-paper" data-ag-city={cityKey ?? "us"}>
      <BookingProvider city={cityKey ?? "us"}>
        <PreviewProvider>
          <GridRules />

          {/* 0. Announcement ticker (stays pinned on phones) */}
          <Marquee className="ag-announce" items={[...ticker, ...ticker].map((t, i) => <span key={i}>{t}</span>)} />

          <StickyCta />

          {/* 1. Hero */}
          <Column className="pt-12 md:pt-20">
            <header>
              <nav aria-label="Breadcrumb" className="t-mono mb-6 flex flex-wrap items-center gap-2 text-[12.5px] text-muted">
                <span className="text-faint">/</span>
                <Greeting />
                <span className="text-ink-2">{city.name ? `For real estate agents in ${city.name}` : "For US real estate agents"}</span>
              </nav>
              <h1 className="ag-h1">
                Every lead gets an answer in seconds. <span>Even when you&apos;re at a showing.</span>
              </h1>
              <p className="ag-lead">
                We set up an assistant that answers your calls, texts and emails day and night, and puts serious buyers straight
                into your calendar. It&apos;s live in 7 days, on the number your clients already have.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
                <BookButton position="hero" id="ag-hero-cta" />
                <div className="ag-trust">
                  <span className="ag-faces" aria-hidden>
                    {CLIENT_FACES.map((f) => (
                      <span key={f}>
                        <Image src={f} alt="" width={36} height={36} />
                      </span>
                    ))}
                  </span>
                  <span>
                    Trusted by <b>30+ clients</b> across <b>12+ cities</b>
                  </span>
                </div>
              </div>

              <PhotoStage src={cityPhoto} className="ag-hero-stage mt-12">
                <HeroPhone city={city} />
              </PhotoStage>
            </header>
          </Column>

          {/* 2. What's included */}
          <Marquee
            className="ag-features mt-14"
            items={FEATURES.map(([Icon, label]) => (
              <span key={label}>
                <Icon size={18} />
                {label}
              </span>
            ))}
          />

          {/* 3. The problem */}
          <Column className="mt-16">
            <PhotoStage src={PHOTOS.phoneNight} className="ag-banner">
              <Heading label="The problem" light sub="They message two or three agents at once. Whoever replies first usually gets the showing.">
                Most buyers go with the first agent who answers.
              </Heading>
            </PhotoStage>
            <div className="mt-6">
              <Problems />
            </div>
          </Column>

          {/* 4. The fix */}
          <Column className="mt-24">
            <Heading label="The fix">Your assistant answers every way a client reaches you.</Heading>
            <div className="grid gap-20">
              <Fix
                title="Your phone gets answered, every time."
                line="It picks up when you can't, answers questions about the listing, books the showing and texts you a summary."
                photo={PHOTOS.houseClassic}
              >
                <CallMockup city={city} />
              </Fix>
              <Fix
                title="Every text gets a reply in seconds."
                line="SMS, Instagram and Facebook messages get a friendly answer in your tone, with photos and times to view."
                photo={PHOTOS.sofa}
              >
                <TextMockup city={city} />
              </Fix>
              <Fix
                title="Inquiries stop getting buried."
                line="Zillow, Realtor.com and website inquiries get answered, sorted and followed up if the buyer goes quiet."
                photo={PHOTOS.living}
              >
                <EmailMockup city={city} />
              </Fix>
              <Fix title="Showings book themselves." line="Buyers pick a time from your calendar. You just get the confirmation." photo={PHOTOS.houseDusk}>
                <BookingMockup city={city} />
              </Fix>
            </div>
          </Column>

          {/* 5. One screen for every lead */}
          <Column className="mt-24">
            <Heading label="One screen">See every lead, and what happened, in one place.</Heading>
            <Dashboard city={city} />
            <p className="t-label mt-3">Sample dashboard.</p>
          </Column>

          {/* 6. How it works */}
          <Column className="mt-24">
            <Heading label="How it works">Live in 7 days. You don&apos;t lift a finger.</Heading>
            <ol className="grid gap-4">
              {STEPS.map(([t, b, photo], i) => (
                <li key={t} className="ag-step">
                  <span className="ag-step-img">
                    <Image src={photo} alt="" fill sizes="(max-width: 640px) 40vw, 200px" className="object-cover" />
                    <b>0{i + 1}</b>
                  </span>
                  <span className="grid content-center gap-1.5 p-5">
                    <span className="text-[22px] leading-7 font-semibold tracking-[-0.02em] text-ink">{t}</span>
                    <span className="text-[16px] leading-6 text-body">{b}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <BookButton position="how" />
            </div>
          </Column>

          {/* 7. The video review */}
          <Column className="mt-24">
            <Heading label="Client story">Twenty-five years of websites, and this was the best one.</Heading>
            <VideoReview />
          </Column>

          {/* 8. Work */}
          <Column className="mt-24">
            <Heading label="Work" sub="Tap the eye on any project to look around the live site without leaving this page.">
              Real estate brands that now look as good as the homes they sell.
            </Heading>
            <WorkCarousel />
          </Column>

          {/* 9. What clients say */}
          <Column className="mt-24">
            <Heading label="What agents say">From invisible online to the agent clients pick.</Heading>
            <TestimonialCard items={AGENT_TESTIMONIALS} />
          </Column>

          <Marquee className="ag-features ag-roles mt-20" items={ROLES.map((r) => <span key={r}>{r}</span>)} />

          {/* 10. The offer */}
          <Column className="mt-20">
            <PhotoStage src={PHOTOS.housePool} className="ag-offer">
              <h2 className="ag-h2 !text-white">Here&apos;s the deal.</h2>
              <ul className="mt-7 grid gap-4">
                {[
                  "A free 15-minute call to see if it fits how you work",
                  "We set everything up for you, live in 7 days",
                  "It works on your current number, inbox and Instagram",
                  "You approve every answer before it talks to a client",
                  "No long contract. You can cancel any month",
                  "Only 2 setups left this month",
                ].map((x) => (
                  <li key={x} className="ag-check">
                    <span>
                      <Check size={13} weight="bold" />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <BookButton position="offer" className="ag-cta-light" />
              </div>
            </PhotoStage>
          </Column>

          {/* 11. Ideas: real estate UI by other designers, credited */}
          <Column className="mt-24">
            <Heading
              label="Ideas"
              sub="Real estate websites, apps, chat and listing designs we love from the wider design community. Bring the ones you like to the call, and we'll design and build yours."
            >
              What your website could look like.
            </Heading>
          </Column>
          <InspirationStrip />

          {/* 12. Final call to action */}
          <Column className="mt-24">
            <section id="ag-final" className="ag-final">
              <Image src={cityPhoto} alt="" fill sizes="(max-width: 640px) 100vw, 600px" className="object-cover" />
              <div className="ag-final-fade" aria-hidden />
              <div className="ag-final-copy">
                <h2 className="ag-h1 !text-white">Your next buyer is going to message someone tonight.</h2>
                <p className="ag-lead !text-white/85">Make sure you&apos;re the one who answers.</p>
                <div className="mt-9">
                  <BookButton position="final" className="ag-cta-light" />
                </div>
                <p className="mt-4 text-[15px] text-white/70">15 minutes. No pressure. You&apos;ll leave with a clear yes or no.</p>
              </div>
            </section>
          </Column>

          <footer className="ag-foot">
            © 2026 ·{" "}
            <a className="u-link-plain" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </footer>
          <Interaction />
        </PreviewProvider>
      </BookingProvider>
    </div>
  );
}
