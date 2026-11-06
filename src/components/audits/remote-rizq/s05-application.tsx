/* eslint-disable @next/next/no-img-element -- report screenshots are plain, fixed-size images */
export function ApplicationSection() {
  return (
    <>
    <section id="rr-application">
      <div className="eyebrow"><b>05</b>The application</div>
      <h2>The step that earns you money gets the least design attention.</h2>
      <div className="grid g2" style={{ gap: "40px", alignItems: "start" }}>
        <div className="grid" style={{ gap: "20px" }}>
          <h3>What a brother goes through today</h3>
          <div className="journey">
            <div className="step"><div><h4>Watches the video and the wins</h4><p>This part works. The proof is real and specific.</p></div></div>
            <div className="step bad"><div><h4>Reaches a form that looks different</h4><p>A gold block with its own heading, typeface and boxed logo, framed as a &quot;Secure application&quot;.</p></div></div>
            <div className="step bad"><div><h4>Fills six required fields on one screen</h4><p>Name, surname, phone, email, his reason and his budget, all at once.</p></div></div>
            <div className="step bad"><div><h4>Gets asked about money with no context</h4><p>&quot;What is your ability to invest?&quot; appears before the page has said anything about price or how the program is paid for.</p></div></div>
            <div className="step"><div><h4>Submits</h4><p>I didn&apos;t submit an application, so I couldn&apos;t see what happens next. That&apos;s the first thing I&apos;d look at with you.</p></div></div>
          </div>
        </div>
        <figure><button className="shot" data-full="/audits/remote-rizq/form.webp"><span className="bar-top"><i></i><i></i><i></i><span>api.leadconnectorhq.com</span></span><img src="/audits/remote-rizq/form.webp" alt="RemoteRizq application form" loading="lazy" /></button><figcaption><b>The form on its own.</b> Six required fields in one long block. It works, but nothing about it feels like the step where a brother changes his life.</figcaption></figure>
      </div>
      <div className="findings">
        <div className="finding"><span><span className="tag t-high">High</span></span><div><h4>One long form instead of a conversation</h4><p>Asking one question at a time, starting with his reason before his phone number, feels like being taken seriously. One long block feels like paperwork, and people abandon paperwork.</p></div></div>
        <div className="finding"><span><span className="tag t-high">High</span></span><div><h4>No saved progress or partial capture</h4><p>If a brother fills in his name and email and then stops at the budget question, that lead is gone. A step-by-step form can save him to your CRM the moment he gives his contact details.</p></div></div>
        <div className="finding"><span><span className="tag t-med">Medium</span></span><div><h4>The form lives on another domain</h4><p>It&apos;s embedded from api.leadconnectorhq.com, so it can&apos;t share the page&apos;s design, speed or tracking. It also loads as a separate frame inside the page.</p></div></div>
      </div>
    </section>
    </>
  );
}
