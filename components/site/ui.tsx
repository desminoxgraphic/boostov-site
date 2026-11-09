import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { MessageKey } from "@/lib/contact";
import { Cta } from "@/components/site/cta";

export function Breadcrumbs({ items }: { items: [string, string][] }) {
  return <nav className="crumbs container" aria-label="Fil d’Ariane"><ol><li><Link href="/">Accueil</Link></li>{items.map(([name, href], i) => <li key={href}>{i === items.length - 1 ? <span aria-current="page">{name}</span> : <Link href={href}>{name}</Link>}</li>)}</ol></nav>;
}

/** Inner-page hero (dark): breadcrumbs, eyebrow, H1, lead, gold CTA, optional visual. */
export function PageHero({ crumbs, eyebrow, title, lead, msg, visual, children }: { crumbs?: [string, string][]; eyebrow: string; title: string; lead: string; msg?: MessageKey; visual?: React.ReactNode; children?: React.ReactNode }) {
  return <header className="page-hero">
    {crumbs && <Breadcrumbs items={crumbs} />}
    <div className={`container${visual ? " page-hero-grid" : ""}`} style={{ marginTop: "var(--s-5)" }}>
      <div>
        <span className="eyebrow rise">{eyebrow}</span>
        <h1 className="rise rise-2">{title}</h1>
        <p className="lead rise rise-3">{lead}</p>
        {(msg || children) && <div className="hero-actions rise rise-3" style={{ marginTop: "var(--s-6)" }} data-hero-cta={msg ? "" : undefined}>{msg && <Cta msg={msg} size="lg" />}{children}</div>}
      </div>
      {visual && <div className="page-hero-visual">{visual}</div>}
    </div>
  </header>;
}

/** Gold-outlined price block on a light section. Price comes from pricing.ts via the caller. */
export function Offer({ eyebrow, title, price, note, items, msg, id = "offer-title" }: { eyebrow: string; title: string; price: number; note: string; items: string[]; msg: MessageKey; id?: string }) {
  return <section className="sec sec--light" aria-labelledby={id}><div className="container">
    <div className="offer">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 id={id} className="h2 mt-3">{title}</h2>
        <p className="offer-price"><b>{price}</b><span>DH</span></p>
        <p className="offer-note">{note}</p>
      </div>
      <div className="offer-side">
        <ul className="checks">{items.map((i) => <li key={i}><Check size={20} aria-hidden="true" />{i}</li>)}</ul>
        <Cta msg={msg} size="lg" block />
      </div>
    </div>
  </div></section>;
}

export function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className="link" href={href}>{children}<ArrowRight size={16} aria-hidden="true" /></Link>;
}
