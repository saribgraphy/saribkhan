# Sarib Khan, studio page

One quiet app-shell page for coaching founders. Spec and final copy live in
`Sarib Khan — Studio Page Brief & Copy.md`.

```bash
npm install
npm run dev
```

## Editing content (CMS)

Run `npm run dev`, then open:

- **http://localhost:3000/keystatic** to edit every page: copy, lists (add, remove,
  drag to reorder) and images. Saving writes to `src/content/data/*.json` and
  uploads to `public/images/`, and the page updates within a few seconds.
- **http://localhost:3000/placeholders** for a checklist of everything still in
  `[brackets]` or missing an image, grouped by page, with links into the CMS.

Both only exist in development. When you're happy, commit and push; Vercel deploys.

## Where things live

- `keystatic.config.ts` is the CMS schema (fields, labels, hints).
- `src/content/data/*.json` holds the content the CMS edits.
- `src/content/*.ts` reads that JSON with types and fills defaults for empty fields.
- `src/app/(shell)/layout.tsx` is the shell: rails, grid rules, panel host, command menu.
- `src/app/(shell)/@panel/(.)work/[slug]` intercepts case files into the side panel;
  `/work/[slug]` is the same case file as a direct-link page.
- `src/components/demos/` holds the calculator, application step and booking card.
- `src/app/globals.css` holds the design tokens (monochrome, light) and Kumo token mapping.

## Forms

Copy `.env.example` to `.env.local` and fill in the Resend values. Without them the
panels hand the inquiry to WhatsApp, prefilled, so nothing is lost.
