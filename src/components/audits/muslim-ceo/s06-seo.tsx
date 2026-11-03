 
export function SeoSection() {
  return (
    <>
    <section id="seo">
      <div className="eyebrow"><b>06</b>SEO and tracking</div>
      <h2>Search engines can barely see you, and you can&apos;t see your visitors.</h2>
      <p className="lead">When I searched for your own program by name, none of the top 15 results were Muslim CEO pages. The checklist below explains why.</p>
      <div className="tablewrap">
        <table>
          <thead><tr><th>Check on muslimceo.com</th><th>Result</th><th>What it means</th></tr></thead>
          <tbody>
            <tr><td>Content in the HTML</td><td><span className="tag t-crit">Fail</span></td><td>1.6 KB page with an empty root. Words only appear after JavaScript runs.</td></tr>
            <tr><td>Separate page addresses</td><td><span className="tag t-crit">Fail</span></td><td>Every page uses <code>#/</code>, so search engines only ever see the homepage.</td></tr>
            <tr><td>Unique page titles</td><td><span className="tag t-crit">Fail</span></td><td>The same title on every page.</td></tr>
            <tr><td>Meta description</td><td><span className="tag t-crit">Fail</span></td><td>None, so Google writes its own snippet.</td></tr>
            <tr><td>Social preview image and title</td><td><span className="tag t-crit">Fail</span></td><td>No Open Graph tags. Shared links show no image.</td></tr>
            <tr><td>Favicon</td><td><span className="tag t-crit">Fail</span></td><td>The browser tab shows a blank icon.</td></tr>
            <tr><td>robots.txt and sitemap.xml</td><td><span className="tag t-crit">Fail</span></td><td>Both return the homepage HTML instead of real files.</td></tr>
            <tr><td>Real 404 page</td><td><span className="tag t-crit">Fail</span></td><td>Any made-up address returns &quot;200 OK&quot;.</td></tr>
            <tr><td>Structured data</td><td><span className="tag t-crit">Fail</span></td><td>No schema for your organisation, founders, courses or reviews.</td></tr>
            <tr><td>Analytics, pixel or tag manager</td><td><span className="tag t-crit">Fail</span></td><td>None installed. No visit or conversion data exists.</td></tr>
            <tr><td>Canonical address</td><td><span className="tag t-crit">Fail</span></td><td>None set, while the www version shows a different site.</td></tr>
            <tr><td>HTTPS</td><td><span className="tag t-ok">Pass</span></td><td>Secure connection on both versions.</td></tr>
            <tr><td>Mobile viewport</td><td><span className="tag t-ok">Pass</span></td><td>The page is set up to scale on phones.</td></tr>
            <tr><td>Image alt text</td><td><span className="tag t-med">Partial</span></td><td>All 12 homepage images have alt text, but logos just say &quot;Partner Logo&quot;.</td></tr>
            <tr><td>Load time</td><td><span className="tag t-ok">Pass</span></td><td>About 0.7 s to first byte and 2.1 s to fully load on my connection.</td></tr>
          </tbody>
        </table>
      </div>
      <div className="prose">
        <p><strong>The good news is in Muslim Mastery.</strong> Its WordPress sitemap works and its 470 articles are already indexable. With a little updating and internal linking to Muslim CEO, that library could start sending search traffic to your offer instead of sitting still.</p>
      </div>
    </section>
    </>
  );
}
