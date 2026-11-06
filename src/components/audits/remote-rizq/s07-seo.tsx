export function SeoSection() {
  return (
    <>
    <section id="rr-seo">
      <div className="eyebrow"><b>07</b>Tracking and SEO</div>
      <h2>You have the basics in place, but almost no data.</h2>
      <div className="tablewrap">
        <table>
          <thead><tr><th>Check on remoterizq.co</th><th>Result</th><th>What it means</th></tr></thead>
          <tbody>
            <tr><td>Meta pixel and Conversions API</td><td><span className="tag t-crit">Fail</span></td><td>No way to retarget visitors or tell Meta who applied.</td></tr>
            <tr><td>Google Analytics or tag manager</td><td><span className="tag t-crit">Fail</span></td><td>No visit, source or drop-off data.</td></tr>
            <tr><td>Microsoft Clarity</td><td><span className="tag t-ok">Pass</span></td><td>Session recordings are running, which is a good start.</td></tr>
            <tr><td>Content in the HTML</td><td><span className="tag t-crit">Fail</span></td><td>The page loads with an empty root. Every word appears through JavaScript.</td></tr>
            <tr><td>Real 404 page</td><td><span className="tag t-crit">Fail</span></td><td>Made-up addresses like /404test-xyz return &quot;200 OK&quot; with the homepage.</td></tr>
            <tr><td>Social preview image</td><td><span className="tag t-med">Partial</span></td><td>Shared links show a screenshot taken by Lovable&apos;s editor, not a designed image.</td></tr>
            <tr><td>Favicon</td><td><span className="tag t-med">Partial</span></td><td>Loaded from a Lovable storage bucket rather than your own domain.</td></tr>
            <tr><td>Image alt text</td><td><span className="tag t-crit">Fail</span></td><td>16 of 18 images have none.</td></tr>
            <tr><td>Title, description and canonical</td><td><span className="tag t-ok">Pass</span></td><td>All set, and well written.</td></tr>
            <tr><td>robots.txt and sitemap.xml</td><td><span className="tag t-ok">Pass</span></td><td>Both exist and are valid.</td></tr>
            <tr><td>Load time</td><td><span className="tag t-crit">Fail</span></td><td>About 1.0 s to first byte and 9.0 s to fully load in my test.</td></tr>
            <tr><td>Brand search</td><td><span className="tag t-crit">Fail</span></td><td>A search for Aqib and Remote Rizq returned none of your pages.</td></tr>
          </tbody>
        </table>
      </div>
    </section>
    </>
  );
}
