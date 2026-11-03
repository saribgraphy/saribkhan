 
export function MapSection() {
  return (
    <>
    <section id="map">
      <div className="eyebrow"><b>03</b>Where your traffic goes</div>
      <h2>Only one of your eleven routes works cleanly.</h2>
      <p className="lead">I followed every link from your channels and websites to wherever it actually lands. Three work but have problems, and seven are broken.</p>
      <div className="mapwrap">
        <svg viewBox="0 0 1000 660" role="img" aria-label="Map of where traffic from each channel lands">
          <text className="colh" x="20" y="20">WHERE PEOPLE FIND YOU</text>
          <text className="colh" x="740" y="20">WHERE THEY ACTUALLY LAND</text>
          &#123;/* edges */&#125;
          <path className="e crit" d="M260 102 C500 102 500 62 740 62"/>
          <path className="e crit" d="M260 102 C500 102 500 122 740 122"/>
          <path className="e high" d="M260 102 C500 102 500 182 740 182"/>
          <path className="e high" d="M260 212 C500 212 500 182 740 182"/>
          <path className="e crit" d="M260 322 C500 322 500 242 740 242"/>
          <path className="e crit" d="M260 322 C500 322 500 302 740 302"/>
          <path className="e crit" d="M260 322 C500 322 500 362 740 362"/>
          <path className="e ok"   d="M260 452 C500 452 500 422 740 422"/>
          <path className="e high" d="M260 452 C500 452 500 482 740 482"/>
          <path className="e crit" d="M260 452 C500 452 500 542 740 542"/>
          <path className="e crit" d="M260 582 C500 582 500 602 740 602"/>
          &#123;/* left nodes */&#125;
          <g><rect className="nbox" x="20" y="78" width="240" height="48" rx="8"/><text className="nt" x="34" y="98">YouTube @MohammadArshad</text><text className="ns" x="34" y="116">31.9K subscribers · bio links</text></g>
          <g><rect className="nbox" x="20" y="188" width="240" height="48" rx="8"/><text className="nt" x="34" y="208">Instagram @muslimceo</text><text className="ns" x="34" y="226">26.2K followers · bio link</text></g>
          <g><rect className="nbox" x="20" y="298" width="240" height="48" rx="8"/><text className="nt" x="34" y="318">YouTube @muslimceo1487</text><text className="ns" x="34" y="336">Free bootcamp description</text></g>
          <g><rect className="nbox" x="20" y="428" width="240" height="48" rx="8"/><text className="nt" x="34" y="448">muslimceo.com</text><text className="ns" x="34" y="466">Navigation and footer</text></g>
          <g><rect className="nbox" x="20" y="558" width="240" height="48" rx="8"/><text className="nt" x="34" y="578">Google and other search</text><text className="ns" x="34" y="596">Crawling your domain</text></g>
          &#123;/* right nodes */&#125;
          <g><rect className="nbox" x="740" y="38" width="240" height="48" rx="8"/><circle className="dot crit" cx="740" cy="62" r="5"/><text className="nt" x="754" y="58">muslimmastery.com/confidence</text><text className="ns" x="754" y="76">Blank white page</text></g>
          <g><rect className="nbox" x="740" y="98" width="240" height="48" rx="8"/><circle className="dot crit" cx="740" cy="122" r="5"/><text className="nt" x="754" y="118">m.muslimmastery.com</text><text className="ns" x="754" y="136">Address doesn&apos;t exist</text></g>
          <g><rect className="nbox" x="740" y="158" width="240" height="48" rx="8"/><circle className="dot high" cx="740" cy="182" r="5"/><text className="nt" x="754" y="178">muslimdiagnostic.lovable.app</text><text className="ns" x="754" y="196">Works, third-party domain</text></g>
          <g><rect className="nbox" x="740" y="218" width="240" height="48" rx="8"/><circle className="dot crit" cx="740" cy="242" r="5"/><text className="nt" x="754" y="238">www.muslimceo.com/recipevsl</text><text className="ns" x="754" y="256">Paused, video removed</text></g>
          <g><rect className="nbox" x="740" y="278" width="240" height="48" rx="8"/><circle className="dot crit" cx="740" cy="302" r="5"/><text className="nt" x="754" y="298">clickfunnels.com</text><text className="ns" x="754" y="316">Not your website</text></g>
          <g><rect className="nbox" x="740" y="338" width="240" height="48" rx="8"/><circle className="dot crit" cx="740" cy="362" r="5"/><text className="nt" x="754" y="358">LinkedIn company admin</text><text className="ns" x="754" y="376">&quot;You don&apos;t have access&quot;</text></g>
          <g><rect className="nbox" x="740" y="398" width="240" height="48" rx="8"/><circle className="dot ok" cx="740" cy="422" r="5"/><text className="nt" x="754" y="418">skool.com/muslimceo</text><text className="ns" x="754" y="436">Works · $67 a month</text></g>
          <g><rect className="nbox" x="740" y="458" width="240" height="48" rx="8"/><circle className="dot high" cx="740" cy="482" r="5"/><text className="nt" x="754" y="478">&quot;Stories&quot; playlist</text><text className="ns" x="754" y="496">Podcast from 6 years ago</text></g>
          <g><rect className="nbox" x="740" y="518" width="240" height="48" rx="8"/><circle className="dot crit" cx="740" cy="542" r="5"/><text className="nt" x="754" y="538">Footer social icons</text><text className="ns" x="754" y="556">Linked to nothing</text></g>
          <g><rect className="nbox" x="740" y="578" width="240" height="48" rx="8"/><circle className="dot crit" cx="740" cy="602" r="5"/><text className="nt" x="754" y="598">www.muslimceo.com sitemap</text><text className="ns" x="754" y="616">Lists 28 ClickFunnels pages</text></g>
        </svg>
      </div>
      <div className="legend"><span className="tag t-crit">Broken</span><span className="tag t-high">Works with problems</span><span className="tag t-ok">Works</span><span>Each line is a link I clicked or a page I fetched on 3 November 2026.</span></div>
    </section>
    </>
  );
}
