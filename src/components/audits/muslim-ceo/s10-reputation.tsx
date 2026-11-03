/* eslint-disable @next/next/no-img-element -- report screenshots are plain, fixed-size images */
export function ReputationSection() {
  return (
    <>
    <section id="reputation">
      <div className="eyebrow"><b>10</b>Reputation</div>
      <h2>People either love you or feel let down. Almost nobody sits in between.</h2>
      <div className="grid g2" style={{ gap: "32px", alignItems: "start" }}>
        <div className="dist" aria-label="Trustpilot rating distribution">
          <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "8px" }}><span className="big">3.3</span><span className="note">Trustpilot average from 51 reviews</span></div>
          <div className="drow"><span>5 stars</span><div className="bar"><i style={{ width: "43%", background: "var(--ok)" }}></i></div><b>43%</b></div>
          <div className="drow"><span>4 stars</span><div className="bar"><i style={{ width: "6%", background: "var(--ok)" }}></i></div><b>6%</b></div>
          <div className="drow"><span>3 stars</span><div className="bar"><i style={{ width: "0%", background: "var(--med)" }}></i></div><b>0%</b></div>
          <div className="drow"><span>2 stars</span><div className="bar"><i style={{ width: "4%", background: "var(--high)" }}></i></div><b>4%</b></div>
          <div className="drow"><span>1 star</span><div className="bar"><i style={{ width: "47%", background: "var(--crit)" }}></i></div><b>47%</b></div>
          <p className="note">Trustpilot also notes that you haven&apos;t invited reviews recently, so your happiest members probably haven&apos;t been asked.</p>
        </div>
        <div className="prose">
          <p>I read the recent one-star reviews from 2023 to 2025, and they repeat the same few points. People felt the webinars were long sales pitches. One said a webinar sold as live looked recorded. Others felt there was more to pay after the first price, or that faith was being used to sell.</p>
          <p><strong>Very few of these complaints are about the teaching itself.</strong> They&apos;re about expectations, and expectations are set by marketing and design. Hype-led lines like &quot;Become rich without restrictions&quot; and &quot;Work less than 10 hours a week&quot; attract exactly the person who will feel misled later.</p>
          <p>For comparison, IMA Accelerator, where I design the funnel, sits at 4.8. A big part of that gap is how clearly the funnel sets expectations before anyone pays.</p>
        </div>
      </div>
      <figure><button className="shot" data-full="/audits/muslim-ceo/trustpilot.webp"><span className="bar-top"><i></i><i></i><i></i><span>trustpilot.com/review/muslimceo.com</span></span><img src="/audits/muslim-ceo/trustpilot.webp" alt="Muslim CEO Trustpilot profile" loading="lazy" /></button><figcaption><b>Trustpilot.</b> The profile was claimed in January 2021.</figcaption></figure>
    </section>
    </>
  );
}
