import { CaretDown, Check } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { TestimonialCard } from "@/components/home/testimonial-card";
import { Interaction } from "@/components/shell/interaction";
import { realEstate as c, realEstateMore as m } from "@/content/real-estate";
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

/** Section spacing and heading spacing for this page: generous, like a SaaS landing page. */
const SECTION = "mt-28 md:mt-40";
const HEAD = "mb-12 md:mb-16";
const STEP_PHOTOS = [PHOTOS.living2, PHOTOS.houseWhite, PHOTOS.coupleKeys];

/**
 * /real-estate: the public, video-first page for realtors in the US, Canada
 * and Australia. Centred, in a wider column: the headline and the film, a
 * plain-words definition, the problem, the four fixes, the voice agent, how it
 * works, the three markets, a comparison, the proof, the FAQ and one closing
 * section with the offer. Copy lives in src/content/real-estate.ts and also
 * feeds the Markdown version, llms.txt and the JSON-LD (FAQPage included).
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
          <Column className="pt-14 md:pt-24">
            <header>
              <nav aria-label="Breadcrumb" className="t-mono mb-7 flex flex-wrap items-center justify-center gap-2 text-[12.5px] text-muted">
                <span className="text-faint">/</span>
                <Greeting />
                <span className="text-ink-2">{c.eyebrow}</span>
              </nav>
              <h1 className="ag-h1">
                {c.headline} <span>{c.headlineMuted}</span>
              </h1>
              <p className="ag-lead">{c.lead}</p>
              <div className="mt-12 md:mt-14">
                <VslInline label={c.videoLabel} />
              </div>
              <div className="mt-10 grid justify-items-center gap-4">
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
            className="ag-features mt-20"
            items={FEATURES.map(([Icon, label]) => (
              <span key={label}>
                <Icon size={18} />
                {label}
              </span>
            ))}
          />

          {/* 3. In plain words (the answer AI search engines quote) */}
          <Column className={SECTION}>
            <section aria-labelledby="re-what">
              <p className="ag-label">{m.definition.label}</p>
              <h2 id="re-what" className="ag-h2">
                {m.definition.heading}
              </h2>
              <div className="ag-prose mt-8">
                {m.definition.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          </Column>

          {/* 4. The problem */}
          <Column className={SECTION}>
            <PhotoStage src={PHOTOS.phoneNight} className="ag-banner">
              <Heading label={c.problem.label} light sub={c.problem.sub} className="mb-0">
                {c.problem.heading}
              </Heading>
            </PhotoStage>
            <div className="mt-8 text-left">
              <Problems wide />
            </div>
          </Column>

          {/* 5. The fix, two across, rows aligned */}
          <Column className={SECTION}>
            <Heading label="The fix" className={HEAD}>
              {c.fixHeading}
            </Heading>
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

          {/* 6. The voice agent */}
          <Column className={SECTION}>
            <Heading label={m.voice.label} sub={m.voice.sub} className={HEAD}>
              {m.voice.heading}
            </Heading>
            <ul className="ag-cards text-left">
              {m.voice.points.map(([t, b]) => (
                <li key={t} className="ag-card">
                  <span className="ag-card-tick" aria-hidden>
                    <Check size={14} weight="bold" />
                  </span>
                  <h3>{t}</h3>
                  <p>{b}</p>
                </li>
              ))}
            </ul>
          </Column>

          {/* 7. How it works */}
          <Column className={SECTION}>
            <Heading label={m.steps.label} className={HEAD}>
              {m.steps.heading}
            </Heading>
            <ol className="ag-steps-row text-left">
              {m.steps.items.map(([t, b], i) => (
                <li key={t} className="ag-step-card">
                  <span className="ag-step-card-img">
                    <Image src={STEP_PHOTOS[i]} alt="" fill sizes="(max-width: 768px) 100vw, 340px" className="object-cover" />
                    <b>0{i + 1}</b>
                  </span>
                  <span className="grid gap-2 p-6">
                    <h3>{t}</h3>
                    <p>{b}</p>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-12 flex justify-center">
              <BookButton position="how" />
            </div>
          </Column>

          {/* 8. The three markets */}
          <Column className={SECTION}>
            <Heading label={m.markets.label} sub={m.markets.sub} className={HEAD}>
              {m.markets.heading}
            </Heading>
            <ul className="ag-cards text-left">
              {m.markets.items.map((x) => (
                <li key={x.country} className="ag-card">
                  <h3>{x.country}</h3>
                  <p>
                    <b>Answers leads from</b> {x.sources}
                  </p>
                  <p>
                    <b>Messaging rules</b> {x.rules}
                  </p>
                </li>
              ))}
            </ul>
          </Column>

          {/* 9. The comparison */}
          <Column className={SECTION}>
            <Heading label={m.compare.label} className={HEAD}>
              {m.compare.heading}
            </Heading>
            <div className="ag-compare">
              <table>
                <thead>
                  <tr>
                    {m.compare.head.map((h, i) => (
                      <th key={i} scope="col">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {m.compare.rows.map(([label, ...cells]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      {cells.map((cell, i) => (
                        <td key={i}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Column>

          {/* 10. The video review */}
          <Column className={SECTION}>
            <Heading label="Client story" className={HEAD}>
              {c.story.heading}
            </Heading>
            <div className="mx-auto max-w-[760px] text-left">
              <VideoReview />
            </div>
          </Column>

          {/* 11. Work */}
          <Column className={SECTION}>
            <Heading label="Work" sub="Tap the eye on any project to look around the live site without leaving this page." className={HEAD}>
              Real estate brands that now look as good as the homes they sell.
            </Heading>
            <div className="text-left">
              <WorkCarousel />
            </div>
          </Column>

          {/* 12. What clients say */}
          <Column className={SECTION}>
            <Heading label="What agents say" className={HEAD}>
              From invisible online to the agent clients pick.
            </Heading>
            <div className="mx-auto max-w-[760px] text-left">
              <TestimonialCard items={AGENT_TESTIMONIALS} />
            </div>
          </Column>

          <Marquee className="ag-features ag-roles mt-28 md:mt-36" items={ROLES.map((r) => <span key={r}>{r}</span>)} />

          {/* 13. FAQ */}
          <Column className={SECTION}>
            <section aria-labelledby="re-faq">
              <p className="ag-label">FAQ</p>
              <h2 id="re-faq" className="ag-h2">
                Questions agents ask before they book.
              </h2>
              <div className="ag-faq mt-12 md:mt-16 text-left">
                {m.faq.map((f) => (
                  <details key={f.q}>
                    <summary>
                      <h3>{f.q}</h3>
                      <CaretDown size={18} weight="bold" aria-hidden />
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </Column>

          {/* 14. Ideas: real estate UI by other designers, credited */}
          <Column className={SECTION}>
            <Heading
              label="Ideas"
              sub="Real estate websites, apps, chat and listing designs we love from the wider design community. Bring the ones you like to the call, and we'll design and build yours."
              className={HEAD}
            >
              What your website could look like.
            </Heading>
          </Column>
          <InspirationStrip />

          {/* 15. The deal and the call, in one closing section */}
          <Column className={SECTION}>
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
