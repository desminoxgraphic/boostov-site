import Link from "next/link";
import { ArrowRight, Gift, Nfc, Plus, UserRound } from "lucide-react";
import { PRO_DEMO_URL } from "@/src/config/pricing";
import { fr } from "@/content/fr";
import { Cta } from "@/components/site/cta";

const t = fr.home;
const P = fr.prices;

function Price({ value, note }: { value: number; note?: string }) {
  return <div><p className="price"><b>{value}</b><span>DH</span></p>{note && <p className="price-note">{note}</p>}</div>;
}

/* Product illustrations: clean placeholders until real photos arrive (see content/TODO.md). */
export function StandIll({ label = "Boostov" }: { label?: string }) {
  return <div className="ill-stand" aria-hidden="true"><div className="ill-mark"><Nfc /><b>{label}</b></div></div>;
}
export function CardIll({ dark, icon = "nfc" }: { dark?: boolean; icon?: "nfc" | "user" }) {
  return <div className={`ill-card${dark ? " ill-card--dark" : ""}`} aria-hidden="true"><div className="ill-mark">{icon === "user" ? <UserRound /> : <Nfc />}<b>Boostov</b></div></div>;
}

export function ProductCards({ headingLevel: H = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const it = t.products.items;
  return <div className="products">
    <article className="pcard pcard--featured">
      <span className="badge"><Gift size={14} aria-hidden="true" />{t.products.featured}</span>
      <div className="pcard-visual"><StandIll /></div>
      <div className="pcard-body">
        <p className="eyebrow">{it.grow.kind}</p>
        <H>{it.grow.name}</H>
        <p>{it.grow.text}</p>
        <Price value={P.grow} note={`${t.products.oneTime} · ${t.products.install}`} />
        <div className="pcard-actions"><Cta msg="grow" /><Link className="link" href="/grow">{t.products.more}<ArrowRight size={16} aria-hidden="true" /></Link></div>
      </div>
    </article>
    <article className="pcard">
      <div className="pcard-visual"><CardIll dark icon="user" /></div>
      <div className="pcard-body">
        <p className="eyebrow">{it.pro.kind}</p>
        <H>{it.pro.name}</H>
        <p>{it.pro.text}</p>
        <Price value={P.pro} note={t.products.oneTime} />
        <div className="pcard-actions"><Cta msg="pro" />{PRO_DEMO_URL ? <a className="link" href={PRO_DEMO_URL} target="_blank" rel="noopener noreferrer">{t.products.demo}<ArrowRight size={16} aria-hidden="true" /></a> : <Link className="link" href="/pro">{t.products.more}<ArrowRight size={16} aria-hidden="true" /></Link>}</div>
      </div>
    </article>
    <article className="pcard">
      <div className="pcard-visual"><div className="ill-pair"><CardIll /><StandIll /></div></div>
      <div className="pcard-body">
        <p className="eyebrow">{it.connect.kind}</p>
        <H>{it.connect.name}</H>
        <p>{it.connect.text}</p>
        <div className="price-alt"><div><p className="price-note">{t.products.carte}</p><Price value={P.connectCarte} /></div><div><p className="price-note">{t.products.stand}</p><Price value={P.connectStand} /></div></div>
        <div className="pcard-actions"><Cta msg="connect" /><Link className="link" href="/connect">{t.products.more}<ArrowRight size={16} aria-hidden="true" /></Link></div>
      </div>
    </article>
  </div>;
}

export function BetaBanner() {
  const b = t.beta;
  return <section className="section section--tight" aria-labelledby="beta-title"><div className="container">
    <div className="beta">
      <div>
        <span className="beta-tag">{b.tag}</span>
        <h2 id="beta-title">{b.title}</h2>
        <p>{b.text}</p>
        <div className="beta-slots" role="img" aria-label={b.slots}>{[1, 2, 3].map((n) => <i key={n}><Plus aria-hidden="true" /></i>)}</div>
      </div>
      <Cta msg="growBeta" size="lg" />
    </div>
  </div></section>;
}

export function Faq({ items, title, eyebrow, more }: { items: [string, string][]; title: string; eyebrow: string; more?: boolean }) {
  return <section className="section" aria-labelledby="faq-title"><div className="container">
    <div className="head head--center"><span className="eyebrow">{eyebrow}</span><h2 id="faq-title" className="h2">{title}</h2></div>
    <div className="faq">
      {items.map(([q, a]) => <details key={q}><summary>{q}<Plus size={22} aria-hidden="true" /></summary><p>{a}</p></details>)}
    </div>
    {more && <p className="head--center" style={{ display: "grid", marginTop: "var(--s-5)" }}><Link className="link" href="/faq">{t.faq.all}<ArrowRight size={16} aria-hidden="true" /></Link></p>}
  </div></section>;
}

export function FinalCta({ title, text, msg = "info" }: { title: string; text?: string; msg?: Parameters<typeof Cta>[0]["msg"] }) {
  return <section className="final container" aria-labelledby="final-title">
    <h2 id="final-title">{title}</h2>
    {text && <p className="lead">{text}</p>}
    <Cta msg={msg} size="lg" />
  </section>;
}
