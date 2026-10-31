import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { PHONE_E164 } from "@/lib/contact";
import "./globals.css";

const title = "Boostov | Cartes et stands NFC + QR pour commerces au Maroc";
const description = "Boostov Connect et Boostov Grow : cartes et stands personnalisés NFC + QR code pour les commerces locaux au Maroc. Commande sur WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL("https://boostov.ma"),
  title,
  description,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: { title, description, url: "https://boostov.ma", siteName: "boostov.ma", locale: "fr_MA", type: "website" },
};

export const viewport: Viewport = { themeColor: "#040d2b", width: "device-width", initialScale: 1 };

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Boostov",
  url: "https://boostov.ma",
  logo: "https://boostov.ma/boostov-logo.png",
  sameAs: ["https://www.instagram.com/boostov.ma/"],
  contactPoint: [{ "@type": "ContactPoint", telephone: PHONE_E164, contactType: "customer service", areaServed: "MA", availableLanguage: ["fr", "ar"] }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/bricolage-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/jakarta-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </head>
      <body className="antialiased"><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}
