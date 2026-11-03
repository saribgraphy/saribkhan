/* eslint-disable @next/next/no-img-element -- report screenshots are plain, fixed-size images */
export function BrandSection() {
  return (
    <>
    <section id="brand">
      <div className="eyebrow"><b>08</b>Brand and copy</div>
      <h2>You&apos;re using nine names, three logos and three different promises.</h2>
      <p className="lead">Each name probably made sense when it was created. Together they make a visitor work hard to understand who you are.</p>
      <div className="tablewrap">
        <table>
          <thead><tr><th>Name</th><th>Where it appears</th><th>What it promises</th></tr></thead>
          <tbody>
            <tr><td><b>Muslim CEO</b></td><td>Website, Skool, YouTube, X</td><td>Start a knowledge business and earn online</td></tr>
            <tr><td><b>Muslim Mastery</b></td><td>WordPress site, waitlist, diagnostic</td><td>Master your thoughts and break through to happiness</td></tr>
            <tr><td><b>Muslim CEO Show</b></td><td>YouTube playlist, website &quot;Stories&quot; link</td><td>Interviews with Muslim leaders</td></tr>
            <tr><td><b>Rich With Impact</b></td><td>Website, Skool</td><td>The flagship program</td></tr>
            <tr><td><b>Rizq With Impact</b></td><td>Instagram @rizqwithimpact</td><td>A second Instagram with 235 followers</td></tr>
            <tr><td><b>Believers Confidence Accelerator</b></td><td>Waitlist, diagnostic</td><td>A confidence coaching program</td></tr>
            <tr><td><b>The Fearless Muslim Bootcamp</b></td><td>YouTube bio</td><td>A bootcamp behind a dead link</td></tr>
            <tr><td><b>Dream Business Idea Bootcamp</b></td><td>Website, YouTube</td><td>The free training</td></tr>
            <tr><td><b>Growth Accelerator Program</b></td><td>Program page bonus</td><td>A £5,000 bonus</td></tr>
          </tbody>
        </table>
      </div>
      <div className="figs three">
        <figure><button className="shot" data-full="/audits/muslim-ceo/ig-rizq.webp"><span className="bar-top"><i></i><i></i><i></i><span>instagram.com/rizqwithimpact</span></span><img src="/audits/muslim-ceo/ig-rizq.webp" alt="Rizq With Impact Instagram" loading="lazy" /></button><figcaption><b>@rizqwithimpact.</b> A separate brand name with its own small audience.</figcaption></figure>
        <figure><button className="shot" data-full="/audits/muslim-ceo/reallygreatsite.webp"><span className="bar-top"><i></i><i></i><i></i><span>instagram.com/rizqwithimpact</span></span><img src="/audits/muslim-ceo/reallygreatsite.webp" alt="Post with Canva placeholder handle" loading="lazy" /></button><figcaption><b>A published post.</b> &quot;@reallygreatsite&quot; is Canva&apos;s default placeholder handle, never replaced with yours.</figcaption></figure>
        <figure><button className="shot" data-full="/audits/muslim-ceo/ig-muslimceo.webp"><span className="bar-top"><i></i><i></i><i></i><span>instagram.com/muslimceo</span></span><img src="/audits/muslim-ceo/ig-muslimceo.webp" alt="Muslim CEO Instagram branded as Mohammad Arshad" loading="lazy" /></button><figcaption><b>@muslimceo.</b> Your best handle, verified with 26.2K followers, is branded as Mohammad&apos;s confidence coaching.</figcaption></figure>
      </div>
      <div className="sub">
        <h3>Copy and detail errors I found</h3>
        <div className="tablewrap">
          <table>
            <thead><tr><th>Where</th><th>As published</th><th>Should be</th></tr></thead>
            <tbody>
              <tr><td>Terms of Service</td><td>&quot;owned and operated by [Muslim CEO]&quot;</td><td>Your legal company name, without brackets</td></tr>
              <tr><td>Program page</td><td>&quot;BONUS: *GROWTH ACCELERATOR PROGRAM*&quot;</td><td>The name without asterisks</td></tr>
              <tr><td>Program page</td><td>&quot;planning a vacation to rewind&quot;</td><td>&quot;to unwind&quot;</td></tr>
              <tr><td>Site footer</td><td>&quot;the life which have more Time, Income and Impact&quot;</td><td>&quot;a life with more time, income and impact&quot;</td></tr>
              <tr><td>Instagram post</td><td>&quot;@reallygreatsite&quot;</td><td>Your own handle</td></tr>
              <tr><td>X profile</td><td>@MuslimCE0, with a zero</td><td>One consistent handle across every platform</td></tr>
              <tr><td>Instagram graphics</td><td>@MuslimCEO_</td><td>An account that exists</td></tr>
              <tr><td>www homepage</td><td>&quot;Ripe for 2023&quot;</td><td>A current lead magnet</td></tr>
              <tr><td>Privacy policy</td><td>No effective date</td><td>A dated, current policy</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    </>
  );
}
