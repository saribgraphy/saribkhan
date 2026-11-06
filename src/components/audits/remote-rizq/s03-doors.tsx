/* eslint-disable @next/next/no-img-element -- report screenshots are plain, fixed-size images */
export function DoorsSection() {
  return (
    <>
    <section id="rr-doors">
      <div className="eyebrow"><b>03</b>Two front doors</div>
      <h2>A brother meets a different Remote Rizq depending on where he starts.</h2>
      <p className="lead">I followed every way into Remote Rizq that I could find. Each one works on its own, but they tell different stories and none of them hand off to the other.</p>
      <div className="mapwrap">
        <svg viewBox="0 0 1000 420" role="img" aria-label="Map of the two Remote Rizq entry points">
          <text className="colh" x="20" y="20">Where a brother starts</text>
          <text className="colh" x="700" y="20">Where he lands</text>
          <path className="e ok" d="M260 64 C480 64 480 100 700 100"/>
          <path className="e high" d="M260 164 C480 164 480 230 700 230"/>
          <path className="e high" d="M260 264 C480 264 480 110 700 110"/>
          <path className="e crit" d="M260 364 C480 364 480 352 700 352"/>
          <g><rect className="nbox" x="20" y="40" width="240" height="48" rx="8"/><text className="nt" x="34" y="60">Instagram @saleswithaqib</text><text className="ns" x="34" y="78">Bio link, 1,960 followers</text></g>
          <g><rect className="nbox" x="20" y="140" width="240" height="48" rx="8"/><text className="nt" x="34" y="160">Types remoterizq.com</text><text className="ns" x="34" y="178">The domain on your email</text></g>
          <g><rect className="nbox" x="20" y="240" width="240" height="48" rx="8"/><text className="nt" x="34" y="260">Free Skool about page</text><text className="ns" x="34" y="278">One line of text at the end</text></g>
          <g><rect className="nbox" x="20" y="340" width="240" height="48" rx="8"/><text className="nt" x="34" y="360">Searches &quot;Remote Rizq&quot;</text><text className="ns" x="34" y="378">Google or any search engine</text></g>
          <g><rect className="nbox" x="700" y="60" width="280" height="80" rx="8"/><circle className="dot ok" cx="700" cy="100" r="5"/><text className="nt" x="716" y="84">remoterizq.co</text><text className="ns" x="716" y="104">Paid application · RemoteRizq Elite</text><text className="ns" x="716" y="122">Gold logo · &quot;45 days&quot;</text></g>
          <g><rect className="nbox" x="700" y="190" width="280" height="80" rx="8"/><circle className="dot high" cx="700" cy="230" r="5"/><text className="nt" x="716" y="214">skool.com/remoterizq</text><text className="ns" x="716" y="234">Free community · 2K members</text><text className="ns" x="716" y="252">Blue logo · &quot;30 days&quot;</text></g>
          <g><rect className="nbox" x="700" y="324" width="280" height="56" rx="8"/><circle className="dot crit" cx="700" cy="352" r="5"/><text className="nt" x="716" y="348">No Remote Rizq result</text><text className="ns" x="716" y="366">None of your pages came up</text></g>
        </svg>
      </div>
      <div className="legend"><span className="tag t-ok">Works</span><span className="tag t-high">Works with problems</span><span className="tag t-crit">Missing</span><span>The website never links to the free community, so the flow only ever runs one way.</span></div>
      <div className="figs">
        <figure><button className="shot" data-full="/audits/remote-rizq/skool-free.webp"><span className="bar-top"><i></i><i></i><i></i><span>skool.com/remoterizq</span></span><img src="/audits/remote-rizq/skool-free.webp" alt="Free RemoteRizq Skool community" loading="lazy" /></button><figcaption><b>The free community.</b> 2K members, 7 admins and a blue logo that appears nowhere else. The only route to Elite is a line of text at the end of the about page.</figcaption></figure>
        <figure><button className="shot" data-full="/audits/remote-rizq/hero.webp"><span className="bar-top"><i></i><i></i><i></i><span>remoterizq.co</span></span><img src="/audits/remote-rizq/hero.webp" alt="RemoteRizq website hero" loading="lazy" /></button><figcaption><b>The paid application.</b> A gold logo on navy, a different headline and a different timeline. A brother coming from Skool could reasonably wonder if this is the same program.</figcaption></figure>
      </div>
    </section>
    </>
  );
}
