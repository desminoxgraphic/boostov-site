import Image from "next/image";
import Link from "next/link";
import { LogIn, Menu, X } from "lucide-react";
import { INSTAGRAM_URL, LOGIN_URL, PHONE_DISPLAY } from "@/lib/contact";
import { NavLinks } from "@/components/site/nav-links";
import { Button, WaButton } from "@/components/site/ui";

function Brand() {
  return <Link href="/" className="brand" aria-label="Boostov, accueil"><Image src="/img/boostov-logo.webp" alt="" width={32} height={32} priority /><span>boostov<span>.ma</span></span></Link>;
}

function InstagramIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
}

export function SiteHeader() {
  return <header className="header">
    <div className="container header-inner">
      <Brand />
      <nav className="nav" aria-label="Navigation principale"><NavLinks /></nav>
      <div className="header-actions">
        <Button href={LOGIN_URL} variant="ghost" className="only-desktop"><LogIn size={16} aria-hidden="true" />Connexion</Button>
        <WaButton msg="info" className="only-desktop">WhatsApp</WaButton>
        <details className="menu">
          <summary aria-label="Menu"><Menu className="i-open" size={20} aria-hidden="true" /><X className="i-close" size={20} aria-hidden="true" /></summary>
          <nav className="menu-panel" aria-label="Menu mobile">
            <NavLinks mobile />
            <Button href={LOGIN_URL} variant="ghost" block><LogIn size={16} aria-hidden="true" />Connexion</Button>
          </nav>
        </details>
      </div>
    </div>
  </header>;
}

export function SiteFooter() {
  return <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-col"><Brand /><p>Cartes et stands NFC + QR code pour les commerces locaux au Maroc.</p></div>
        <div className="footer-col"><b>Site</b><Link href="/produits">Produits</Link><Link href="/revendeurs">Revendeurs</Link><Link href="/faq">FAQ</Link></div>
        <div className="footer-col"><b>Contact</b>
          <WaButton msg="info" variant="ghost-dark">WhatsApp {PHONE_DISPLAY}</WaButton>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><InstagramIcon />@boostov.ma</a>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Boostov</span><span>Powered by boostov.ma</span></div>
    </div>
  </footer>;
}

export function StickyWa() {
  return <div className="sticky-wa"><WaButton msg="info" block size="lg">Commander sur WhatsApp</WaButton></div>;
}
