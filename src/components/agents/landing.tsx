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
import { Interaction } from "@/components/shell/interaction";
import { Divider } from "@/components/ui/view";
import { site } from "@/content/site";
import { BookButton, BookingProvider } from "./booking";
import { cityFor, type CityKey } from "./cities";
import { Greeting } from "./greeting";
import { HeroPhone } from "./hero-phone";
import { Skyline } from "./skyline";
import { StickyCta } from "./sticky-cta";
import "@/app/globals.css";
import "./agents.css";

/** A [bracketed] placeholder Sarib fills before launch, in the site's own placeholder style. */
const Ph = ({ children }: { children: React.ReactNode }) => <span className="ph">[{children}]</span>;

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
    <div className="site-shell ag relative min-h-dvh overflow-x-clip bg-paper" data-ag-city={cityKey ?? "us"}>
      <BookingProvider city={cityKey ?? "us"}>
        <GridRules />

        {/* 0. Announcement ticker */}
        <Marquee
          className="ag-announce"
          items={[...ticker, <Ph key="spots">N setup spots left in MONTH</Ph>, ...ticker].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        />

        <StickyCta />

        <main className="relative z-[1] mx-auto w-full max-w-[var(--column)] px-5 pt-14 md:px-0 md:pt-20">
          {/* 1. Hero */}
          <header>
            <nav aria-label="Breadcrumb" className="t-mono mb-6 flex flex-wrap items-center gap-2 text-muted">
              <span className="text-faint">/</span>
              <Greeting />
              <span className="text-ink-2">{city.name ? `For real estate agents in ${city.name}` : "For US real estate agents"}</span>
            </nav>
            <h1 className="t-display ag-h1 mb-6">
              Every lead gets an answer in seconds. <span className="text-[#0008]">Even when you&apos;re at a showing.</span>
            </h1>
            <p className="t-lead">
              We set up an assistant that answers your calls, texts and emails day and night, and puts serious buyers straight
              into your calendar. It&apos;s live in 7 days, on the number your clients already have.
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
          {/* Sections 3 to 11 arrive in the next chunks. */}

          <Divider className="my-16" />

          {/* 12. Final call to action */}
          <section id="ag-final" className="pb-6">
            <h2 className="t-display mb-4">Your next buyer is going to message someone tonight.</h2>
            <p className="t-lead">Make sure you&apos;re the one who answers.</p>
            <div className="mt-8">
              <BookButton position="final" />
            </div>
            <p className="t-label mt-4">15 minutes. No pressure. You&apos;ll leave with a clear yes or no.</p>
          </section>

          <footer className="t-label ag-foot">
            © Xtarc ·{" "}
            <a className="u-link-plain" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </footer>
        </div>
        <Interaction />
      </BookingProvider>
    </div>
  );
}
