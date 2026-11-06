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
            <tr><td><b>Trustpilot</b></td><td>4.7 from 56 reviews</td><td>96% five stars and every negative review answered. The newest review is from 15 August, and Trustpilot notes you don&apos;t invite reviews, so the happiest brothers from the last three months haven&apos;t been asked.</td></tr>
            <tr><td><b>Instagram</b> @saleswithaqib</td><td>1,960 followers, verified</td><td>Strong whiteboard content and clear highlights. The bio skips the free community and goes straight to the application.</td></tr>
            <tr><td><b>Instagram</b> @remoterizq</td><td>Unavailable</td><td>The brand handle shows &quot;Profile isn&apos;t available&quot;, so the company has no account under its own name.</td></tr>
            <tr><td><b>Skool</b> RemoteRizq</td><td>2K members, free</td><td>Your largest warm audience, with its own logo and its own promise.</td></tr>
            <tr><td><b>Video</b></td><td>18 video wins</td><td>I didn&apos;t find a YouTube channel for Remote Rizq, even though the homepage holds 18 student stories that would make strong content.</td></tr>
          </tbody>
        </table>
      </div>
      <div className="dist" aria-label="Trustpilot rating distribution">
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", marginBottom: "8px" }}><span className="big">4.7</span><span className="note">Trustpilot average from 56 reviews</span></div>
        <div className="drow"><span>5 stars</span><div className="bar"><i style={{ width: "96%", background: "var(--ok)" }}></i></div><b>96%</b></div>
        <div className="drow"><span>4 stars</span><div className="bar"><i style={{ width: "0%", background: "var(--ok)" }}></i></div><b>0%</b></div>
        <div className="drow"><span>3 stars</span><div className="bar"><i style={{ width: "0%", background: "var(--med)" }}></i></div><b>0%</b></div>
        <div className="drow"><span>2 stars</span><div className="bar"><i style={{ width: "0%", background: "var(--high)" }}></i></div><b>0%</b></div>
        <div className="drow"><span>1 star</span><div className="bar"><i style={{ width: "4%", background: "var(--crit)" }}></i></div><b>4%</b></div>
        <p className="note">This is the kind of rating most coaching programs never reach. It deserves to be the first thing a brother sees, live and verified, not a number typed into a template.</p>
      </div>
    </section>
    </>
  );
}
