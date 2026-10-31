import type { Metadata, Viewport } from "next";
import { organization } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { SITE_URL } from "@/lib/site";
import { SiteFooter, SiteHeader, StickyWa } from "@/components/site/chrome";
import "./globals.css";

const description = "Cartes et stands NFC + QR code personnalisés pour les commerces locaux au Maroc. Boostov Connect et Boostov Grow, commande sur WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Boostov · Cartes et stands NFC pour commerces au Maroc", template: "%s · Boostov" },
  description,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Boostov", description, url: SITE_URL, siteName: "boostov.ma", locale: "fr_MA", type: "website", images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "Boostov, cartes et stands NFC" }] },
  twitter: { card: "summary_large_image", title: "Boostov", description, images: ["/og/home.jpg"] },
  alternates: { canonical: "/", languages: { "fr-MA": "/", "x-default": "/" } },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };



export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <JsonLd data={organization} />
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
