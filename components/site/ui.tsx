import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { MessageKey } from "@/lib/contact";
import { Cta } from "@/components/site/cta";

export function Breadcrumbs({ items }: { items: [string, string][] }) {
  return <nav className="crumbs container" aria-label="Fil d’Ariane"><ol><li><Link href="/">Accueil</Link></li>{items.map(([name, href], i) => <li key={href}>{i === items.length - 1 ? <span aria-current="page">{name}</span> : <Link href={href}>{name}</Link>}</li>)}</ol></nav>;
}

/** Inner-page hero: eyebrow, H1, one-line lead, the gold CTA, optional visual on the side. */
export function PageHero({ eyebrow, title, lead, msg, visual, children }: { eyebrow: string; title: string; lead: string; msg?: MessageKey; visual?: React.ReactNode; children?: React.ReactNode }) {
  return <header className="page-hero">
    <div className={`container${visual ? " page-hero-grid" : ""}`}>
      <div>
        <span className="eyebrow rise">{eyebrow}</span>
        <h1 className="rise rise-2">{title}</h1>
        <p className="lead rise rise-3">{lead}</p>
        {(msg || children) && <div className="hero-actions rise rise-4" data-hero-cta={msg ? "" : undefined}>{msg && <Cta msg={msg} size="lg" />}{children}</div>}
      </div>
      {visual && <div className="hero-visual rise rise-3">{visual}</div>}
    </div>
  </header>;
}

export function Head({ eyebrow, title, id, lead, center }: { eyebrow?: string; title: string; id: string; lead?: string; center?: boolean }) {
  return <div className={`head${center ? " head--center" : ""}`}>
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <h2 id={id} className="h2">{title}</h2>
    {lead && <p className="lead">{lead}</p>}
  </div>;
}

/** Gold-bordered price block: price, note, checklist, CTA. Price comes from pricing.ts via the caller. */
export function Offer({ eyebrow, title, price, note, items, msg, id = "offer-title" }: { eyebrow: string; title: string; price: number; note: string; items: string[]; msg: MessageKey; id?: string }) {
  return <section className="section" aria-labelledby={id}><div className="container">
    <div className="offer">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 id={id} className="h2 mt-3">{title}</h2>
        <p className="price mt-5"><b>{price}</b><span>DH</span></p>
        <p className="price-note">{note}</p>
      </div>
      <div className="offer-side">
        <ul className="offer-list">{items.map((i) => <li key={i}><Check size={20} aria-hidden="true" />{i}</li>)}</ul>
        <Cta msg={msg} size="lg" block />
      </div>
    </div>
  </div></section>;
}

export function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className="link" href={href}>{children}<ArrowRight size={16} aria-hidden="true" /></Link>;
}
