import { VSL } from "@/components/agents/content";
import { realEstate } from "@/content/real-estate";
import { site, socials } from "@/content/site";
import { videoGuide } from "@/content/video-guide";

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
        // Other names people search with: the handles and the studio pairings.
        alternateName: [
          "Sarib",
          "Sarib UX",
          "sarib.ux",
          "Sarib Khan Xtarc",
          "Sarib Xtarc",
          "Sarib Xtarc Agency",
          "Xtarc Agency Sarib",
          "Sarib Khan Xtarc Agency",
          "saribgraphy",
        ],
        image: new URL("/audits/sarib.webp", site.url).toString(),
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
        // The studio's own site; this site is its co-founder's.
        url: "https://xtarc.agency/",
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
        sameAs: ["https://xtarc.agency/", ...sameAs],
      },
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        name: site.name,
        alternateName: ["Sarib Khan · Xtarc Agency", "saribkhan.com", "sarib.xtarc.agency"],
        url,
        inLanguage: "en",
        publisher: { "@id": org },
        about: { "@id": person },
        keywords: expertiseTerms.join(", "),
      },
    ],
  };
}

/**
 * schema.org JSON-LD for /real-estate: the page, the service it offers (provided
 * by the person on the homepage), its video and the breadcrumb.
 */
export function realEstateStructuredData() {
  const home = new URL("/", site.url).toString();
  const url = new URL(realEstate.path, site.url).toString();
  const poster = new URL(VSL.poster, site.url).toString();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${realEstate.title} · ${site.name}`,
        description: realEstate.description,
        inLanguage: "en",
        isPartOf: { "@id": `${home}#website` },
        about: { "@id": `${url}#service` },
        primaryImageOfPage: { "@type": "ImageObject", url: poster },
        video: { "@id": `${url}#video` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "AI assistant for real estate agents",
        serviceType: "AI lead response and showing booking for real estate agents",
        description: realEstate.description,
        url,
        provider: { "@type": "Person", "@id": `${home}#person`, name: site.name, url: home },
        areaServed: { "@type": "Country", name: "United States" },
        audience: { "@type": "BusinessAudience", audienceType: "Real estate agents, teams and brokers" },
      },
      {
        "@type": "VideoObject",
        "@id": `${url}#video`,
        name: "Every lead gets an answer in seconds",
        description: realEstate.videoLabel.replace(/^Video: /, ""),
        thumbnailUrl: [poster],
        uploadDate: "2026-11-21",
        duration: "PT1M21S",
        contentUrl: VSL.src,
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: home },
          { "@type": "ListItem", position: 2, name: "Real estate", item: url },
        ],
      },
    ],
  };
}

/**
 * schema.org JSON-LD for the free video guide: the article (written by the
 * person on the homepage), its example video and the breadcrumb.
 */
export function videoGuideStructuredData() {
  const home = new URL("/", site.url).toString();
  const url = new URL(videoGuide.path, site.url).toString();
  const poster = new URL(videoGuide.example.poster, site.url).toString();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: videoGuide.metaTitle,
        description: videoGuide.description,
        url,
        mainEntityOfPage: url,
        inLanguage: "en",
        datePublished: "2026-11-23",
        image: new URL("/guides/claude-video/share.jpg", site.url).toString(),
        author: { "@type": "Person", "@id": `${home}#person`, name: site.name, url: home },
        publisher: { "@type": "Person", "@id": `${home}#person` },
        isPartOf: { "@id": `${home}#website` },
        video: { "@id": `${url}#video` },
        about: ["Claude Code", "HyperFrames", "Motion design", "Video sales letters", "Product demo videos"],
      },
      {
        "@type": "VideoObject",
        "@id": `${url}#video`,
        name: "An 81-second VSL made with Claude",
        description: videoGuide.example.label,
        thumbnailUrl: [poster],
        uploadDate: "2026-11-21",
        duration: "PT1M21S",
        contentUrl: videoGuide.example.src,
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: home },
          { "@type": "ListItem", position: 2, name: "Free guide: animated UI videos with Claude", item: url },
        ],
      },
    ],
  };
}

/**
 * schema.org ProfilePage for /about: the page Google can treat as the
 * reference profile for "Sarib Khan", pointing at the same person as the homepage.
 */
export function aboutStructuredData() {
  const home = new URL("/", site.url).toString();
  const url = new URL("/about", site.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    name: `About ${site.name}`,
    inLanguage: "en",
    isPartOf: { "@id": `${home}#website` },
    mainEntity: {
      "@type": "Person",
      "@id": `${home}#person`,
      name: site.name,
      alternateName: ["Sarib", "Sarib Khan Xtarc", "Sarib Xtarc"],
      jobTitle: JOB_TITLE,
      description: site.description,
      url: home,
      image: new URL("/audits/sarib.webp", site.url).toString(),
      worksFor: { "@type": "Organization", "@id": `${home}#xtarc`, name: "Xtarc", url: "https://xtarc.agency/" },
      sameAs,
    },
  };
}

/** Renders JSON-LD safely inside a script tag (no `</script>` breakouts). */
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
