import { Check } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import { A, Checklist, Compare, K, Note, P, Points, Prompt, Step } from "@/components/guide/blocks";
import {
  CodeTabScene,
  FolderScene,
  GithubScene,
  GitScene,
  InstallScene,
  KeepBuildingScene,
  PlanScene,
  PreviewScene,
  PromptScene,
  VercelScene,
} from "@/components/guide/illustrations";
import { Video } from "@/components/guide/video";
import { Waitlist } from "@/components/guide/waitlist";
import { Breadcrumb, Divider, Section, SectionLabel } from "@/components/ui/view";
import { guide } from "@/content/guide";
import { socials } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "How to Build and Launch a Website With Claude Code (Free Guide)";
const DESCRIPTION =
  "You already pay for Claude. Here's how to use Claude Code to build a real website on your own computer and put it live on Vercel for free, step by step.";

// The cover doubles as the share image (cover/route.tsx: the uploaded cover, or the designed card).
const COVER = { url: "/claude-code-guide/cover", width: 1200, height: 630, alt: "How to build and launch a website with Claude Code" };
const base = pageMetadata(TITLE, DESCRIPTION);
export const metadata: Metadata = {
  ...base,
  title: { absolute: TITLE },
  openGraph: { ...base.openGraph, images: [COVER], type: "article" },
  twitter: { ...base.twitter, images: [COVER] },
};

const STEPS = [
  ["install", "Install the Claude desktop app"],
  ["git", "Install Git"],
  ["code", "Switch from Chat to Code"],
  ["folder", "Create the Fade Room folder"],
  ["plan", "Start in Plan mode"],
  ["build", "Describe Fade Room to Claude"],
  ["preview", "Preview it and ask for changes"],
  ["github", "Put Fade Room on GitHub"],
  ["vercel", "Put it live with Vercel"],
  ["keep-building", "Keep building"],
] as const;

const instagram = socials.find((s) => s.label === "Instagram");
const strong = (s: string) => <strong className="font-medium text-ink">{s}</strong>;

/** "You'll know it worked when…", the check at the end of each step. */
function Done({ children }: { children: React.ReactNode }) {
  return (
    <p className="t-ui flex gap-2.5 font-normal text-body">
      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-iris-soft text-iris">
        <Check size={10} weight="bold" />
      </span>
      <span>
        <span className="font-medium text-ink">You&apos;ll know it worked when</span> {children}
      </span>
    </p>
  );
}

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[24px] leading-[30px] font-semibold tracking-[-0.015em] text-ink">{children}</h2>
);

/**
 * The free guide people get by commenting REFUND on the reel. Every step
 * builds the same example site, Fade Room, so readers always know where they
 * are. Written by hand; the cover and video id are edited in the CMS.
 */
export default function ClaudeCodeGuide() {
  const step = (id: (typeof STEPS)[number][0]) => {
    const i = STEPS.findIndex(([s]) => s === id);
    return { n: i + 1, id, title: STEPS[i][1] };
  };

  return (
    <article>
      <figure className="frame -mx-4 mb-10 !p-1.5 max-md:mx-0">
        <div className="relative aspect-[1200/630] overflow-hidden rounded-[6px] ring-[0.5px] ring-black/10">
          {guide.cover ? (
            <Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 768px) 100vw, 640px" className="object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- the generated share card, served by this route
            <img src={COVER.url} alt={guide.coverAlt} className="absolute inset-0 size-full object-cover" />
          )}
        </div>
      </figure>

      <Breadcrumb trail={[{ label: "Free guide" }]} />
      <h1 className="t-display mb-6">Stop paying twice. Build your website with Claude Code.</h1>
      <div className="grid gap-4">
        <p className="t-lead">
          If you pay for Claude and you also pay for a website builder like Lovable, you&apos;re paying two companies to do one
          job. Claude Code can design, build and update a website for you, and it does it on your own computer, with your own
          files.
        </p>
        <p className="t-lead">
          In this guide we build one real site together, from an empty folder to a live link. You don&apos;t need to know how to
          code. You need about an hour, a paid Claude plan and the patience to read each step once.
        </p>
      </div>
      <p className="t-mono mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
        Free guide <span className="text-faint">·</span> About an hour <span className="text-faint">·</span> No coding needed
      </p>

      <Divider />

      <Section className="grid gap-5">
        <SectionLabel className="!mb-0">What we&apos;re building</SectionLabel>
        <div className="card grid gap-4 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-[19px] font-semibold tracking-[-0.015em] text-ink">Fade Room</span>
            <span className="t-label">A one-page site for a barber shop in Manchester</span>
          </div>
          <P>
            Every step in this guide builds this one site, so you always know where you are and what comes next. When you&apos;re
            done, swap in your own business and run the same steps again.
          </P>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 max-sm:grid-cols-1">
            {[
              "Dark theme with a warm gold accent",
              "A hero with a Book a cut button",
              "Services with prices",
              "A gallery and reviews",
              "Opening hours and a map",
              "Live on the internet at a real link",
            ].map((f) => (
              <li key={f} className="t-ui flex items-center gap-2 font-normal text-body">
                <span className="size-1.5 rounded-full bg-[#c9a24a]" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </Section>

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
        <H2>Why Claude Code, if Lovable already works?</H2>
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
            ["What you pay", "A separate subscription on top of Claude", "Included in Claude Pro, Max, Ultra, Team and Enterprise"],
            ["What you can build", "Websites and web apps, built their way", "Websites, apps, scripts, automations and more"],
            ["Extending it", "Their built-in integrations", "Skills, plugins, connectors and any GitHub repo"],
            ["Best for", "Fast prototypes", "Real projects you'll keep working on"],
          ]}
        />
      </Section>

      <Divider />

      <Section className="grid gap-5">
        <H2>What you need before you start</H2>
        <Checklist
          items={[
            <>A paid Claude plan. Claude Code needs Pro, Max, Ultra, Team or Enterprise. Pro is enough for Fade Room.</>,
            <>The Claude desktop app for Mac or Windows. It already includes Claude Code, so there&apos;s nothing else to install for Claude itself.</>,
            <>Git on your computer. Most Macs already have it. On Windows, you&apos;ll install Git for Windows in step 2.</>,
            <>A free GitHub account, to store the Fade Room code online.</>,
            <>A free Vercel account, to put Fade Room live.</>,
          ]}
        />
      </Section>

      <Divider />

      <div className="grid gap-16">
        <Step {...step("install")}>
          <P>
            Download the Claude desktop app from <A href="https://code.claude.com/docs/en/desktop-quickstart">Claude&apos;s official download page</A>.
            There are builds for Mac (Intel and Apple Silicon) and Windows. Run the installer, open Claude, and sign in with the
            same account you use for Claude in your browser, the one with your paid plan.
          </P>
          <P>
            You don&apos;t need to install anything else for Claude Code itself. It&apos;s built into the app, so there&apos;s no
            terminal, no Node.js and no command-line setup at this point.
          </P>
          <InstallScene />
          <Done>Claude opens, you&apos;re signed in, and you can see the sidebar on the left.</Done>
        </Step>

        <Step {...step("git")}>
          <P>
            Git is a save history for your project. Every time Claude finishes a change to Fade Room, Git can store it as a
            version you can go back to. It&apos;s also what sends your code to GitHub in step 8, which is how the site gets online.
          </P>
          <P>
            {strong("On a Mac,")} you probably have it already. Open the Terminal app, type <K>git --version</K> and press
            Enter. If you see a version number, you&apos;re done. {strong("On Windows,")} download Git for Windows from{" "}
            <A href="https://git-scm.com/downloads">git-scm.com</A> and click through the installer with the default options. If
            you&apos;ve never done this before, this short video walks through it:
          </P>
          <Video id={guide.videoId || undefined} title="Setting up Git for Claude Code" />
          <GitScene />
          <Done>
            <K>git --version</K> prints a version number. Restart the Claude app afterwards so it picks Git up.
          </Done>
        </Step>

        <Step {...step("code")}>
          <P>
            Open the Claude app and click {strong("Code")} at the top of the sidebar. This is the part most people miss. Chat is
            for talking to Claude. Code is where Claude actually builds things on your computer: it creates files, installs what a
            project needs and runs your site.
          </P>
          <CodeTabScene />
          <Note>If clicking Code asks you to upgrade, the account you&apos;re signed in to isn&apos;t on a paid plan yet.</Note>
          <Done>you see a new session with a prompt box, and a row of controls under it.</Done>
        </Step>

        <Step {...step("folder")}>
          <P>
            Every project gets its own folder, so nothing gets mixed up. Make a new, empty folder on your desktop and call it{" "}
            <K>fade-room</K>. This folder is Fade Room: everything Claude makes will live in it.
          </P>
          <P>
            Back in the Code tab, look at the row under the prompt box. Click the first control, the environment, and choose the
            top entry under {strong("Local")}. That means Claude works on your own computer. Then click the folder control next to
            it, choose {strong("Open folder…")} and select <K>fade-room</K>.
          </P>
          <FolderScene />
          <Done>the folder control under the prompt box shows fade-room.</Done>
        </Step>

        <Step {...step("plan")}>
          <P>
            In the same row there&apos;s a permission mode. It decides how much Claude does before checking with you. There are
            four: {strong("Manual")} asks before every change, {strong("Accept edits")} lets Claude change files on its own,{" "}
            {strong("Auto")} checks risky actions in the background, and {strong("Plan")} doesn&apos;t touch any files at all.
          </P>
          <P>
            Set it to {strong("Plan")} for now. In Plan mode, Claude reads your request and writes out how it would build Fade
            Room, without creating a single file. It&apos;s the cheapest moment to change your mind: fixing an idea in a plan
            takes one sentence, fixing it after the site is built takes longer.
          </P>
          <PlanScene />
          <Done>the permission mode under the prompt box says Plan.</Done>
        </Step>

        <Step {...step("build")}>
          <P>
            Now describe Fade Room. The more specific you are about who it&apos;s for, how it should feel and what people should
            do on it, the closer the first version gets. Copy this, and change any detail you like:
          </P>
          <Prompt>{`Build a one-page website for a barber shop called Fade Room in Manchester.
Dark theme with a warm gold accent. Sections: hero with a "Book a cut" button,
services with prices, a gallery, reviews, opening hours and a map, then a footer.
Make it fast, mobile friendly and easy for me to edit later.
Use Next.js and Tailwind CSS, and keep it ready to deploy on Vercel.`}</Prompt>
          <P>
            Because you&apos;re in Plan mode, Claude answers with a plan: how it will set the project up and what goes in each
            section. Read it like a brief. If something&apos;s off, say so in plain words. When it matches what you want, switch the
            mode to {strong("Accept edits")} and tell Claude to go ahead.
          </P>
          <Prompt label="Make it yours">{`Use these services and prices: Skin fade £25, Classic cut £20,
Beard trim £12, Hot towel shave £20. We're open Tuesday to Saturday, 9am to 7pm.
The plan looks good. Go ahead and build it.`}</Prompt>
          <PromptScene />
          <P>
            Claude now creates the files and installs what the project needs. When it wants to run a command, like installing
            packages, it shows you exactly what it&apos;s about to do. Read it and approve it. A small {strong("+148 −0")} style
            counter shows how much changed, and you can click it to see every line.
          </P>
          <Done>Claude says the site is built and lists the files it made in your fade-room folder.</Done>
        </Step>

        <Step {...step("preview")}>
          <P>
            Ask Claude to {strong("run the site")}. It starts it on your computer and opens it in the Browser pane inside the app,
            so you see Fade Room right next to the conversation. Claude can look at the page too: it can click around, check it on
            a phone-sized screen and fix what it finds.
          </P>
          <PreviewScene />
          <P>
            From here, you work the same way you would in Lovable. You look, and you ask for changes in plain words. A few to try
            on Fade Room:
          </P>
          <Prompt label="Change requests">{`Make the hero headline bigger and move the Book a cut button above the fold on mobile.
The gallery feels empty. Use a three-column grid with rounded corners.
Check the whole site on a phone-sized screen and fix anything that breaks.`}</Prompt>
          <Done>you can see Fade Room in the Browser pane, and your changes show up after each request.</Done>
        </Step>

        <Step {...step("github")}>
          <P>
            Fade Room only exists on your computer so far. GitHub stores a copy online, and it&apos;s what Vercel will publish from.
            Go to <A href="https://github.com/new">github.com/new</A>, name the repository <K>fade-room</K>, leave every other
            option as it is (no README) and click {strong("Create repository")}. Copy the link it shows you, then paste it to
            Claude:
          </P>
          <Prompt>{`Here's my GitHub repo: https://github.com/your-name/fade-room
Set up Git in this project, connect it to this repo and push all the code.`}</Prompt>
          <GithubScene />
          <P>
            The first time, GitHub will ask you to sign in from this computer. Claude tells you exactly what to click or type.
            After that, saving your work online is one sentence: &ldquo;push my latest changes to GitHub.&rdquo;
          </P>
          <Done>refreshing your repository page on GitHub shows the Fade Room files.</Done>
        </Step>

        <Step {...step("vercel")}>
          <P>
            Vercel turns your GitHub repository into a live website, and the free plan covers a site like Fade Room. Go to{" "}
            <A href="https://vercel.com/signup">vercel.com</A> and sign up with your GitHub account. Open{" "}
            <A href="https://vercel.com/new">vercel.com/new</A>, find <K>fade-room</K> in the list and click {strong("Import")}.
            Vercel recognises it as a Next.js site, so you don&apos;t need to change any settings. Click {strong("Deploy")}.
          </P>
          <VercelScene />
          <P>
            About a minute later you get a live link, something like <K>fade-room.vercel.app</K>, that you can send to anyone.
            And from now on, every time Claude pushes a change to GitHub, Vercel rebuilds and updates the live site on its own. You
            never upload anything by hand.
          </P>
          <Done>the link opens Fade Room on your phone, outside your computer.</Done>
        </Step>

        <Step {...step("keep-building")}>
          <P>
            Fade Room is live, and you didn&apos;t pay for a second tool to get there. This is where Claude Code starts to pull
            away from Lovable, because the same session can keep growing the site:
          </P>
          <KeepBuildingScene />
          <Points
            items={[
              { lead: "Add real features.", body: "A booking form that emails the shop, a blog with grooming tips, or a login area for regulars." },
              { lead: "Connect a domain.", body: "Ask Claude to walk you through adding your own domain, like fade-room.co.uk, in Vercel." },
              {
                lead: "Use skills.",
                body: (
                  <>
                    Type <K>/</K> in the prompt box to browse the skills and commands Claude can use, and add your own for things
                    you do often.
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
        <H2>When something goes wrong</H2>
        <dl className="grid gap-5">
          {[
            [
              "I don't see the Code tab, or it asks me to upgrade.",
              "Claude Code needs a paid plan. Check that you're signed in to the account that has Pro or above, then restart the app.",
            ],
            ['It says "Git is required."', "Install Git from git-scm.com (Git for Windows on a PC), then restart the app."],
            [
              "Pushing to GitHub fails.",
              "It's almost always sign-in. Tell Claude the exact error and ask it to help you log in to GitHub from this computer.",
            ],
            [
              "Fade Room works in Claude but not on Vercel.",
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
        <H2>Want more like this?</H2>
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
