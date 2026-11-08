import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { INSTAGRAM_URL, MESSAGES, PHONE_DISPLAY, waHref } from "@/lib/contact";
import { fr } from "@/content/fr";
import { NavLinks } from "@/components/site/nav-links";
import { CtaBar, PageCta } from "@/components/site/cta";

function Brand() {
  return <Link href="/" className="brand" aria-label={fr.nav.home}>
    {/* eslint-disable-next-line @next/next/no-img-element -- 32px logo; next/image would ship JS for it. */}
    <img src="/img/boostov-logo.webp" alt="" width={32} height={32} /><span>boostov</span></Link>;
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
        <PageCta size="sm" className="header-cta" />
        <details className="menu">
          <summary aria-label={fr.nav.menu}><Menu className="i-open" size={20} aria-hidden="true" /><X className="i-close" size={20} aria-hidden="true" /></summary>
          <nav className="menu-panel" aria-label="Menu mobile"><NavLinks mobile /></nav>
        </details>
      </div>
    </div>
  </header>;
}

export function SiteFooter() {
  const f = fr.footer;
  return <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-col"><Brand /><p>{f.tagline}</p><p>{f.place}</p></div>
        <div className="footer-col"><b>{f.site}</b>
          {fr.nav.items.slice(0, 3).map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
          <Link href="/revendeurs">{f.resellers}</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/blog">Guides</Link>
        </div>
        <div className="footer-col"><b>{f.contact}</b>
          <a href={waHref(MESSAGES.info)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />WhatsApp {PHONE_DISPLAY}</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><InstagramIcon />{f.instagram}</a>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Boostov · {f.place}</span><nav aria-label="Informations légales"><Link href="/mentions-legales">{f.legalNotice}</Link><Link href="/confidentialite">{f.privacy}</Link></nav></div>
    </div>
  </footer>;
}

export { CtaBar };
