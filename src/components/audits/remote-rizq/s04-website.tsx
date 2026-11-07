/* eslint-disable @next/next/no-img-element -- report screenshots are plain, fixed-size images */
export function WebsiteSection() {
  return (
    <>
    <section id="rr-website">
      <div className="eyebrow"><b>04</b>The website</div>
      <h2>The content sells. The page around it costs you trust.</h2>
      <p className="lead">Your copy is honest and your proof is specific, which is rare. The build underneath is a Lovable template, and it shows in ways a careful applicant will notice.</p>
      <div className="figs" style={{ alignItems: "start" }}>
        <figure><button className="shot" data-full="/audits/remote-rizq/apply-overlap.webp"><span className="bar-top"><i></i><i></i><i></i><span>remoterizq.co</span></span><img src="/audits/remote-rizq/apply-overlap.webp" alt="Sticky menu covering the application heading" loading="lazy" /></button><figcaption><b>The application section.</b> The sticky menu sits on top of &quot;Apply For Your Remote Income Seat&quot;, the one heading every applicant reads.</figcaption></figure>
        <figure><button className="shot" data-full="/audits/remote-rizq/guarantee.webp"><span className="bar-top"><i></i><i></i><i></i><span>remoterizq.co</span></span><img src="/audits/remote-rizq/guarantee.webp" alt="Guarantee and Trustpilot badge" loading="lazy" /></button><figcaption><b>Guarantee and reviews.</b> A strong guarantee, presented like a template card. The Trustpilot score is typed in by hand as 4.8, while Trustpilot itself now shows 4.7.</figcaption></figure>
        <figure><button className="shot" data-full="/audits/remote-rizq/testimonials.webp"><span className="bar-top"><i></i><i></i><i></i><span>remoterizq.co</span></span><img src="/audits/remote-rizq/testimonials.webp" alt="Written testimonials" loading="lazy" /></button><figcaption><b>Written testimonials.</b> Real and specific, but every brother gets the same gold initial instead of a face, and the brand is spelled &quot;Remote Rizq&quot; here and &quot;RemoteRizq&quot; everywhere else.</figcaption></figure>
        <figure><button className="shot" data-full="/audits/remote-rizq/mobile.webp" style={{ maxWidth: "340px", justifySelf: "center" }}><span className="bar-top"><i></i><i></i><i></i><span>remoterizq.co · phone</span></span><img src="/audits/remote-rizq/mobile.webp" alt="Mobile view with badge over the button" loading="lazy" /></button><figcaption><b>On a phone.</b> The &quot;Edit with Lovable&quot; badge stays in the corner of every screen and covers the Apply buttons as they scroll past.</figcaption></figure>
      </div>
      <div className="findings">
        <div className="finding"><span><span className="tag t-crit">Critical</span></span><div><h4>A builder badge on your sales page</h4><p>&quot;Edit with Lovable&quot; shows on every screen, and on phones it covers the Apply buttons as they scroll past. For a brother deciding whether this is legit, it&apos;s the first sign the page was put together quickly.</p></div></div>
        <div className="finding"><span><span className="tag t-high">High</span></span><div><h4>251 requests to open one page</h4><p>Opening the homepage made 251 requests in my test, and 233 of them went to the video player, because all 18 players load as soon as the page opens. That&apos;s a lot to ask of a phone on mobile data before a brother has pressed play on anything.</p></div></div>
        <div className="finding"><span><span className="tag t-high">High</span></span><div><h4>The wins wall works against itself</h4><p>The win videos play on mute, each behind the same yellow &quot;Your Video Is Playing&quot; overlay. Your best proof turns into noise, and the names and results get lost behind identical boxes.</p></div></div>
        <div className="finding"><span><span className="tag t-med">Medium</span></span><div><h4>A very long page on a phone</h4><p>On a phone the page is 11,504 pixels tall, about fourteen full screens, and 18 pieces of text are set smaller than 12px.</p></div></div>
        <div className="finding"><span><span className="tag t-med">Medium</span></span><div><h4>A template look</h4><p>Diagonal light rays, glow orbs and gold on navy are the default look of AI-built templates. To anyone who has seen a few, the page reads as made in an afternoon, which undersells a program with your results.</p></div></div>
      </div>
    </section>
    </>
  );
}
