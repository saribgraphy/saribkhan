import { config, fields, singleton } from "@keystatic/core";
import { labelDefaults, type LabelGroup } from "./src/content/labels";

/*
 * The CMS. Every section is a singleton stored as JSON in src/content/data,
 * imported directly by src/content/*.ts, so pages stay fully static and
 * edits hot-reload in dev. Lists are arrays: add, remove and drag to reorder.
 *
 * Anything in [square brackets] renders on the page as a visible placeholder.
 */

const placeholderHint = "Text in [square brackets] shows on the page as a placeholder until replaced.";

const text = (label: string, opts: { multiline?: boolean; description?: string } = {}) =>
  fields.text({ label, multiline: opts.multiline, description: opts.description });

const img = (label: string, directory: string, description?: string) =>
  fields.image({
    label,
    description,
    directory: `public/images/${directory}`,
    publicPath: `/images/${directory}/`,
  });

const stringList = (label: string, itemLabel: string) =>
  fields.array(text(itemLabel, { multiline: true }), {
    label,
    itemLabel: (p) => p.value || itemLabel,
  });

/** "Section labels" group: one text field per label, prefilled with the default. */
const labels = (group: LabelGroup, names: Record<string, string>) =>
  fields.object(
    Object.fromEntries(
      Object.entries(labelDefaults[group]).map(([key, def]) => [
        key,
        fields.text({ label: names[key] ?? key, defaultValue: def, description: `Default: ${def}` }),
      ]),
    ),
    { label: "Section labels", description: "The small headings on this page. Leave blank to use the default." },
  );

const dataPath = (name: string) => `src/content/data/${name}`;
const format = { data: "json" } as const;

/**
 * Local mode on your machine (edits write straight to the files), GitHub mode
 * on the live site (edits commit to the repo and Vercel redeploys).
 * Set NEXT_PUBLIC_KEYSTATIC_MODE=github locally only to create the GitHub App.
 */
const useGithub = process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_KEYSTATIC_MODE === "github";

export default config({
  storage: useGithub ? { kind: "github", repo: "saribgraphy/saribkhan" } : { kind: "local" },
  ui: {
    brand: { name: "Sarib Khan studio" },
    navigation: {
      Pages: ["home", "work", "build", "pricing", "about", "afterHours", "notes"],
      Settings: ["site"],
    },
  },
  singletons: {
    site: singleton({
      label: "Site settings",
      path: dataPath("site"),
      format,
      schema: {
        name: text("Name"),
        tagline: text("Tagline", { description: "Shown under the name on Home and in the browser tab." }),
        description: text("Search and link preview description", { multiline: true }),
        status: text("Status line", { description: "Sits next to the breathing dot. Keep it open-ended, no dates." }),
        email: text("Email"),
        whatsappDisplay: text("WhatsApp, as shown", { description: "e.g. +92 314 750 3578" }),
        whatsappNumber: text("WhatsApp, digits only", { description: "Country code first, no + or spaces." }),
        city: text("City", { description: "Used for the live clock: “11:32 in Karachi”." }),
        socials: fields.array(
          fields.object({ label: text("Network"), handle: text("Handle"), href: fields.url({ label: "Link" }) }),
          { label: "Follow links", itemLabel: (p) => p.fields.label.value || "Link" },
        ),
        footerLine: text("Home footer line", { multiline: true }),
      },
    }),

    home: singleton({
      label: "Home",
      path: dataPath("home"),
      format,
      schema: {
        lead: text("Intro, first line", { multiline: true, description: "Shown darker, like a lead." }),
        body: text("Intro, middle paragraph", { multiline: true }),
        close: text("Intro, closing line", { multiline: true }),
        currently: fields.array(
          fields.object({
            name: text("Name"),
            role: text("Role"),
            years: text("Years", { description: placeholderHint }),
            logo: img("Logo", "logos", "Square, transparent background works best."),
            logoText: text("Logo fallback text", { description: "Shown when there's no logo image, e.g. IMA." }),
          }),
          { label: "Currently", itemLabel: (p) => p.fields.name.value || "Row" },
        ),
        systems: fields.array(
          fields.object({ name: text("Name"), href: fields.url({ label: "Link (optional)" }) }),
          { label: "Systems I've designed for", itemLabel: (p) => p.fields.name.value || "Client" },
        ),
        systemsExtra: text("After the names", { description: placeholderHint }),
        systemsRest: text("Closing phrase", { description: "e.g. and 30 more founders across [number] countries." }),
        systemsLast: text("The empty seat", { description: "Styled as a link, opens Start a project." }),
        testimonials: fields.array(
          fields.object({
            quote: text("Quote", { multiline: true }),
            name: text("Name"),
            role: text("Role"),
            company: text("Company"),
            logo: img("Company logo", "testimonials", "White or light version, it sits on a dark card."),
            background: img("Background image", "testimonials", "A soft shot from the actual project."),
            audio: fields.url({ label: "Voice note or Loom link (optional)" }),
          }),
          {
            label: "Testimonials",
            description: "Two or more add pagination dots and auto-advance every 8 seconds.",
            itemLabel: (p) => p.fields.name.value || "Quote",
          },
        ),
        expertise: fields.array(
          fields.object({
            animation: fields.select({
              label: "Animation",
              defaultValue: "product-design",
              options: [
                { label: "Website design (browser and cursor)", value: "product-design" },
                { label: "Motion and video (timeline)", value: "motion-and-video" },
                { label: "Brand identity and apps (components)", value: "design-systems" },
              ],
            }),
            title: text("Title"),
            body: text("Line", { multiline: true }),
          }),
          {
            label: "Areas of expertise",
            description: "The animated illustrations below the testimonial. Drag to reorder.",
            itemLabel: (p) => p.fields.title.value || "Area",
          },
        ),
        startHere: fields.array(
          fields.object({ title: text("Title"), body: text("Line"), href: text("Links to", { description: "e.g. /work or /build#xray" }) }),
          { label: "Start here cards", itemLabel: (p) => p.fields.title.value || "Card" },
        ),
        labels: labels("home", {
          currently: "Above the ledger",
          systems: "Above the client list",
          expertise: "Above the animated illustrations",
          startHere: "Above the link cards",
        }),
      },
    }),

    work: singleton({
      label: "Work",
      path: dataPath("work"),
      format,
      schema: {
        heading: text("Heading"),
        intro: text("Intro", { multiline: true }),
        footerNote: text("Note under the list", { multiline: true }),
        projects: fields.array(
          fields.object({
            slug: text("URL slug", { description: "Lowercase with dashes, e.g. ima-accelerator. Used in /work/<slug>." }),
            name: text("Name"),
            nda: fields.checkbox({
              label: "Under NDA",
              description: "Stays in the list with a locked, blurred cover and an NDA label, but the case file can't be opened, even by direct link.",
            }),
            oneLine: text("One line", { multiline: true }),
            tags: fields.array(text("Tag"), { label: "Tags", itemLabel: (p) => p.value || "Tag" }),
            cover: img("Cover thumbnail", "work", "Shown small in the Work list."),
            clientType: text("Client type"),
            year: text("Year"),
            builtWith: text("Built with"),
            liveLabel: text("Live link label", { description: "e.g. imaccelerator.com" }),
            liveHref: fields.url({ label: "Live link" }),
            situation: text("The situation", { multiline: true }),
            built: stringList("What I built (list)", "Item"),
            builtText: text("What I built (sentence)", {
              multiline: true,
              description: "A short intro shown above the list. Works on its own too.",
            }),
            funnel: fields.array(
              fields.object({
                label: text("Step"),
                note: text("Two-line note", { multiline: true }),
                image: img("Screenshot", "work", "Captured at 2x, 16:10 crops best."),
              }),
              { label: "Funnel map", itemLabel: (p) => p.fields.label.value || "Step" },
            ),
            showcase: fields.array(
              fields.object({
                image: img("Image", "work", "Screenshots, mockups, anything. Any height works; WebP keeps saves small."),
                label: text("Caption (optional)"),
                alt: text("Alt text (optional)", { description: "What the image shows, for screen readers and search. Falls back to the caption." }),
              }),
              {
                label: "Showcase",
                description:
                  "Free-form images shown after the funnel map, one after another at full width. No structure needed: add as many as you like and drag to reorder.",
                itemLabel: (p) => p.fields.label.value || "Image",
              },
            ),
            detailLabel: text("Detail heading (optional)", {
              description: "Overrides “One detail worth noticing” for this project only.",
            }),
            detail: text("Detail caption", { multiline: true }),
            detailImage: img("Detail close-up", "work"),
            clientWords: text("Client words", { multiline: true, description: "Only if real." }),
            clientWordsBy: text("Client words, said by", { description: "e.g. Shariq Ansar, Founder of myTpen" }),
            beforeImage: img("Before (optional)", "work", "Add both before and after to show the slider."),
            afterImage: img("After (optional)", "work"),
            beforeCaption: text("Before and after caption"),
          }),
          {
            label: "Case files",
            itemLabel: (p) => `${p.fields.name.value || "Project"}${p.fields.nda.value ? " (NDA)" : ""}`,
          },
        ),
        gallery: fields.array(
          fields.object({
            image: img("Image", "work", "Any height works; it's shown at the column's width."),
            label: text("Label", { description: "A short caption under the image." }),
            alt: text("Alt text", { description: "What the image shows, for screen readers and search." }),
          }),
          {
            label: "Gallery under the note",
            description: "Shown as a two-column grid below the note. Keep it to your strongest 8 or so, and drag to reorder.",
            itemLabel: (p) => p.fields.label.value || p.fields.alt.value || "Image",
          },
        ),
        labels: labels("work", {
          projects: "Above the project list",
          situation: "Case file: the situation",
          built: "Case file: what I built",
          funnel: "Case file: funnel map",
          showcase: "Case file: showcase",
          beforeAfter: "Case file: before and after",
          detail: "Case file: detail heading",
          clientWords: "Case file: client words",
          nda: "NDA badge in the list",
          gallery: "Above the gallery",
        }),
      },
    }),

    build: singleton({
      label: "What I build",
      path: dataPath("build"),
      format,
      schema: {
        heading: text("Heading"),
        intro: text("Intro", { multiline: true }),
        xrayLeadIn: text("X-ray lead-in", { multiline: true }),
        touchpoints: fields.array(
          fields.object({
            name: text("Touchpoint"),
            body: text("What it is and how I approach it", {
              multiline: true,
              description: "One or two short sentences, shown when the step is opened.",
            }),
          }),
          { label: "Funnel X-ray touchpoints", itemLabel: (p) => p.fields.name.value || "Touchpoint" },
        ),
        xrayOutro: text("Under the X-ray", { multiline: true }),
        capabilities: fields.array(
          fields.object({
            icon: fields.select({
              label: "Icon",
              defaultValue: "browsers",
              options: [
                { label: "Browser", value: "browsers" },
                { label: "Checklist", value: "list" },
                { label: "Code", value: "code" },
                { label: "Palette", value: "palette" },
                { label: "People", value: "users" },
                { label: "Book", value: "book" },
                { label: "Pen", value: "pen" },
                { label: "Sparkle", value: "sparkle" },
              ],
            }),
            title: text("Title"),
            body: text("Line", { multiline: true }),
          }),
          { label: "Things I make", itemLabel: (p) => p.fields.title.value || "Tile" },
        ),
        tryLeadIn: text("Try it, lead-in", { multiline: true }),
        bookingCaption: text("Booking card caption"),
        labels: labels("build", {
          xray: "Above the X-ray",
          make: "Above the capability tiles",
          tryIt: "Above the demos",
          calculator: "Demo 1 title",
          application: "Demo 2 title",
          booking: "Demo 3 title",
        }),
      },
    }),

    pricing: singleton({
      label: "Working together",
      path: dataPath("pricing"),
      format,
      schema: {
        heading: text("Heading"),
        intro: text("Intro", { multiline: true }),
        engagements: fields.array(
          fields.object({
            name: text("Name"),
            label: text("Badge", { description: "e.g. Fixed project, Ongoing" }),
            line: text("Line"),
            includes: stringList("Includes", "Item"),
            delivery: text("Delivery (optional)"),
            priceLabel: text("Above the price (optional)", { description: "e.g. Starting at" }),
            price: text("Price", { description: "Real numbers. Don't ship “contact for pricing”." }),
            priceUnit: text("Next to the price (optional)", { description: "e.g. per month, pause or cancel anytime" }),
            cta: text("Button label"),
            style: fields.select({
              label: "Card style",
              defaultValue: "light",
              options: [
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
              ],
            }),
          }),
          { label: "Engagements", itemLabel: (p) => p.fields.name.value || "Engagement" },
        ),
        smallLine: text("Line under the cards", { multiline: true }),
        theMath: text("The math", { multiline: true }),
        teardownTitle: text("Teardown title"),
        teardownBody: text("Teardown body", { multiline: true }),
        teardownCta: text("Teardown button"),
        faq: fields.array(
          fields.object({ q: text("Question"), a: text("Answer", { multiline: true }) }),
          { label: "FAQ", itemLabel: (p) => p.fields.q.value || "Question" },
        ),
        labels: labels("pricing", { math: "Above the calculator", faq: "Above the FAQ" }),
      },
    }),

    about: singleton({
      label: "About",
      path: dataPath("about"),
      format,
      schema: {
        heading: text("Heading"),
        body: stringList("Paragraphs", "Paragraph"),
        collage: fields.array(
          fields.object({
            label: text("Label", { description: "Shown inside the object until a photo is added." }),
            caption: text("Hover caption"),
            image: img("Photo", "about", "Real photos only. Cut-outs on transparent PNG look best."),
            shape: fields.select({
              label: "Shape",
              defaultValue: "photo",
              options: [
                { label: "Polaroid photo", value: "photo" },
                { label: "Square card", value: "square" },
                { label: "Round", value: "round" },
                { label: "Sticker", value: "sticker" },
                { label: "Badge", value: "badge" },
              ],
            }),
            x: fields.integer({ label: "Left (%)", defaultValue: 10 }),
            y: fields.integer({ label: "Top (%)", defaultValue: 10 }),
            w: fields.integer({ label: "Width (px)", defaultValue: 160 }),
            h: fields.integer({ label: "Height (px)", defaultValue: 120 }),
            rotate: fields.integer({ label: "Rotation (degrees)", defaultValue: 0 }),
          }),
          {
            label: "Desk collage",
            description: "Positions are on a 640 by 520 board. Later items sit on top.",
            itemLabel: (p) => p.fields.label.value || "Object",
          },
        ),
        elsewhere: fields.array(
          fields.object({ label: text("Network"), handle: text("Handle"), href: fields.url({ label: "Link (optional)" }) }),
          { label: "Elsewhere", itemLabel: (p) => p.fields.label.value || "Link" },
        ),
        labels: labels("about", { elsewhere: "Above the social links" }),
      },
    }),

    afterHours: singleton({
      label: "Built after hours",
      path: dataPath("after-hours"),
      format,
      schema: {
        heading: text("Heading"),
        intro: text("Intro", { multiline: true }),
        projects: fields.array(
          fields.object({
            name: text("Name"),
            icon: fields.select({
              label: "Icon",
              defaultValue: "plus",
              options: [
                { label: "Hand", value: "hand" },
                { label: "Layout", value: "layout" },
                { label: "Timer", value: "timer" },
                { label: "Cards", value: "cards" },
                { label: "Asterisk", value: "asterisk" },
                { label: "Plus", value: "plus" },
              ],
            }),
            iconImage: img("App icon (optional)", "after-hours", "Replaces the icon above. Square, 96px or larger."),
            href: fields.url({ label: "Link (optional, only if live)" }),
            shot: img("Product shot", "after-hours", "16:10 crops best."),
            body: text("Paragraph", { multiline: true }),
          }),
          { label: "Projects", itemLabel: (p) => p.fields.name.value || "Project" },
        ),
      },
    }),

    notes: singleton({
      label: "Notes",
      path: dataPath("notes"),
      format,
      schema: {
        heading: text("Heading"),
        notes: fields.array(
          fields.object({
            slug: text("URL slug", { description: "Lowercase with dashes. Used in /notes/<slug>." }),
            title: text("Title"),
            readingTime: text("Reading time", { description: "e.g. 3 min read" }),
            date: text("Date"),
            body: text("Essay", { multiline: true, description: "Separate paragraphs with a blank line." }),
          }),
          { label: "Essays", itemLabel: (p) => p.fields.title.value || "Essay" },
        ),
        translatorLeadIn: text("Translator lead-in", { multiline: true }),
        translator: fields.array(
          fields.object({ says: text("What the client says"), changed: text("What actually changed", { multiline: true }) }),
          { label: "Translator cards", itemLabel: (p) => p.fields.says.value || "Card" },
        ),
        translatorClosing: text("Closing line", { multiline: true }),
        labels: labels("notes", { translator: "Above the Translator" }),
      },
    }),
  },
});
