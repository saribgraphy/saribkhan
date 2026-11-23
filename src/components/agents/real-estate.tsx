import { Check } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { TestimonialCard } from "@/components/home/testimonial-card";
import { Interaction } from "@/components/shell/interaction";
import { realEstate as c } from "@/content/real-estate";
import { site } from "@/content/site";
import { BookButton, BookingProvider } from "./booking";
import { cityFor } from "./cities";
import { AGENT_TESTIMONIALS, CLIENT_FACES, PHOTOS } from "./content";
import { Greeting } from "./greeting";
import { InspirationStrip } from "./inspiration";
import { Column, FEATURES, Fix, GridRules, Heading, Marquee, ROLES } from "./landing";
import { BookingMockup, CallMockup, EmailMockup, PhotoStage, TextMockup } from "./mockups";
import { PreviewProvider } from "./preview";
import { Problems } from "./problem";
import { StickyCta } from "./sticky-cta";
import { VideoReview } from "./video-review";
import { VslInline } from "./vsl";
import { WorkCarousel } from "./work";

/**
 * /real-estate: the public, video-first page for US real estate agents. A
 * short, centred page in a wider column: the headline, the film large with the
 * booking button under it, then the problem, the four fixes two across, the
 * proof, and one closing section with the offer and the call. No dashboard and
 * no "how it works" steps. Copy lives in src/content/real-estate.ts.
 */
export function RealEstateLanding() {
  const city = cityFor(null);
  const ticker = ["Done for you", "Live in 7 days", "Works on your own number", "Only 2 setup spots left this month"];

  return (
    <div className="site-shell ag ag-wide ag-center relative min-h-dvh overflow-x-clip bg-paper" data-ag-city="real-estate">
      <BookingProvider city="real-estate">
        <PreviewProvider>
          <GridRules />

          {/* 0. Announcement ticker (stays pinned on phones) */}
          <Marquee className="ag-announce" items={[...ticker, ...ticker].map((t, i) => <span key={i}>{t}</span>)} />

          <StickyCta />

          {/* 1. The headline, the film, the button */}
          <Column className="pt-12 md:pt-16">
            <header>
              <nav aria-label="Breadcrumb" className="t-mono mb-6 flex flex-wrap items-center justify-center gap-2 text-[12.5px] text-muted">
                <span className="text-faint">/</span>
                <Greeting />
                <span className="text-ink-2">{c.eyebrow}</span>
              </nav>
              <h1 className="ag-h1">
                {c.headline} <span>{c.headlineMuted}</span>
              </h1>
              <p className="ag-lead">{c.lead}</p>
              <div className="mt-10">
                <VslInline label={c.videoLabel} />
              </div>
              <div className="mt-8 grid justify-items-center gap-4">
                <BookButton position="hero" id="ag-hero-cta" />
                <p className="text-[14px] leading-5 text-muted">{c.small}</p>
                <div className="ag-trust mt-2">
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
            </header>
          </Column>

          {/* 2. What's included */}
          <Marquee
            className="ag-features mt-16"
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
              <Heading label={c.problem.label} light sub={c.problem.sub}>
                {c.problem.heading}
              </Heading>
            </PhotoStage>
            <div className="mt-6 text-left">
              <Problems wide />
            </div>
          </Column>

          {/* 4. The fix, two across */}
          <Column className="mt-24">
            <Heading label="The fix">{c.fixHeading}</Heading>
            <div className="ag-fix-grid">
              <Fix title={c.fixes[0].title} line={c.fixes[0].line} photo={PHOTOS.houseClassic}>
                <CallMockup city={city} />
              </Fix>
              <Fix title={c.fixes[1].title} line={c.fixes[1].line} photo={PHOTOS.sofa}>
                <TextMockup city={city} />
              </Fix>
              <Fix title={c.fixes[2].title} line={c.fixes[2].line} photo={PHOTOS.living}>
                <EmailMockup city={city} />
              </Fix>
              <Fix title={c.fixes[3].title} line={c.fixes[3].line} photo={PHOTOS.houseDusk}>
                <BookingMockup city={city} />
              </Fix>
            </div>
          </Column>

          {/* 5. The video review */}
          <Column className="mt-24">
            <Heading label="Client story">{c.story.heading}</Heading>
            <div className="mx-auto max-w-[760px] text-left">
              <VideoReview />
            </div>
          </Column>

          {/* 6. Work */}
          <Column className="mt-24">
            <Heading label="Work" sub="Tap the eye on any project to look around the live site without leaving this page.">
              Real estate brands that now look as good as the homes they sell.
            </Heading>
            <div className="text-left">
              <WorkCarousel />
            </div>
          </Column>

          {/* 7. What clients say */}
          <Column className="mt-24">
            <Heading label="What agents say">From invisible online to the agent clients pick.</Heading>
            <div className="mx-auto max-w-[760px] text-left">
              <TestimonialCard items={AGENT_TESTIMONIALS} />
            </div>
          </Column>

          <Marquee className="ag-features ag-roles mt-20" items={ROLES.map((r) => <span key={r}>{r}</span>)} />

          {/* 8. Ideas: real estate UI by other designers, credited */}
          <Column className="mt-20">
            <Heading
              label="Ideas"
              sub="Real estate websites, apps, chat and listing designs we love from the wider design community. Bring the ones you like to the call, and we'll design and build yours."
            >
              What your website could look like.
            </Heading>
          </Column>
          <InspirationStrip />

          {/* 9. The deal and the call, in one closing section */}
          <Column className="mt-24">
            <section id="ag-final" className="ag-final">
              <Image src={PHOTOS.houseDusk} alt="" fill sizes="(max-width: 640px) 100vw, 1040px" className="object-cover" />
              <div className="ag-final-fade" aria-hidden />
              <div className="ag-final-copy">
                <p className="ag-label !text-white/70">{c.offerLabel}</p>
                <h2 className="ag-h1 !text-white">{c.finalHeading}</h2>
                <p className="ag-lead !text-white/85">{c.finalLead}</p>
                <ul className="ag-final-list">
                  {c.offer.map((x) => (
                    <li key={x} className="ag-check">
                      <span>
                        <Check size={13} weight="bold" />
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <BookButton position="final" className="ag-cta-light" />
                </div>
                <p className="mt-4 text-[15px] text-white/70">{c.small}</p>
              </div>
            </section>
          </Column>

          <footer className="ag-foot">
            © 2026 ·{" "}
            <Link className="u-link-plain" href="/">
              {site.name}
            </Link>{" "}
            ·{" "}
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
