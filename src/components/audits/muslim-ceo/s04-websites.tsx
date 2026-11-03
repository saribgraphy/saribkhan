/* eslint-disable @next/next/no-img-element -- report screenshots are plain, fixed-size images */
export function WebsitesSection() {
  return (
    <>
    <section id="websites">
      <div className="eyebrow"><b>04</b>Websites</div>
      <h2>You have four websites on four platforms, and none of them talk to each other.</h2>
      <p className="lead">You have a new custom site, an old ClickFunnels site on the same domain, a WordPress site for Muslim Mastery and a quiz on Lovable. Here&apos;s each one.</p>
    
      <div className="sub">
        <div className="subhead"><h3>muslimceo.com</h3><span className="mono">React app · Tailwind development CDN · live</span></div>
        <p className="prose">This is your newest site, and it looks cleaner than the old one. Underneath, though, it&apos;s built the way you&apos;d build a quick prototype, and that has real costs for search and tracking.</p>
        <div className="figs">
          <figure><button className="shot" data-full="/audits/muslim-ceo/home-hero.webp"><span className="bar-top"><i></i><i></i><i></i><span>muslimceo.com</span></span><img src="/audits/muslim-ceo/home-hero.webp" alt="Muslim CEO homepage hero" loading="lazy" /></button><figcaption><b>Homepage.</b> The paragraph on the left is justified, which leaves uneven gaps between words, and there&apos;s a large empty band under the headline.</figcaption></figure>
          <figure><button className="shot" data-full="/audits/muslim-ceo/home-quote.webp"><span className="bar-top"><i></i><i></i><i></i><span>muslimceo.com</span></span><img src="/audits/muslim-ceo/home-quote.webp" alt="Homepage quote with overlapping lines" loading="lazy" /></button><figcaption><b>Quote block.</b> The line height is so tight that the lines run into each other.</figcaption></figure>
          <figure><button className="shot" data-full="/audits/muslim-ceo/home-trusted.webp"><span className="bar-top"><i></i><i></i><i></i><span>muslimceo.com</span></span><img src="/audits/muslim-ceo/home-trusted.webp" alt="Trusted by logos" loading="lazy" /></button><figcaption><b>&quot;Trusted by&quot;.</b> Your strongest proof is faded to light grey, shown at low resolution, and every logo is labelled &quot;Partner Logo&quot;.</figcaption></figure>
          <figure><button className="shot" data-full="/audits/muslim-ceo/contact.webp"><span className="bar-top"><i></i><i></i><i></i><span>muslimceo.com/#/contact</span></span><img src="/audits/muslim-ceo/contact.webp" alt="Contact page" loading="lazy" /></button><figcaption><b>Contact page.</b> There&apos;s no form and no way to capture a lead. Half the screen is a faded logo.</figcaption></figure>
        </div>
        <div className="findings">
          <div className="finding"><span><span className="tag t-crit">Critical</span></span><div><h4>Search engines see an empty page</h4><p>The HTML that loads is 1.6 KB and contains only an empty <code>&lt;div id=&quot;root&quot;&gt;</code>. Every word appears later through JavaScript, so most crawlers and every link preview see nothing.</p></div></div>
          <div className="finding"><span><span className="tag t-crit">Critical</span></span><div><h4>The whole site is one page to Google</h4><p>Every page sits behind a <code>#/</code> address, like <code>muslimceo.com/#/about</code>. Search engines treat everything after the <code>#</code> as the same homepage, so About, Program and Contact can&apos;t rank on their own.</p></div></div>
          <div className="finding"><span><span className="tag t-high">High</span></span><div><h4>Nothing is being measured</h4><p>There&apos;s no Google Analytics, no Meta pixel and no tag manager on the site. You can&apos;t see how many people visit, where they come from or where they drop off, and any ads you run can&apos;t learn who converts.</p></div></div>
          <div className="finding"><span><span className="tag t-high">High</span></span><div><h4>Shared links show up blank</h4><p>There&apos;s no meta description, no social preview image and no favicon. When someone shares your site on WhatsApp or social media, it shows a bare link with no picture and no description.</p></div></div>
          <div className="finding"><span><span className="tag t-high">High</span></span><div><h4>Every address says it exists</h4><p>robots.txt, sitemap.xml and made-up addresses like <code>/404test-xyz</code> all return &quot;200 OK&quot; with the homepage. There&apos;s no real 404 page, no robots file and no sitemap.</p></div></div>
          <div className="finding"><span><span className="tag t-med">Medium</span></span><div><h4>Built on parts that can change by themselves</h4><p>The site loads Tailwind&apos;s development CDN, which Tailwind says isn&apos;t meant for production, and pulls React from a third-party CDN at a floating version (<code>^19.2.3</code>). The site can slow down or break without anyone touching it.</p></div></div>
          <div className="finding"><span><span className="tag t-med">Medium</span></span><div><h4>One title for every page</h4><p>Every page keeps the title &quot;Muslim CEO - Increase Your Income. Achieve Freedom.&quot;, including the privacy policy.</p></div></div>
          <div className="finding"><span><span className="tag t-med">Medium</span></span><div><h4>Leftover placeholders</h4><p>The Terms of Service says the site is owned by &quot;[Muslim CEO]&quot;, still in its template brackets. The privacy policy has no effective date.</p></div></div>
        </div>
      </div>
    
      <div className="sub">
        <div className="subhead"><h3>www.muslimceo.com</h3><span className="mono">ClickFunnels · account paused · live</span></div>
        <p className="prose">Add &quot;www&quot; to the same address and you get a completely different, older website. Every page is covered by a ClickFunnels banner asking the owner to unpause the account.</p>
        <div className="figs">
          <figure><button className="shot" data-full="/audits/muslim-ceo/www-clickfunnels-wall.webp"><span className="bar-top"><i></i><i></i><i></i><span>www.muslimceo.com/home57471422</span></span><img src="/audits/muslim-ceo/www-clickfunnels-wall.webp" alt="ClickFunnels paused account overlay on the www homepage" loading="lazy" /></button><figcaption><b>The www homepage.</b> It redirects to <code>/home57471422</code> and is blocked by the &quot;Unpause your account&quot; overlay. Underneath, it still offers &quot;5 Halal Side Income Ideas Ripe for 2023&quot;.</figcaption></figure>
          <figure><button className="shot" data-full="/audits/muslim-ceo/recipevsl.webp"><span className="bar-top"><i></i><i></i><i></i><span>www.muslimceo.com/thank-you1717672798687</span></span><img src="/audits/muslim-ceo/recipevsl.webp" alt="Paused offer page with unavailable video" loading="lazy" /></button><figcaption><b>The £1 offer.</b> Linked from your free bootcamp video. It lands on a thank-you page instead of the offer, the overlay covers it, and the sales video says &quot;This video isn&apos;t available&quot;.</figcaption></figure>
        </div>
        <div className="findings">
          <div className="finding"><span><span className="tag t-crit">Critical</span></span><div><h4>Your traffic is sent to ClickFunnels</h4><p><code>www.muslimceo.com/escape9to52</code>, linked from your bootcamp video, redirects to the ClickFunnels homepage. People who wanted your offer end up on theirs.</p></div></div>
          <div className="finding"><span><span className="tag t-crit">Critical</span></span><div><h4>Search engines are given ClickFunnels&apos; sitemap</h4><p>robots.txt points to <code>clickfunnels.com/sitemap.xml</code>, and your own sitemap lists 28 addresses. All 28 are ClickFunnels marketing pages. Not one of them is yours.</p></div></div>
          <div className="finding"><span><span className="tag t-high">High</span></span><div><h4>Two versions of you on one domain</h4><p>muslimceo.com and www.muslimceo.com show different designs, different copy and different offers. Google sees duplicate, conflicting content and has to guess which one is real.</p></div></div>
        </div>
      </div>
    
      <div className="sub">
        <div className="subhead"><h3>muslimmastery.com</h3><span className="mono">WordPress · 470 posts · last updated October 2022</span></div>
        <p className="prose">This is Mohammad&apos;s coaching brand, and it holds one of your biggest hidden assets: 470 articles published since 2014. The newest of them was last updated in October 2022, so the library has been sitting idle for four years.</p>
        <div className="figs three">
          <figure><button className="shot" data-full="/audits/muslim-ceo/mastery-home.webp"><span className="bar-top"><i></i><i></i><i></i><span>muslimmastery.com</span></span><img src="/audits/muslim-ceo/mastery-home.webp" alt="Muslim Mastery homepage" loading="lazy" /></button><figcaption><b>Homepage.</b> The hero is a stock photo of a mountain lake, with no Muslim, no Mohammad and no student in sight.</figcaption></figure>
          <figure><button className="shot" data-full="/audits/muslim-ceo/mastery-arshad.webp"><span className="bar-top"><i></i><i></i><i></i><span>muslimmastery.com/mohammad-arshad</span></span><img src="/audits/muslim-ceo/mastery-arshad.webp" alt="Mohammad Arshad page with invisible navigation" loading="lazy" /></button><figcaption><b>Mohammad&apos;s page.</b> The navigation is white text on a white header, so it&apos;s almost invisible.</figcaption></figure>
          <figure><div className="shot dead" aria-label="Blank white page"><div><strong>Blank white page</strong><small>muslimmastery.com/confidence</small><small>Where YouTube&apos;s &quot;FREE Transformational Training&quot; link lands</small></div></div><figcaption><b>The free training.</b> Your main YouTube link redirects here. The server returns a page with nothing in it at all.</figcaption></figure>
        </div>
        <div className="findings">
          <div className="finding"><span><span className="tag t-crit">Critical</span></span><div><h4>The paid bootcamp link points to a missing address</h4><p><code>muslimmastery.com/fearless</code> redirects to <code>m.muslimmastery.com</code>, which doesn&apos;t exist. Browsers show &quot;This site can&apos;t be reached&quot;.</p></div></div>
          <div className="finding"><span><span className="tag t-med">Medium</span></span><div><h4>Navigation sends people to the wrong places</h4><p>&quot;About Us&quot; goes back to the homepage. &quot;Blog&quot; opens the videos category. Both &quot;Learn more&quot; buttons under Upcoming Events open a generic Get Started page, and neither event shows a date.</p></div></div>
        </div>
      </div>
    
      <div className="sub">
        <div className="subhead"><h3>The satellite pages</h3><span className="mono">Lovable · Kit · YouTube unlisted</span></div>
        <div className="figs">
          <figure><button className="shot" data-full="/audits/muslim-ceo/diagnostic-lovable.webp"><span className="bar-top"><i></i><i></i><i></i><span>muslimdiagnostic.lovable.app</span></span><img src="/audits/muslim-ceo/diagnostic-lovable.webp" alt="Confidence diagnostic on Lovable" loading="lazy" /></button><figcaption><b>The confidence diagnostic.</b> It works, but it lives on Lovable&apos;s domain with the &quot;Edit with Lovable&quot; badge showing. It claims a &quot;5.0 Rating&quot; and &quot;tens of thousands&quot; of users with no source, and its page title introduces another brand, &quot;Believers Confidence&quot;.</figcaption></figure>
          <figure><button className="shot" data-full="/audits/muslim-ceo/bca-waitlist.webp"><span className="bar-top"><i></i><i></i><i></i><span>muslimmastery.com/bca-waitlist</span></span><img src="/audits/muslim-ceo/bca-waitlist.webp" alt="Believers Confidence Accelerator waitlist" loading="lazy" /></button><figcaption><b>The waitlist.</b> This is the only email capture I found across every property. Getting here takes two hops through an unlisted video, and it uses a third version of the Muslim Mastery logo.</figcaption></figure>
        </div>
      </div>
    </section>
    </>
  );
}
