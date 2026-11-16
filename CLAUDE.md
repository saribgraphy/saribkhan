@AGENTS.md

## Positioning

**One line:** Sarib Khan helps businesses look sharp, run smoothly and get seen online. Tagline: "Design, Build, Market". (Since 16 November 2026. Before that the site said "Designer for coaching brands".)

**Four lanes:** design and brand; websites and software; AI and automation; content and social. AI is how the work gets done fast, not the product. Coaching work is proof, not the frame.

**No prices** on the site, in llms.txt or in the Markdown versions.

**Every layer says the same thing.** A change to visible copy also updates its Markdown version (`src/lib/markdown.ts`), `llms.txt` (`src/app/llms.txt/route.ts`) and the JSON-LD (`src/lib/structured-data.ts`). The headline, tagline and description live once, in Site settings (`src/content/data/site.json`).

**Copy rules:** complete sentences, no em dashes, no hype words, no fragment headlines, British spelling.

**Never change without asking:**
- URLs and slugs
- `/muslim-ceo` and `/remote-rizq`: content, `noindex, nofollow`, absence from the sitemap and llms.txt
- `/claude-code-guide`, `/privacy`, Google Analytics, `robots.txt`, the sitemap generator, anything under `/api/`
- Layout, spacing, colours, fonts, the font switcher, animations, the right rail, the live clock, Ctrl K behaviour
- Case-file content and testimonials

Content that lives in Keystatic is edited in `src/content/data/*.json`, in the same format, so the CMS keeps working. Big changes go on a branch, one reviewable chunk at a time.
