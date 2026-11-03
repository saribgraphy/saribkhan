/* eslint-disable @next/next/no-img-element -- report screenshots are plain, fixed-size images */
export function LinksSection() {
  return (
    <>
    <section id="links">
      <div className="eyebrow"><b>05</b>Link test log</div>
      <h2>I tested eighteen links, and nine of them are broken.</h2>
      <p className="lead">These are the links your audience is actually shown, from bios, descriptions, navigation and graphics. I clicked each one in a normal browser.</p>
      <div className="tablewrap">
        <table>
          <thead><tr><th>#</th><th>Where it appears</th><th>Link</th><th>What happens</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td className="n">01</td><td>YouTube bio, &quot;FREE Transformational Training&quot;</td><td><span className="mono">muslimmastery.com/youtube</span></td><td>Redirects to /confidence, a blank white page</td><td><span className="tag t-crit">Broken</span></td></tr>
            <tr><td className="n">02</td><td>YouTube bio, &quot;The Fearless Muslim Bootcamp&quot;</td><td><span className="mono">muslimmastery.com/fearless</span></td><td>Redirects to m.muslimmastery.com, which doesn&apos;t exist</td><td><span className="tag t-crit">Broken</span></td></tr>
            <tr><td className="n">03</td><td>Bootcamp video, &quot;Just £1&quot; offer</td><td><span className="mono">www.muslimceo.com/recipevsl</span></td><td>Thank-you page, paused overlay, video unavailable</td><td><span className="tag t-crit">Broken</span></td></tr>
            <tr><td className="n">04</td><td>Bootcamp video description</td><td><span className="mono">www.muslimceo.com/escape9to52</span></td><td>Redirects to the ClickFunnels homepage</td><td><span className="tag t-crit">Broken</span></td></tr>
            <tr><td className="n">05</td><td>Bootcamp video, LinkedIn</td><td><span className="mono">linkedin.com/company/19157320/admin/…</span></td><td>&quot;You don&apos;t have access to this page&quot;</td><td><span className="tag t-crit">Broken</span></td></tr>
            <tr><td className="n">06</td><td>Printed on Instagram graphics</td><td><span className="mono">@MuslimCEO_ on X</span></td><td>&quot;This account doesn&apos;t exist&quot;</td><td><span className="tag t-crit">Broken</span></td></tr>
            <tr><td className="n">07</td><td>muslimceo.com footer</td><td><span className="mono">Facebook, Instagram, YouTube icons</span></td><td>The icons aren&apos;t linked to anything</td><td><span className="tag t-crit">Broken</span></td></tr>
            <tr><td className="n">08</td><td>Any visit with &quot;www&quot;</td><td><span className="mono">www.muslimceo.com</span></td><td>ClickFunnels &quot;Unpause your account&quot; overlay on every page</td><td><span className="tag t-crit">Broken</span></td></tr>
            <tr><td className="n">09</td><td>Search engines</td><td><span className="mono">www.muslimceo.com/sitemap.xml</span></td><td>Lists 28 ClickFunnels pages and none of yours</td><td><span className="tag t-crit">Broken</span></td></tr>
            <tr><td className="n">10</td><td>muslimceo.com navigation, &quot;Stories&quot;</td><td><span className="mono">YouTube playlist</span></td><td>Opens Muslim CEO Show interviews from 6 to 7 years ago, with one video unavailable</td><td><span className="tag t-high">Misleading</span></td></tr>
            <tr><td className="n">11</td><td>Muslim Mastery navigation, &quot;About Us&quot;</td><td><span className="mono">muslimmastery.com/</span></td><td>Goes back to the homepage</td><td><span className="tag t-high">Misleading</span></td></tr>
            <tr><td className="n">12</td><td>Muslim Mastery navigation, &quot;Blog&quot;</td><td><span className="mono">/category/videos/</span></td><td>Opens the videos category instead</td><td><span className="tag t-high">Misleading</span></td></tr>
            <tr><td className="n">13</td><td>Muslim Mastery events, &quot;Learn more&quot; (two buttons)</td><td><span className="mono">/get-started/</span></td><td>A generic page with nothing about either event</td><td><span className="tag t-high">Misleading</span></td></tr>
            <tr><td className="n">14</td><td>Latest YouTube video description</td><td><span className="mono">muslimmastery.com/differences</span></td><td>An unlisted video from 10 months ago, which then links to a waitlist</td><td><span className="tag t-high">Detour</span></td></tr>
            <tr><td className="n">15</td><td>YouTube description and Instagram bio</td><td><span className="mono">/difference and /profile</span></td><td>The diagnostic on a Lovable domain</td><td><span className="tag t-med">Off-brand</span></td></tr>
            <tr><td className="n">16</td><td>muslimceo.com &quot;Watch now&quot;</td><td><span className="mono">YouTube bootcamp video</span></td><td>Plays, but no email is captured, so every viewer stays anonymous</td><td><span className="tag t-med">Leaks leads</span></td></tr>
            <tr><td className="n">17</td><td>muslimceo.com &quot;Join now&quot; (four buttons)</td><td><span className="mono">skool.com/muslimceo</span></td><td>Opens the Skool community</td><td><span className="tag t-ok">Works</span></td></tr>
            <tr><td className="n">18</td><td>Waitlist form</td><td><span className="mono">Kit form on /bca-waitlist</span></td><td>Form loads and accepts sign-ups</td><td><span className="tag t-ok">Works</span></td></tr>
          </tbody>
        </table>
      </div>
      <div className="figs three">
        <figure><button className="shot" data-full="/audits/muslim-ceo/clickfunnels-redirect.webp"><span className="bar-top"><i></i><i></i><i></i><span>clickfunnels.com</span></span><img src="/audits/muslim-ceo/clickfunnels-redirect.webp" alt="ClickFunnels homepage reached from a Muslim CEO link" loading="lazy" /></button><figcaption><b>Link 04.</b> Where your &quot;escape 9 to 5&quot; link takes people.</figcaption></figure>
        <figure><button className="shot" data-full="/audits/muslim-ceo/linkedin-noaccess.webp"><span className="bar-top"><i></i><i></i><i></i><span>linkedin.com/company/no-access</span></span><img src="/audits/muslim-ceo/linkedin-noaccess.webp" alt="LinkedIn no access page" loading="lazy" /></button><figcaption><b>Link 05.</b> The admin address was shared instead of the public page.</figcaption></figure>
        <figure><button className="shot" data-full="/audits/muslim-ceo/stories-playlist.webp"><span className="bar-top"><i></i><i></i><i></i><span>youtube.com/playlist</span></span><img src="/audits/muslim-ceo/stories-playlist.webp" alt="Muslim CEO Show playlist" loading="lazy" /></button><figcaption><b>Link 10.</b> &quot;Stories&quot; suggests student results. It opens old podcast interviews.</figcaption></figure>
      </div>
    </section>
    </>
  );
}
