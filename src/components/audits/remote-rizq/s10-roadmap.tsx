import { RoadmapChart } from "../roadmap-chart";

const PHASES = [
  { label: "Quick wins", weeks: "W1–2", start: 1, span: 2, tone: "p1" },
  { label: "Brand foundation", weeks: "W2–4", start: 2, span: 3, tone: "p2" },
  { label: "Site and application", weeks: "W4–8", start: 4, span: 5, tone: "p3" },
  { label: "Skool and channels", weeks: "W7–9", start: 7, span: 3, tone: "p4" },
  { label: "Launch and optimise", weeks: "W9–12", start: 9, span: 4, tone: "p5" },
  { label: "Support and weekly reporting", weeks: "W1–12", start: 1, span: 12, tone: "p6" },
];

export function RoadmapSection() {
  return (
    <>
    <section id="rr-roadmap">
      <div className="eyebrow"><b>10</b>12-week roadmap</div>
      <h2>Quick wins in two weeks, and the new funnel goes live in week nine.</h2>
      <RoadmapChart phases={PHASES} />
      <div>
        <div className="phase"><div className="when"><i className="p1"></i>Weeks 1 to 2</div><div><h3>Quick wins</h3><ul><li>Remove the builder badge and fix the sticky menu</li><li>Install the pixel, Conversions API and analytics, so we have a baseline from week one</li><li>Swap the typed rating for a live Trustpilot widget</li><li>Fix the conflicting timelines and hours</li></ul><p className="out">By the end of week 2, nothing on the page gives a brother a reason to doubt it, and every visit is measured.</p></div></div>
        <div className="phase"><div className="when"><i className="p2"></i>Weeks 2 to 4</div><div><h3>Brand foundation</h3><ul><li>Agree the brand structure for free and Elite</li><li>Refine the logo and build the colour, type and component system</li><li>Write the core message once, so every page and post says the same thing</li></ul><p className="out">By week 4, the free community and the paid program look like one company.</p></div></div>
        <div className="phase"><div className="when"><i className="p3"></i>Weeks 4 to 8</div><div><h3>Site and application</h3><ul><li>Design and build the new site with a fast, tap-to-play wins section</li><li>Build the step-by-step application with partial lead capture</li><li>Build the confirmation and pre-call pages</li><li>Connect everything to your CRM and calendar</li></ul><p className="out">By week 8, the new funnel is ready for your review.</p></div></div>
        <div className="phase"><div className="when"><i className="p4"></i>Weeks 7 to 9</div><div><h3>Skool and channels</h3><ul><li>Redesign the Skool banner, about page and onboarding</li><li>Design the route from the free community into Elite</li><li>Highlight covers, templates and a plan for the brand handle</li></ul><p className="out">By week 9, every channel points brothers down the same path.</p></div></div>
        <div className="phase"><div className="when"><i className="p5"></i>Weeks 9 to 12</div><div><h3>Launch and optimise</h3><ul><li>Launch the new site and application</li><li>Set up a review request for brothers who land a role</li><li>Review the first month of real data and fix where applications drop</li></ul><p className="out">By week 12, you know your numbers and the funnel is built to grow from them.</p></div></div>
      </div>
    </section>
    </>
  );
}
