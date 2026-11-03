/* eslint-disable @next/next/no-img-element -- report screenshots are plain, fixed-size images */
export function FunnelSection() {
  return (
    <>
    <section id="funnel">
      <div className="eyebrow"><b>07</b>Funnel and offer</div>
      <h2>The offer changes depending on where you meet it.</h2>
      <div className="grid g2" style={{ gap: "40px", alignItems: "start" }}>
        <div className="grid" style={{ gap: "20px" }}>
          <h3>The journey a new lead takes today</h3>
          <div className="journey">
            <div className="step"><div><h4>Watches one of Mohammad&apos;s videos</h4><p>This works well. Uploads are weekly, thumbnails are consistent and recent videos reach up to 9.2K views.</p></div></div>
            <div className="step bad"><div><h4>Clicks the link in the bio</h4><p>Lands on a blank page or an address that doesn&apos;t exist. Most people stop here.</p></div></div>
            <div className="step bad"><div><h4>Tries muslimceo.com instead</h4><p>If they type &quot;www&quot;, they hit the ClickFunnels wall. If they don&apos;t, they find no email sign-up anywhere.</p></div></div>
            <div className="step bad"><div><h4>Watches the free bootcamp</h4><p>It&apos;s a public YouTube video, so you never learn who watched it and can&apos;t follow up.</p></div></div>
            <div className="step bad"><div><h4>Reads the program page</h4><p>Sees a value of £18,088, then a price of $67 a month, with no call, application or explanation in between.</p></div></div>
            <div className="step"><div><h4>Joins Skool</h4><p>The people who make it this far get a real community. The problem is how few make it.</p></div></div>
          </div>
        </div>
        <div className="grid" style={{ gap: "20px" }}>
          <figure><button className="shot" data-full="/audits/muslim-ceo/program-value.webp"><span className="bar-top"><i></i><i></i><i></i><span>muslimceo.com/#/program</span></span><img src="/audits/muslim-ceo/program-value.webp" alt="Program value stack in pounds" loading="lazy" /></button><figcaption><b>Value in pounds.</b> Note &quot;*GROWTH ACCELERATOR PROGRAM*&quot;, still wrapped in formatting asterisks.</figcaption></figure>
          <figure><button className="shot" data-full="/audits/muslim-ceo/program-price.webp"><span className="bar-top"><i></i><i></i><i></i><span>muslimceo.com/#/program</span></span><img src="/audits/muslim-ceo/program-price.webp" alt="Price shown in dollars per month" loading="lazy" /></button><figcaption><b>Price in dollars.</b> The same screen switches currency.</figcaption></figure>
        </div>
      </div>
      <div className="findings">
        <div className="finding"><span><span className="tag t-crit">Critical</span></span><div><h4>No lead capture on the main site</h4><p>There isn&apos;t a single form on muslimceo.com. The contact page lists an email address, the free training is a public video and every button goes straight to a paid community.</p></div></div>
        <div className="finding"><span><span className="tag t-high">High</span></span><div><h4>Two currencies on one screen</h4><p>Value is listed in pounds (£18,088 in total) and the price in dollars ($67 a month). It reads like two offers stitched together.</p></div></div>
        <div className="finding"><span><span className="tag t-high">High</span></span><div><h4>A program described three ways</h4><p>The program page calls it a 7-week coaching program, sells it as a monthly subscription and promises &quot;Ask the Expert&quot; coaching &quot;for a whole year&quot;. Skool describes weekly group calls.</p></div></div>
        <div className="finding"><span><span className="tag t-high">High</span></span><div><h4>Different promises on different pages</h4><p>The homepage says &quot;Earn 5-figures a month&quot;. The program page says &quot;Earn a full-time income&quot;. The £1 offer page&apos;s title says £1, while the page itself says &quot;free trial&quot;.</p></div></div>
        <div className="finding"><span><span className="tag t-med">Medium</span></span><div><h4>A dated free guide</h4><p>The www homepage still promotes &quot;5 Halal Side Income Ideas Ripe for 2023&quot;.</p></div></div>
      </div>
    </section>
    </>
  );
}
