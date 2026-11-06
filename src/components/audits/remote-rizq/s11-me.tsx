/* eslint-disable @next/next/no-img-element -- a small fixed-size portrait */
import { AboutActions, ContactLinks } from "../about-links";

export function MeSection() {
  return (
    <>
    <section id="rr-me">
      <div className="me">
        <div className="grid" style={{ gap: "22px", alignContent: "start" }}>
          <div className="eyebrow"><b>11</b>About me</div>
          <img className="avatar" src="/audits/sarib.webp" alt="Sarib Khan" width={88} height={88} />
          <h2>I&apos;m Sarib, and this is the work I do every day.</h2>
          <div className="prose">
            <p>I&apos;ve been designing for the internet since 2020, and for more than two years I&apos;ve been the designer behind IMA Accelerator. I design and build the whole journey a lead walks through, from the first landing page to the application, the pre-call page, the community and the tools a team uses behind the scenes.</p>
            <p>I understand what your setters are doing on a call and what a brother feels when he lands on your page late at night after a long shift. I also care a lot about the details, which is why this report exists.</p>
                  </div>
            <AboutActions contactId="rr-next" />
        </div>
        <div className="clients">
          <div><b>IMA Accelerator</b><span>Designer for more than two years. Ad funnel, selection and pre-call pages, homepage, webinar pages, a coaches platform and paid playbooks.</span></div>
          <div><b>Muslimpreneur</b><span>A faith-forward sales funnel with a landing page, a custom Typeform application and a confirmation page.</span></div>
          <div><b>The Cave Network</b><span>Website and funnel for an elite network of Muslim entrepreneurs.</span></div>
          <div><b>Xtarc</b><span>My design studio, trusted by 37+ clients globally.</span></div>
        </div>
      </div>
    </section>

    <section id="rr-next">
      <div className="eyebrow"><b>Next</b>Let&apos;s talk</div>
      <h2>Thirty minutes is enough to walk you through this.</h2>
      <div className="prose"><p>I&apos;ll take you through the findings and the first two weeks of work. You&apos;ll leave knowing exactly where your applications are slipping away.</p></div>
      <ContactLinks />
      <p className="method">How this audit was done: every page and link here was tested live in a browser on 7 November 2026, on desktop and phone sizes. Audience numbers come from each platform&apos;s public profile that day. Page weight, load time and requests were measured in the browser. I didn&apos;t submit an application. Scores are my own assessment. Screenshots are untouched.</p>
    </section>
    </>
  );
}
