import type { Metadata } from "next";
import { A, Checklist, Compare, K, Note, P, Points, Prompt, Step, Video } from "@/components/guide/blocks";
import { Waitlist } from "@/components/guide/waitlist";
import { Breadcrumb, Divider, Section, SectionLabel } from "@/components/ui/view";
import { socials } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "How to Build and Launch a Website With Claude Code (Free Guide)";
const DESCRIPTION =
  "You already pay for Claude. Here's how to use Claude Code to build a real website on your own computer and put it live on Vercel for free, step by step.";

export const metadata: Metadata = { ...pageMetadata(TITLE, DESCRIPTION), title: { absolute: TITLE } };

/** YouTube id of the Git setup video. Leave empty to show a placeholder. */
const GIT_VIDEO_ID = "";

const STEPS = [
  ["install", "Install the Claude desktop app"],
  ["git", "Install Git"],
  ["code", "Switch from Chat to Code"],
  ["folder", "Create a folder for your project"],
  ["plan", "Start in Plan mode"],
  ["build", "Tell Claude what to build"],
  ["preview", "Preview it and ask for changes"],
  ["github", "Put your code on GitHub"],
  ["vercel", "Put your site live with Vercel"],
  ["keep-building", "Keep building"],
] as const;

const instagram = socials.find((s) => s.label === "Instagram");

/**
 * The free guide people get by commenting REFUND on the reel. Written by hand
 * for now; it sits in the site shell like any other page.
 */
export default function ClaudeCodeGuide() {
  const step = (id: (typeof STEPS)[number][0]) => {
    const i = STEPS.findIndex(([s]) => s === id);
    return { n: i + 1, id, title: STEPS[i][1] };
  };

  return (
    <article>
      <Breadcrumb trail={[{ label: "Free guide" }]} />
      <h1 className="t-display mb-6">Stop paying twice. Build your website with Claude Code.</h1>
      <div className="grid gap-4">
        <p className="t-lead">
          If you pay for Claude and you also pay for a website builder like Lovable, you&apos;re paying two companies to do one
          job. Claude Code can design, build and update a website for you, and it does it on your own computer, with your own
          files.
        </p>
        <p className="t-lead">
          This guide takes you from zero to a live website. You don&apos;t need to know how to code. You need about an hour, a
          paid Claude plan and the patience to read each step once.
        </p>
      </div>
      <p className="t-mono mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
        Free guide <span className="text-faint">·</span> About an hour <span className="text-faint">·</span> No coding needed
      </p>

      <Divider />

      <Section>
        <SectionLabel>In this guide</SectionLabel>
        <ol className="grid grid-cols-2 gap-x-6 gap-y-1.5 max-sm:grid-cols-1">
          {STEPS.map(([id, title], i) => (
            <li key={id}>
              <a href={`#${id}`} className="t-ui group flex gap-3 py-0.5 text-body hover:text-ink">
                <span className="t-mono text-faint group-hover:text-muted">{String(i + 1).padStart(2, "0")}</span>
                {title}
              </a>
            </li>
          ))}
        </ol>
      </Section>

      <Divider />

      <Section className="grid gap-5">
        <h2 className="text-[24px] leading-[30px] font-semibold tracking-[-0.015em] text-ink">Why Claude Code, if Lovable already works?</h2>
        <P>
          Lovable is good at what it does. You type an idea, it builds a page, and you can share it in minutes. For a quick
          landing page, that&apos;s hard to beat.
        </P>
        <P>
          The catch is that everything happens inside their product. You work with their credits, their setup and the features
          they&apos;ve decided to give you. Claude Code has none of those walls. It works in a folder on your computer, it can
          read and write any file, install what your project needs, pull code from GitHub, use skills and connect to your other
          tools. A website is only the start. The same setup builds apps, automates boring tasks and even edits videos.
        </P>
        <Compare
          head={["", "Lovable", "Claude Code"]}
          rows={[
            ["Where your project lives", "In Lovable's platform", "In a folder on your computer"],
            ["What you pay", "A separate subscription on top of Claude", "Included in Claude Pro, Max, Team and Enterprise"],
            ["What you can build", "Websites and web apps, built their way", "Websites, apps, scripts, automations and more"],
            ["Extending it", "Their built-in integrations", "Skills, plugins, connectors and any GitHub repo"],
            ["Best for", "Fast prototypes", "Real projects you'll keep working on"],
          ]}
        />
      </Section>

      <Divider />

      <Section className="grid gap-5">
        <h2 className="text-[24px] leading-[30px] font-semibold tracking-[-0.015em] text-ink">What you need before you start</h2>
        <Checklist
          items={[
            <>A paid Claude plan. Claude Code needs Pro, Max, Team or Enterprise. Pro is enough to start.</>,
            <>The Claude desktop app for Mac or Windows. It already includes Claude Code, so there&apos;s nothing else to install for Claude itself.</>,
            <>Git installed on your computer. On Windows, install Git for Windows. Most Macs already have it.</>,
            <>A free GitHub account, to store your code online.</>,
            <>A free Vercel account, to put your site live.</>,
          ]}
        />
      </Section>

      <Divider />

      <div className="grid gap-14">
        <Step {...step("install")}>
          <P>
            Download the Claude desktop app from{" "}
            <A href="https://code.claude.com/docs/en/desktop-quickstart">Claude&apos;s official download page</A>, install it, and
            sign in with the same account you use for Claude in your browser.
          </P>
        </Step>

        <Step {...step("git")}>
          <P>
            Git keeps track of every change in your project and lets Claude send your code to GitHub. Download it from{" "}
            <A href="https://git-scm.com/downloads">git-scm.com</A> and accept the default options while installing. If you&apos;ve
            never done this before, watch this short setup video first.
          </P>
          <Video id={GIT_VIDEO_ID || undefined} title="Git setup video" />
        </Step>

        <Step {...step("code")}>
          <P>
            Open the Claude app and click <strong className="font-medium text-ink">Code</strong> at the top of the sidebar. This
            is the part most people miss. Chat is for talking to Claude. Code is where Claude actually builds things on your
            computer.
          </P>
          <Note>If clicking Code asks you to upgrade, your account isn&apos;t on a paid plan yet.</Note>
        </Step>

        <Step {...step("folder")}>
          <P>
            Make a new, empty folder on your desktop and give it a simple name, like <K>my-first-site</K>. Every project gets its
            own folder, so nothing gets mixed up.
          </P>
          <P>
            Back in the Code tab, look at the row under the prompt box. Set the environment to{" "}
            <strong className="font-medium text-ink">Local</strong>, then click the folder control, choose{" "}
            <strong className="font-medium text-ink">Open folder</strong> and select the folder you just made.
          </P>
        </Step>

        <Step {...step("plan")}>
          <P>
            In the same row, you&apos;ll see the permission mode. Set it to <strong className="font-medium text-ink">Plan</strong>.
            In Plan mode, Claude explains what it&apos;s going to build without touching any files, so you can fix the idea before
            any work starts. Once the plan looks right, switch to <strong className="font-medium text-ink">Accept edits</strong>{" "}
            and let it build.
          </P>
        </Step>

        <Step {...step("build")}>
          <P>
            Be specific about who the site is for, what it should feel like and what people should do on it. Here&apos;s a prompt
            you can copy and change:
          </P>
          <Prompt>{`Build a one-page website for a barber shop called Fade Room in Manchester.
Dark theme with a warm gold accent. Sections: hero with a "Book a cut" button,
services with prices, a gallery, reviews, opening hours and a map, then a footer.
Make it fast, mobile friendly and easy for me to edit later.
Use Next.js and Tailwind CSS, and keep it ready to deploy on Vercel.`}</Prompt>
          <P>
            Claude will create the files, install what the project needs and tell you what it did. If it asks for permission to
            run a command, read what it wants to do and approve it.
          </P>
        </Step>

        <Step {...step("preview")}>
          <P>
            Ask Claude to run the site. It opens in the browser pane inside the app, and Claude can look at the page itself, click
            around and fix what it finds. From here, you work the same way you would in Lovable: you look, and you ask for changes
            in plain words.
          </P>
          <Prompt label="Change requests">{`Make the hero headline bigger and move the booking button above the fold on mobile.
The gallery feels empty. Use a three-column grid with rounded corners.
Check the whole site on a phone-sized screen and fix anything that breaks.`}</Prompt>
        </Step>

        <Step {...step("github")}>
          <P>
            Go to <A href="https://github.com/new">github.com</A>, click <strong className="font-medium text-ink">New repository</strong>,
            give it the same name as your folder and create it. Leave it empty. Copy the repository link, then paste it to Claude:
          </P>
          <Prompt>{`Here's my GitHub repo: https://github.com/your-name/my-first-site
Set up Git in this project, connect it to this repo and push all the code.`}</Prompt>
          <P>
            The first time, GitHub will ask you to sign in. Claude will tell you exactly what to click or type. After that,
            pushing new changes is one sentence: &ldquo;push my latest changes to GitHub.&rdquo;
          </P>
        </Step>

        <Step {...step("vercel")}>
          <P>
            Go to <A href="https://vercel.com">vercel.com</A> and sign up with your GitHub account. Open the New Project page at{" "}
            <A href="https://vercel.com/new">vercel.com/new</A>, pick your repository from the list and click{" "}
            <strong className="font-medium text-ink">Deploy</strong>. A minute later you&apos;ll get a live link you can send to
            anyone.
          </P>
          <P>
            The best part is what happens next. Every time Claude pushes a change to GitHub, Vercel rebuilds and updates your live
            site on its own. You never upload anything by hand.
          </P>
        </Step>

        <Step {...step("keep-building")}>
          <P>
            Your site is live, and you didn&apos;t pay for a second tool to get there. This is where Claude Code starts to pull
            away from Lovable:
          </P>
          <Points
            items={[
              { lead: "Add real features.", body: "A contact form that emails you, a blog, a booking system or a login area." },
              { lead: "Connect your domain.", body: "Ask Claude to walk you through adding your own domain in Vercel." },
              {
                lead: "Use skills.",
                body: (
                  <>
                    Type <K>/</K> in the prompt box to see the skills and commands Claude can use, and add your own for things you
                    do often.
                  </>
                ),
              },
              {
                lead: "Add plugins and connectors.",
                body: (
                  <>
                    Click <K>+</K> next to the prompt box to connect tools like GitHub and Slack, or install plugins. Vercel even
                    has its own plugin for Claude Code that handles deploys for you.
                  </>
                ),
              },
              {
                lead: "Build beyond websites.",
                body: "Scripts that rename hundreds of files, small internal tools, video edits. If it lives on a computer, you can ask Claude to help build it.",
              },
            ]}
          />
        </Step>
      </div>

      <Divider className="my-14" />

      <Section className="grid gap-5">
        <h2 className="text-[24px] leading-[30px] font-semibold tracking-[-0.015em] text-ink">When something goes wrong</h2>
        <dl className="grid gap-5">
          {[
            [
              "I don't see the Code tab, or it asks me to upgrade.",
              "Claude Code needs a paid plan. Check that you're signed in to the account that has Pro or above, then restart the app.",
            ],
            [
              'It says "Git is required."',
              "Install Git from git-scm.com (Git for Windows on a PC), then restart the app.",
            ],
            [
              "Pushing to GitHub fails.",
              "It's almost always sign-in. Tell Claude the exact error and ask it to help you log in to GitHub from this computer.",
            ],
            [
              "The site works in Claude but not on Vercel.",
              "Copy the error from the Vercel build log and paste it to Claude. Ask it to fix the build and push again.",
            ],
          ].map(([q, a]) => (
            <div key={q} className="grid gap-1">
              <dt className="t-ui font-medium text-ink">{q}</dt>
              <dd className="t-body">{a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Divider className="my-14" />

      <Section className="mb-14 grid gap-3">
        <h2 className="text-[24px] leading-[30px] font-semibold tracking-[-0.015em] text-ink">Want more like this?</h2>
        <P>
          I share how I use Claude to design, build and ship real work, without the fluff.{" "}
          {instagram ? (
            <>
              Follow me on <A href={instagram.href}>Instagram</A> for the next one
            </>
          ) : (
            "Follow me on Instagram for the next one"
          )}
          , and if this guide helped you build something, send it to me. I&apos;d love to see it.
        </P>
      </Section>

      <Waitlist source="claude-code-guide" />
    </article>
  );
}
