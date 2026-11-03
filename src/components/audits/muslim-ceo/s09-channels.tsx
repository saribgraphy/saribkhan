/* eslint-disable @next/next/no-img-element -- report screenshots are plain, fixed-size images */
export function ChannelsSection() {
  return (
    <>
    <section id="channels">
      <div className="eyebrow"><b>09</b>Channels</div>
      <h2>Your content is the strongest thing you have. It just isn&apos;t pointed anywhere.</h2>
      <div className="tablewrap">
        <table>
          <thead><tr><th>Channel</th><th>Audience</th><th>Activity</th><th>What I found</th></tr></thead>
          <tbody>
            <tr><td><b>YouTube</b> @MohammadArshad</td><td>31.9K subscribers</td><td>2,341 videos, weekly uploads</td><td>Strong, consistent thumbnails and real reach. Both bio links are broken.</td></tr>
            <tr><td><b>YouTube</b> @muslimceo1487</td><td>1.78K subscribers</td><td>21 videos, last upload 7 months ago with 19 views</td><td>No description and no links. The handle still carries auto-generated numbers.</td></tr>
            <tr><td><b>Instagram</b> @muslimceo</td><td>26.2K followers, verified</td><td>4,249 posts</td><td>Branded as Mohammad&apos;s confidence coaching, not Muslim CEO. The bio link works.</td></tr>
            <tr><td><b>Instagram</b> @rizqwithimpact</td><td>235 followers</td><td>44 posts</td><td>A separate brand name. One post still shows a Canva placeholder.</td></tr>
            <tr><td><b>X</b> @MuslimCE0</td><td>44 followers</td><td>715 posts since June 2024</td><td>A lot of effort for very little reach, under a handle spelled with a zero.</td></tr>
            <tr><td><b>LinkedIn</b> company page</td><td>Unknown</td><td>Unknown</td><td>The link you share is the admin address, so nobody else can open it.</td></tr>
            <tr><td><b>Skool</b> Muslim CEO</td><td>984 members</td><td>$67 a month, 6 admins</td><td>Your strongest commercial asset. The banner is the old website hero and the about page is generic.</td></tr>
          </tbody>
        </table>
      </div>
      <div className="figs">
        <figure><button className="shot" data-full="/audits/muslim-ceo/yt-arshad-videos.webp"><span className="bar-top"><i></i><i></i><i></i><span>youtube.com/@MohammadArshad</span></span><img src="/audits/muslim-ceo/yt-arshad-videos.webp" alt="Mohammad Arshad YouTube channel" loading="lazy" /></button><figcaption><b>Mohammad&apos;s channel.</b> This is the engine. It&apos;s active, consistent and clearly made with care.</figcaption></figure>
        <figure><button className="shot" data-full="/audits/muslim-ceo/yt-muslimceo.webp"><span className="bar-top"><i></i><i></i><i></i><span>youtube.com/@muslimceo1487</span></span><img src="/audits/muslim-ceo/yt-muslimceo.webp" alt="Muslim CEO YouTube channel" loading="lazy" /></button><figcaption><b>The Muslim CEO channel.</b> No description, no links and no recent uploads.</figcaption></figure>
        <figure><button className="shot" data-full="/audits/muslim-ceo/skool.webp"><span className="bar-top"><i></i><i></i><i></i><span>skool.com/muslimceo</span></span><img src="/audits/muslim-ceo/skool.webp" alt="Muslim CEO Skool community" loading="lazy" /></button><figcaption><b>Skool.</b> Close to a thousand paying members deserve a community that looks as good as the coaching inside it.</figcaption></figure>
        <figure><button className="shot" data-full="/audits/muslim-ceo/bootcamp-video.webp"><span className="bar-top"><i></i><i></i><i></i><span>youtube.com/watch</span></span><img src="/audits/muslim-ceo/bootcamp-video.webp" alt="Free bootcamp video" loading="lazy" /></button><figcaption><b>The free bootcamp.</b> A 32-minute slide recording from July 2024 with 2,289 views. It&apos;s your main lead magnet and it captures no leads.</figcaption></figure>
      </div>
      <div className="num" style={{ maxWidth: "520px" }}><b>Up to $65,928 a month</b><span>What 984 members at $67 would bring in, if every member paid full price. Every broken link above is a lead who never reached that door.</span></div>
    </section>
    </>
  );
}
