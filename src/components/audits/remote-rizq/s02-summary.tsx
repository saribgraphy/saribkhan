export function SummarySection() {
  return (
    <>
    <section id="rr-summary">
      <div className="eyebrow"><b>02</b>The short version</div>
      <h2>The proof is strong, but applying takes more effort than it should.</h2>
      <div className="prose">
        <p>Unlike most funnels I look at, nothing here is broken. Every link I tested works and the form is wired into your CRM. The problem is quieter than that. Small gaps in design, consistency and tracking are costing you applications you never see, and you have no data to find them.</p>
        <p>Three things matter more than everything else, in this order.</p>
      </div>
      <ol className="prio">
        <li><div><h3>Your two front doors don&apos;t know about each other.</h3><p>remoterizq.com opens a free Skool community with 2K members, a blue logo and a 30-day promise. remoterizq.co opens the paid application with a gold logo and a 45-day promise. Your Instagram skips the community entirely, and the website never mentions it. Your biggest pool of warm leads has no designed path to Elite.</p></div></li>
        <li><div><h3>The application looks like it belongs to someone else.</h3><p>The most important step on the page is a third-party form in a flat gold block, with a different typeface and logo treatment, under a sticky menu that covers its own heading. On phones, the &quot;Edit with Lovable&quot; badge sits on top of the Apply button.</p></div></li>
        <li><div><h3>You can&apos;t see what&apos;s working.</h3><p>There&apos;s no Meta pixel, no Google Analytics and no tag manager on the site. You can&apos;t retarget the brothers who watch the video and leave, ads can&apos;t learn who applies, and nobody can say where applications drop off.</p></div></li>
      </ol>
      <div className="score" aria-label="Audit scores out of 10">
        <h4>Where you stand today, scored out of 10</h4>
        <div className="srow"><span>Proof and results</span><div className="bar"><i style={{ width: "90%", background: "var(--ok)" }}></i></div><b>9</b></div>
        <div className="srow"><span>Reputation</span><div className="bar"><i style={{ width: "90%", background: "var(--ok)" }}></i></div><b>9</b></div>
        <div className="srow"><span>Offer and guarantee</span><div className="bar"><i style={{ width: "80%", background: "var(--ok)" }}></i></div><b>8</b></div>
        <div className="srow"><span>Community</span><div className="bar"><i style={{ width: "70%", background: "var(--ok)" }}></i></div><b>7</b></div>
        <div className="srow"><span>Website design</span><div className="bar"><i style={{ width: "40%", background: "var(--high)" }}></i></div><b>4</b></div>
        <div className="srow"><span>Application funnel</span><div className="bar"><i style={{ width: "40%", background: "var(--high)" }}></i></div><b>4</b></div>
        <div className="srow"><span>Brand consistency</span><div className="bar"><i style={{ width: "30%", background: "var(--crit)" }}></i></div><b>3</b></div>
        <div className="srow"><span>Speed</span><div className="bar"><i style={{ width: "30%", background: "var(--crit)" }}></i></div><b>3</b></div>
        <div className="srow"><span>Tracking and SEO</span><div className="bar"><i style={{ width: "20%", background: "var(--crit)" }}></i></div><b>2</b></div>
        <p className="note">These scores are my own assessment, based on everything in this report. The top four are what you&apos;ve earned. The rest is what&apos;s limiting them.</p>
      </div>
    </section>
    </>
  );
}
