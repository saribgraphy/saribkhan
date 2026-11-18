import { site, socials } from "@/content/site";

/** What the studio does, in the words people search with. Feeds knowsAbout and keywords. */
export const expertiseTerms = [
  "Brand identity",
  "Web design",
  "Landing page design",
  "Funnel design",
  "Custom software",
  "Internal tools",
  "AI automation",
  "Claude Code",
  "Next.js development",
  "Static ads",
  "Social media content",
  "Video editing",
  "Motion design",
];

/** How the person is described to search engines and AI assistants. */
const JOB_TITLE = "Designer and builder, co-founder of Xtarc";
const sameAs = [...socials.map((s) => s.href), "https://www.youtube.com/@scalewithsarib"];

/**
 * schema.org JSON-LD for the homepage: the person (Sarib Khan), the studio
 * (Xtarc) with its contact point and address, and the website itself.
 */
export function homeStructuredData() {
  const url = new URL("/", site.url).toString();
  const person = `${url}#person`;
  const org = `${url}#xtarc`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": person,
        name: site.name,
        // Other names people search with: the Instagram handle and the studio pairing.
        alternateName: ["Sarib UX", "sarib.ux", "Sarib Khan Xtarc", "Sarib Xtarc Agency", "saribgraphy"],
        jobTitle: JOB_TITLE,
        description: site.description,
        url,
        email: `mailto:${site.email}`,
        worksFor: { "@id": org },
        knowsAbout: expertiseTerms,
        sameAs,
      },
      {
        "@type": "Organization",
        "@id": org,
        name: "Xtarc",
        alternateName: ["Xtarc Agency", "Sarib Khan Studio"],
        url,
        logo: new URL("/icon.svg", site.url).toString(),
        description: site.description,
        founder: { "@id": person },
        email: site.email,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.email,
          url: new URL("/contact", site.url).toString(),
          availableLanguage: ["English"],
          areaServed: "Worldwide",
        },
        knowsAbout: expertiseTerms,
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        name: site.name,
        alternateName: ["Sarib Khan · Xtarc Agency", "sarib.xtarc.agency"],
        url,
        inLanguage: "en",
        publisher: { "@id": org },
        about: { "@id": person },
        keywords: expertiseTerms.join(", "),
      },
    ],
  };
}

/** Renders JSON-LD safely inside a script tag (no `</script>` breakouts). */
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
