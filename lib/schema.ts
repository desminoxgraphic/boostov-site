// JSON-LD builders. Only true data: names, prices and contact come from the same sources as the visible copy.
import { INSTAGRAM_URL, PHONE_E164 } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";
import { PRICING } from "@/src/config/pricing";

const ORG_ID = `${SITE_URL}/#organization`;

export const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Boostov",
  url: SITE_URL,
  logo: `${SITE_URL}/boostov-logo.png`,
  sameAs: [INSTAGRAM_URL],
  address: { "@type": "PostalAddress", addressLocality: "Agadir", addressCountry: "MA" },
  contactPoint: [{ "@type": "ContactPoint", telephone: PHONE_E164, contactType: "sales", areaServed: "MA", availableLanguage: ["fr", "ar"], contactOption: "WhatsApp" }],
};


export function product(name: string, description: string, image: string, offers: { name: string; price: number }[], path?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    ...(path ? { url: `${SITE_URL}${path}` } : {}),
    description,
    image: `${SITE_URL}${image}`,
    brand: { "@type": "Brand", name: "Boostov" },
    offers: offers.map((o) => ({ "@type": "Offer", name: o.name, price: o.price, priceCurrency: "MAD", ...(path ? { url: `${SITE_URL}${path}` } : {}), seller: { "@id": ORG_ID } })),
  };
}

/** The three products, prices from src/config/pricing.ts. */
export function products() {
  const { grow, pro, connect } = PRICING;
  return [
    product("Boostov Grow v2", "Stand de fidélité NFC et QR code pour commerces : points à chaque visite, récompense choisie par le commerçant, rappel WhatsApp, avis Google optionnel. Installation incluse.", "/og/grow.jpg", [{ name: "Stand Grow v2", price: grow.stand }], "/grow"),
    product("Boostov Pro", "Carte NFC pour freelances et professionnels avec une page personnelle : contact, liens et services.", "/og/pro.jpg", [{ name: "Carte Pro", price: pro.carte }], "/pro"),
    product("Boostov Connect", "Carte ou stand NFC et QR code qui ouvre la page du commerce : WhatsApp, Instagram, localisation, contact.", "/og/connect.jpg", [{ name: "Carte Connect", price: connect.carte }, { name: "Stand Connect", price: connect.stand }], "/connect"),
  ];
}

export function breadcrumb(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Accueil", "/"] as [string, string], ...items].map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITE_URL}${path}` })),
  };
}

export function faq(items: [string, string][]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
}

export function article(a: { title: string; description: string; slug: string; published: string; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.published,
    dateModified: a.published,
    image: `${SITE_URL}${a.image}`,
    mainEntityOfPage: `${SITE_URL}/blog/${a.slug}`,
    author: { "@type": "Organization", name: "Boostov", url: SITE_URL },
    publisher: { "@id": ORG_ID },
    inLanguage: "fr-MA",
  };
}
