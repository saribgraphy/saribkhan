export function ChannelsSection() {
  return (
    <>
    <section id="rr-channels">
      <div className="eyebrow"><b>08</b>Channels and reviews</div>
      <h2>Your reputation is excellent. Your channels don&apos;t carry it yet.</h2>
      <div className="tablewrap">
        <table>
          <thead><tr><th>Channel</th><th>Audience</th><th>What I found</th></tr></thead>
          <tbody>
            <tr><td><b>Trustpilot</b></td><td>4.7 from 60 reviews</td><td>97% five stars and every negative review answered. Trustpilot notes you haven&apos;t invited reviews recently, so all of them came in unprompted. Asking every brother who lands a role would grow this quickly.</td></tr>
            <tr><td><b>Instagram</b> @saleswithaqib</td><td>1,962 followers, verified</td><td>Strong whiteboard content and clear highlights. The bio sends people to the application or to a &quot;SKILL&quot; DM, and never mentions the free community.</td></tr>
            <tr><td><b>Instagram</b> @remoterizq</td><td>Unavailable</td><td>The brand handle shows &quot;Profile isn&apos;t available&quot;, so the company has no account under its own name.</td></tr>
            <tr><td><b>Skool</b> RemoteRizq</td><td>2K members, free</td><td>Your largest warm audience, with its own logo and its own promise.</td></tr>
            <tr><td><b>YouTube</b> Aqib Abdul Kareem</td><td>16.3K views on the full course</td><td>A 7-hour appointment setting course with real reach. The channel isn&apos;t linked from the website or your Instagram bio, and the 17 student win videos on the homepage aren&apos;t on it.</td></tr>
          </tbody>
        </table>
      </div>
      <div className="dist" aria-label="Trustpilot rating distribution">
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "8px" }}><span className="big">4.7</span><span className="note">Trustpilot average from 60 reviews</span></div>
        <div className="drow"><span>5 stars</span><div className="bar"><i style={{ width: "97%", background: "var(--ok)" }}></i></div><b>97%</b></div>
        <div className="drow"><span>4 stars</span><div className="bar"><i style={{ width: "0%", background: "var(--ok)" }}></i></div><b>0%</b></div>
        <div className="drow"><span>3 stars</span><div className="bar"><i style={{ width: "0%", background: "var(--med)" }}></i></div><b>0%</b></div>
        <div className="drow"><span>2 stars</span><div className="bar"><i style={{ width: "0%", background: "var(--high)" }}></i></div><b>0%</b></div>
        <div className="drow"><span>1 star</span><div className="bar"><i style={{ width: "3%", background: "var(--crit)" }}></i></div><b>3%</b></div>
        <p className="note">This is the kind of rating most coaching programs never reach. It deserves to be the first thing a brother sees, live and verified, not a number typed into a template.</p>
      </div>
    </section>
    </>
  );
}
