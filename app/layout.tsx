import type { Metadata, Viewport } from "next";
import { organization } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { SITE_URL } from "@/lib/site";
import { fr } from "@/content/fr";
import { CtaBar, SiteFooter, SiteHeader } from "@/components/site/chrome";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: fr.meta.homeTitle, template: "%s · Boostov" },
  description: fr.meta.homeDescription,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Boostov", description: fr.meta.homeDescription, url: SITE_URL, siteName: "boostov.ma", locale: "fr_MA", type: "website", images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "Boostov, la tech qui fait grandir votre business" }] },
  twitter: { card: "summary_large_image", title: "Boostov", description: fr.meta.homeDescription, images: ["/og/home.jpg"] },
  alternates: { canonical: "/", languages: { "fr-MA": "/", "x-default": "/" } },
};

export const viewport: Viewport = { themeColor: "#07090F", colorScheme: "dark", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preload" href="/fonts/bricolage-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <JsonLd data={organization} />
      </head>
      <body>
        <a className="skip" href="#contenu">Aller au contenu</a>
        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
        <CtaBar />
      </body>
    </html>
  );
}
