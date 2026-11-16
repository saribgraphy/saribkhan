# Positioning changes: the generalist shift

Branch `positioning-generalist`, 16 November 2026. The site now says "I help businesses look sharp, run smoothly and get seen online." instead of "Designer for coaching brands". Copy and metadata only, plus three small, reversible component tweaks noted below. Nothing is merged or deployed to the live site.

Staging (Vercel login needed): https://saribkhan-git-positioning-generalist-xtarc.vercel.app

## 1. Files changed

| File | What changed |
| --- | --- |
| `keystatic.config.ts` | New **Headline** field in Site settings; Tagline description updated; new **Video** icon option for Things I make |
| `src/content/data/site.json` | Tagline "Design, Build, Market", new headline, new description |
| `src/content/site.ts` | Exposes `site.headline` (falls back to the tagline) |
| `src/content/data/home.json` | Lede, paragraphs, Currently roles plus a new Instagram row, logo row slot, the three cards, Start here |
| `src/content/data/work.json` | Heading and intro; projects reordered (case-file content unchanged) |
| `src/content/data/build.json` | Heading, intro, X-ray intro, 12 steps, closing note, 8 things I make, Try it intro |
| `src/content/data/pricing.json` | Heading, intro, both offers (no prices), exclusions line, The math emptied, walkthrough copy, FAQ |
| `src/content/data/about.json` | Heading and the directions paragraph |
| `src/content/labels.ts` | Section labels: People I've built for, What I help with, The X-ray, calculator title |
| `src/components/home/hero.tsx` | H1 is the headline alone (name and Aa switcher stay in the sidebar) |
| `src/components/build/capabilities.tsx` | Adds the video camera icon |
| `src/components/pricing/engagement-cards.tsx` | Price slot renders only when a price is set |
| `src/app/(shell)/working-together/page.tsx` | The math section renders only when its CMS field has text |
| `src/components/shell/panel-host.tsx` | Start form and walkthrough panel wording; form fields and handler unchanged |
| `src/components/shell/command-menu.tsx` | Labels, search hints and keywords |
| `src/app/(shell)/contact/page.tsx` | Intro, meta and Starting a project paragraph |
| `src/app/not-found.tsx` | "This page doesn't exist." |
| `src/app/layout.tsx`, `src/app/(shell)/page.tsx`, `src/app/opengraph-image.tsx` | Titles, meta keywords, share image line |
| `src/lib/structured-data.ts` | Job title, skills list, YouTube added to sameAs |
| `src/lib/markdown.ts` | Markdown versions match the new pages; footer "Design, Build, Market" |
| `src/app/llms.txt/route.ts` | New summary, When to use, page descriptions, Contact section |

## 2. Done differently from the brief, on Sarib's instructions

- **No prices anywhere** on Working together, Home or llms.txt. Both offers lost their price; The math section (and its calculator) is hidden; the payment FAQ answer no longer mentions price.
- **Home H1** shows the headline only, without the name and Aa badge.
- The optional items were approved: Instagram row in Currently, Work reordered to show range first.

## 3. Old positioning the brief didn't list (all changed)

Start a project form (question, options, confirmation), the walkthrough panel title, field and WhatsApp message, the 404 heading, Ctrl K hints, the X-ray intro, the Markdown contact text.

**Left as is, because the brief says never change these:**
- `/privacy` says "The project and funnel teardown forms…". Suggest changing to "walkthrough" in a later pass.
- `/api/inquiry` emails you with the subject "Funnel teardown request" and a "Program" label. Only you see these.

**Left as proof:** the /build application demo (options start with "A coaching program"), the booking card caption, the three notes, case files and testimonials.

## 4. Checks

- Production build: passes, no new warnings. Types: pass.
- `npm run test:agents`: 99/99 (Markdown negotiation on every page, 404s, llms.txt, JSON-LD, canonicals, trust pages).
- Sitemap: same 20 URLs, all 200.
- `/muslim-ceo`, `/remote-rizq`: unchanged, `noindex, nofollow`, not in the sitemap or llms.txt.
- `/claude-code-guide`, `/privacy`, `/api`, robots, sitemap, notes, guide data: no diff against `main`. Case files: identical apart from order.
- Keystatic `/keystatic`: opens (200).
- Share image: shows the new line, fits 1200 × 630.
- Home hero: 2 lines on desktop, fits at 768px and 375px with the buttons on the first screen.
- Ctrl K opens, finds "Get a free walkthrough", items navigate.
- Search for "coaching brands", "funnel teardown", "Funnel Rebuild", "Growth Design Partner": only the two never-change files above.
- Not run: Google's Rich Results Test (run it on the live URL after merging), and a real form submission (it would send you a real email; the handler is unchanged).

## 5. Open decisions

- **The calculator**: hidden from Working together, still on /build titled "A revenue calculator, built for a coaching program". Remove, keep, or replace with a "What do you need?" picker.
- Swapping the /build calculator for the AI Chat Initiator needs a new interactive demo; not started.
- Instagram row: upload the Instagram logo in Keystatic (it shows "IG" until then).
- Share image still shows "Sarib Khan" above the headline. Keep or remove.

## 6. How to undo

Everything is on `positioning-generalist`. Nothing is on `main`. To drop it all, delete the branch. To undo one step, revert its commit:

- `0e0302e` chunk 1: shared description and Home
- `c3fec2f` chunk 2: Work, What I build, home H1
- `dd49edc` chunk 3: Working together, without prices
- `7f5cb9c` chunk 4: About, Contact, forms, 404, Ctrl K, llms.txt, pending items
