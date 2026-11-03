import { RoadmapChart } from "./roadmap-chart";

export function RoadmapSection() {
  return (
    <>
    <section id="roadmap">
      <div className="eyebrow"><b>12</b>12-week roadmap</div>
      <h2>The leaks are fixed in two weeks, and the new site goes live in week nine.</h2>
      <RoadmapChart />
      <div>
        <div className="phase"><div className="when"><i className="p1"></i>Weeks 1 to 2</div><div><h3>Stop the leaks</h3><ul><li>Fix both YouTube bio links and every link in the test log</li><li>Point www.muslimceo.com to the main site and remove ClickFunnels</li><li>Install analytics and the Meta pixel so we have a baseline from day one</li><li>Remove placeholders, correct typos and link the footer icons</li></ul><p className="out">By the end of week 2, every link your audience clicks goes somewhere real.</p></div></div>
        <div className="phase"><div className="when"><i className="p2"></i>Weeks 2 to 4</div><div><h3>Brand foundation</h3><ul><li>Agree the brand structure and retire names you no longer need</li><li>Refine the logo and build the colour, type and component system</li><li>Write the core message once, with honest promises that match the program</li><li>Map every domain, page and handle you&apos;ll keep</li></ul><p className="out">By week 4, you have one brand that every page and post can follow.</p></div></div>
        <div className="phase"><div className="when"><i className="p3"></i>Weeks 4 to 8</div><div><h3>Website and funnel</h3><ul><li>Design and build the new muslimceo.com with real, indexable pages</li><li>Set up the CMS and blog so your team can publish on their own</li><li>Build the lead magnet, email capture and application or booking flow</li><li>Build the program, stories, confirmation and pre-call pages</li><li>Move the diagnostic onto your own domain</li></ul><p className="out">By week 8, the new site and funnel are ready for review.</p></div></div>
        <div className="phase"><div className="when"><i className="p4"></i>Weeks 7 to 9</div><div><h3>Skool and channels</h3><ul><li>Redesign the Skool banner, about page and course covers</li><li>Build a simple onboarding path for new members</li><li>New channel art and description templates for both YouTube channels</li><li>Instagram highlight covers and a link page on your domain</li></ul><p className="out">By week 9, every channel looks like it belongs to the same company.</p></div></div>
        <div className="phase"><div className="when"><i className="p5"></i>Weeks 9 to 12</div><div><h3>Content, SEO and launch</h3><ul><li>Launch the new site with sitemap, metadata and structured data</li><li>Update the best Muslim Mastery articles and link them to your offer</li><li>Set up a review request for members who are getting results</li><li>Review the first month of real data and fix whatever is slowing people down</li></ul><p className="out">By week 12, you have a working system and real numbers to grow from.</p></div></div>
      </div>
    </section>
    </>
  );
}
