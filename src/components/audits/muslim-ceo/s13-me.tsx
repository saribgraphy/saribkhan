 
export function MeSection() {
  return (
    <>
    <section id="me">
      <div className="me">
        <div className="grid" style={{ gap: "22px", alignContent: "start" }}>
          <div className="eyebrow"><b>13</b>About me</div>
          <h2>I&apos;m Sarib, and this is the work I do every day.</h2>
          <div className="prose">
            <p>I&apos;ve been designing for the internet since 2020, and for the last stretch I&apos;ve focused on Muslim coaching and education brands. I design and build the whole journey a lead walks through, from the first landing page to the application, the pre-call page, the community and the tools a team uses behind the scenes.</p>
            <p>I understand what your setter is trying to do on a call and what a lead feels when they land on your page at midnight. I also care a lot about the details, which is why this report exists.</p>
            <p>You can see my work at <a href="https://sarib.xtarc.agency/">sarib.xtarc.agency</a>.</p>
          </div>
        </div>
        <div className="clients">
          <div><b>IMA Accelerator</b><span>Designer across funnels, website and internal tools. Ad funnel, selection and pre-call pages, homepage, webinar pages, a coaches platform and paid playbooks.</span></div>
          <div><b>Muslimpreneur</b><span>A faith-forward sales funnel with a landing page, a custom Typeform application and a confirmation page.</span></div>
          <div><b>Grow Your Offer</b><span>A growth agency for info-product brands, creators and coaches.</span></div>
          <div><b>Xtarc</b><span>My design studio, trusted by 37+ clients globally.</span></div>
        </div>
      </div>
    </section>
    
    <section id="next">
      <div className="eyebrow"><b>Next</b>Let&apos;s talk</div>
      <h2>Thirty minutes is enough to walk you through this.</h2>
      <div className="prose"><p>I&apos;ll take you through the findings and the first two weeks of fixes. Even if we never work together, you&apos;ll leave knowing exactly what to fix first.</p></div>
      <div className="contact">
        <div className="ct"><span>Website</span><b><a href="https://sarib.xtarc.agency/" style={{ color: "inherit" }}>sarib.xtarc.agency</a></b></div>
        <div className="ct"><span>Email</span><b>contact.saribkhan@gmail.com</b></div>
        <div className="ct"><span>WhatsApp</span><b>+92 314 750 3578</b></div>
      </div>
      <p className="method">How this audit was done: every page and link here was tested live in Chrome on 3 November 2026. Audience numbers come from each platform&apos;s public profile on that day. Page weight, status codes and missing files were checked in the browser. Scores are my own assessment. Screenshots are untouched apart from cropping.</p>
    </section>
    </>
  );
}
