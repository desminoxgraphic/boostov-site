import Link from "next/link";
import { ArrowRight, Check, Coffee, Gift, PenTool, Plus, Scissors, Shirt, SprayCan, X } from "lucide-react";
import { BETA_ACTIVE, BETA_PRICE, LAUNCH_PRICE_ACTIVE, PRO_DEMO_URL } from "@/src/config/pricing";
import { fr } from "@/content/fr";
import type { MessageKey } from "@/lib/contact";
import { Cta } from "@/components/site/cta";
import { Photo } from "@/components/site/photo";

const t = fr.home;
const P = fr.prices;

export function SecHead({ eyebrow, title, id, lead, center, children }: { eyebrow?: string; title: string; id: string; lead?: string; center?: boolean; children?: React.ReactNode }) {
  return <div className={`sec-head${center ? " sec-head--center" : ""}`}>
    <div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2 id={id} className="h2">{title}</h2>{lead && <p className="lead">{lead}</p>}</div>
    {children}
  </div>;
}

/** White card overlapping the hero bottom: one row per product, with price. */
export function Bridge() {
  return <div className="bridge-wrap container">
    <nav className="bridge" aria-label="Les trois produits">
      {t.bridge.map((b) => <Link key={b.href} href={b.href}>
        <b>{b.name}</b>
        <p>{b.line}</p>
        <span className="bp"><span>{b.from ? `${t.products.from} ` : ""}{b.price} DH</span><ArrowRight size={18} aria-hidden="true" /></span>
      </Link>)}
    </nav>
  </div>;
}

/** Product cards with designed renders. Horizontal scroll-snap row on mobile. */
export function ProductRail({ headingLevel: H = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const it = t.products.items;
  return <div className="rail">
    <article className="tcard tcard--featured">
      <span className="tag"><Gift size={14} aria-hidden="true" />{t.products.featured}</span>
      <div className="tcard-media tcard-media--dark"><Photo name="render-stand-grow" alt={it.grow.alt} sizes="(min-width: 1000px) 400px, 78vw" /></div>
      <div className="tcard-body">
        <span className="tcard-label">{it.grow.label}</span>
        <H>{it.grow.name}</H>
        <p>{it.grow.text}</p>
        <div className="tcard-meta"><p className="tcard-price"><b>{P.grow}</b><span>DH</span><small>{t.products.oneTime} · {t.products.install}</small></p></div>
        <div className="tcard-actions"><Cta msg="grow" /><Link className="link" href="/grow">{t.products.more}<ArrowRight size={16} aria-hidden="true" /></Link></div>
      </div>
    </article>
    <article className="tcard">
      <div className="tcard-media"><Photo name="render-card-pro" alt={it.pro.alt} sizes="(min-width: 1000px) 400px, 78vw" /></div>
      <div className="tcard-body">
        <span className="tcard-label">{it.pro.label}</span>
        <H>{it.pro.name}</H>
        <p>{it.pro.text}</p>
        <div className="tcard-meta"><p className="tcard-price"><b>{P.pro}</b><span>DH</span><small>{t.products.oneTime}</small></p></div>
        <div className="tcard-actions"><Cta msg="pro" />{PRO_DEMO_URL ? <a className="link" href={PRO_DEMO_URL} target="_blank" rel="noopener noreferrer">{t.products.demo}<ArrowRight size={16} aria-hidden="true" /></a> : <Link className="link" href="/pro">{t.products.more}<ArrowRight size={16} aria-hidden="true" /></Link>}</div>
      </div>
    </article>
    <article className="tcard">
      <div className="tcard-media"><Photo name="render-connect-duo" alt={it.connect.alt} sizes="(min-width: 1000px) 400px, 78vw" /></div>
      <div className="tcard-body">
        <span className="tcard-label">{it.connect.label}</span>
        <H>{it.connect.name}</H>
        <p>{it.connect.text}</p>
        <div className="tcard-meta"><p className="tcard-price"><small>Carte</small><b>{P.connectCarte}</b><span>DH</span></p><p className="tcard-price"><small>Stand</small><b>{P.connectStand}</b><span>DH</span></p></div>
        <div className="tcard-actions"><Cta msg="connect" /><Link className="link" href="/connect">{t.products.more}<ArrowRight size={16} aria-hidden="true" /></Link></div>
      </div>
    </article>
  </div>;
}

const WHO_ICONS = { coffee: Coffee, spray: SprayCan, shirt: Shirt, scissors: Scissors, pen: PenTool } as const;
export function WhoGrid() {
  return <ul className="who-grid">
    {t.who.tiles.map((w) => { const Icon = WHO_ICONS[w.icon as keyof typeof WHO_ICONS]; return <li key={w.name} className="who-tile"><span className="who-ico"><Icon aria-hidden="true" /></span><b>{w.name}</b><span>{w.use}</span></li>; })}
  </ul>;
}

/** Large white comparison table (Grow v2 featured) with one CTA. */
export function Compare() {
  const c = t.compare;
  const cell = (v: string, i: number) => {
    const cls = i === 0 ? "is-featured" : undefined;
    if (v === "y") return <td key={i} className={cls}><Check className="yes" size={20} strokeWidth={2.6} aria-hidden="true" /><span className="sr-only">{c.yes}</span></td>;
    if (v === "n") return <td key={i} className={cls}><X className="no" size={18} aria-hidden="true" /><span className="sr-only">{c.no}</span></td>;
    return <td key={i} className={`txt${cls ? ` ${cls}` : ""}`}>{v}</td>;
  };
  return <div className="compare">
    <div className="compare-scroll">
      <table>
        <caption className="sr-only">{c.title} Comparatif Boostov Grow v2, Pro et Connect</caption>
        <colgroup><col className="c-label" /><col /><col /><col /></colgroup>
        <thead><tr><td />{c.cols.map((col, i) => <th key={col.name} scope="col" className={i === 0 ? "is-featured" : undefined}><b>{col.name}</b><small>{col.kind}</small></th>)}</tr></thead>
        <tbody>
          {c.rows.map(([label, ...vals]) => <tr key={label}><th scope="row">{label}</th>{vals.map(cell)}</tr>)}
          <tr className="price-row"><th scope="row">{c.price}</th><td className="is-featured">{P.grow} DH</td><td>{P.pro} DH</td><td>{P.connectCarte} / {P.connectStand} DH</td></tr>
        </tbody>
      </table>
    </div>
    <div className="compare-foot"><p>{c.foot}</p><Cta msg="info" /></div>
  </div>;
}

export function KitsStrip() {
  const k = t.kits;
  return <div className="kits-strip">
    <div><span className="eyebrow">{k.eyebrow}</span><h2 id="kits-title">{k.title}</h2><p>{k.text}</p></div>
    <div className="kits-pair">
      {[["Kit 5", k.k5], ["Kit 10", k.k10]].map(([name, kit]) => { const kk = kit as typeof k.k5; return <div key={name as string} className="kit-mini"><b>{name as string}</b><span>{kk.price} DH</span><small>{kk.cartes} {k.cards}{LAUNCH_PRICE_ACTIVE ? ` · ${k.launch}` : ""}</small></div>; })}
    </div>
    <Link className="link" href="/revendeurs">{k.link}<ArrowRight size={16} aria-hidden="true" /></Link>
  </div>;
}

/** Beta: a separate, clearly labelled offer. Price only if BETA_PRICE is set in pricing.ts. */
export function Beta() {
  if (!BETA_ACTIVE) return null;
  const b = t.beta;
  return <section className="sec sec--light" aria-labelledby="beta-title"><div className="container">
    <div className="beta">
      <div className="beta-copy">
        <span className="beta-tag">{b.tag}</span>
        <h2 id="beta-title">{b.title}</h2>
        <p>{b.text}</p>
        <p className="beta-note mt-3">{b.note}</p>
      </div>
      <div className="beta-deal">
        <h3>{b.deal}</h3>
        <p className="beta-price">{BETA_PRICE ? b.priceSet.replace("{price}", String(BETA_PRICE)) : b.onRequest}</p>
        <div><p className="beta-note">{b.getLabel}</p><ul className="beta-list mt-3">{b.get.map((g) => <li key={g}><Check size={16} aria-hidden="true" />{g}</li>)}</ul></div>
        <div><p className="beta-note">{b.giveLabel}</p><ul className="beta-list mt-3">{b.give.map((g) => <li key={g}><Check size={16} aria-hidden="true" />{g}</li>)}</ul></div>
        <Cta msg="growBeta" size="lg" />
      </div>
    </div>
  </div></section>;
}

export function Faq({ items, title, eyebrow, more, tone = "light" }: { items: [string, string][]; title: string; eyebrow: string; more?: boolean; tone?: "light" | "white" }) {
  return <section className={`sec sec--${tone}`} aria-labelledby="faq-title"><div className="container faq-2col">
    <SecHead eyebrow={eyebrow} title={title} id="faq-title">{more && <Link className="link" href="/faq">{t.faq.all}<ArrowRight size={16} aria-hidden="true" /></Link>}</SecHead>
    <div className="faq">{items.map(([q, a]) => <details key={q}><summary>{q}<Plus size={22} aria-hidden="true" /></summary><p>{a}</p></details>)}</div>
  </div></section>;
}

export function FinalCta({ title, text, msg = "info" }: { title: string; text?: string; msg?: MessageKey }) {
  return <section className="sec final" aria-labelledby="final-title"><div className="container">
    <h2 id="final-title">{title}</h2>
    {text && <p className="lead">{text}</p>}
    <Cta msg={msg} size="lg" />
  </div></section>;
}
