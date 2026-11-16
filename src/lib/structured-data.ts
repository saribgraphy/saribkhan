import { site, socials } from "@/content/site";

/** What the studio does, in the words people search with. Feeds knowsAbout and keywords. */
export const expertiseTerms = [
  "Funnel design",
  "Landing page design",
  "Sales page design",
  "Coaching brand websites",
  "Skool community design",
  "Internal tools for coaches",
  "Web design",
  "Next.js development",
  "Claude Code",
];

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
        jobTitle: site.tagline,
        description: site.description,
        url,
        email: `mailto:${site.email}`,
        telephone: `+${site.whatsapp.number}`,
        address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "PK" },
        worksFor: { "@id": org },
        knowsAbout: expertiseTerms,
        sameAs: socials.map((s) => s.href),
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
        address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: "Sindh", addressCountry: "PK" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.email,
          telephone: `+${site.whatsapp.number}`,
          url: new URL("/contact", site.url).toString(),
          availableLanguage: ["English", "Urdu"],
          areaServed: "Worldwide",
        },
        knowsAbout: expertiseTerms,
        sameAs: socials.map((s) => s.href),
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
