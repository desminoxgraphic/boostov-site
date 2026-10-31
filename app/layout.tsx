import type { Metadata, Viewport } from "next";
import { PHONE_E164 } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";
import { SiteFooter, SiteHeader, StickyWa } from "@/components/site/chrome";
import "./globals.css";

const description = "Cartes et stands NFC + QR code personnalisés pour les commerces locaux au Maroc. Boostov Connect et Boostov Grow, commande sur WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Boostov · Cartes et stands NFC pour commerces au Maroc", template: "%s · Boostov" },
  description,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Boostov", description, url: SITE_URL, siteName: "boostov.ma", locale: "fr_MA", type: "website", images: [{ url: "/boostov-logo.png", alt: "Boostov" }] },
  twitter: { card: "summary", title: "Boostov", description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Boostov",
  url: SITE_URL,
  logo: `${SITE_URL}/boostov-logo.png`,
  sameAs: ["https://www.instagram.com/boostov.ma/"],
  contactPoint: [{ "@type": "ContactPoint", telephone: PHONE_E164, contactType: "customer service", areaServed: "MA", availableLanguage: ["fr", "ar"] }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </head>
      <body>
        <a className="skip" href="#contenu">Aller au contenu</a>
        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
        <StickyWa />
      </body>
    </html>
  );
}
