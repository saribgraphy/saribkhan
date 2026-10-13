# Sarib Khan, studio page

One quiet app-shell page for coaching founders. Spec and final copy live in
`Sarib Khan — Studio Page Brief & Copy.md`.

```bash
npm install
npm run dev
```

## Where things live

- `src/content/` holds all copy, typed (`home.ts`, `projects.ts`, `touchpoints.ts`,
  `pricing.ts`, `notes.ts`, `about.ts`, `site.ts`). Edit copy here, not in components.
  Anything in `[square brackets]` renders as a visible placeholder until replaced.
- `src/app/(shell)/layout.tsx` is the shell: rails, grid rules, panel host, command menu.
- `src/app/(shell)/@panel/(.)work/[slug]` intercepts case files into the side panel;
  `/work/[slug]` is the same case file as a direct-link page.
- `src/components/demos/` holds the calculator, application step and booking card.
- `src/app/globals.css` holds the design tokens (monochrome, light) and Kumo token mapping.

## Adding real assets

- Funnel Map screenshots: add `image: "/work/ima/landing.webp"` to a node in `projects.ts`.
- Before and after: add `before: { before, after, caption }` to a project; the slider appears.
- Desk collage photos: add `image` to an object in `about.ts`.

## Forms

Copy `.env.example` to `.env.local` and fill in the Resend values. Without them the
panels hand the inquiry to WhatsApp, prefilled, so nothing is lost.
