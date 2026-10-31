import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, Plus, X } from "lucide-react";
import { LAUNCH_PRICE_ACTIVE, PRICING } from "@/src/config/pricing";
import { fr } from "@/content/fr";
import { Photo } from "@/components/site/photo";
import { Badge, Button, Section, SectionHead, WaButton } from "@/components/site/ui";

const t = fr.home;

export const metadata: Metadata = {
  title: { absolute: fr.meta.homeTitle },
  description: fr.meta.homeDescription,
  alternates: { canonical: "/" },
  openGraph: { title: fr.meta.homeTitle, description: fr.meta.homeDescription, url: "/" },
};

export default function Home() {
  return <>
    {/* 1. Hero: real product photo above the fold */}
    <section className="hero6">
      <figure className="hero6-media">
        <Photo name="grow-stand" alt={t.hero.photoAlt} sizes="(min-width: 960px) 520px, 100vw" priority />
        <figcaption className="tag">{fr.labels.demo}</figcaption>
      </figure>
      <div className="container hero6-inner">
        <div className="hero6-copy">
          <span className="eyebrow eyebrow--light rise">{t.hero.eyebrow}</span>
          <h1 className="rise rise-2">{t.hero.title}</h1>
          <p className="hero6-lead rise rise-3">{t.hero.lead}</p>
          <p className="hero6-price rise rise-3"><span>{fr.labels.from}</span> <strong>{Math.min(PRICING.connect.carte, PRICING.grow.carte)}</strong> <span>{fr.labels.dh}</span></p>
          <div className="hero6-actions rise rise-4">
            <WaButton msg="info" size="lg">{t.hero.cta}</WaButton>
            <Link className="link-arrow link-arrow--light" href="#produits">{t.hero.secondary}<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>

    {/* 2. Problem and fix */}
    <Section>
      <SectionHead eyebrow={t.problem.eyebrow} title={t.problem.title} intro={t.problem.lead} />
      <div className="fix" role="table" aria-label={t.problem.eyebrow}>
        <div className="fix-head" role="row"><span role="columnheader">{t.problem.before}</span><span role="columnheader">{t.problem.after}</span></div>
        {t.problem.items.map(([before, after]) => <div key={before} className="fix-row reveal" role="row">
          <p className="fix-before" role="cell"><X size={18} aria-hidden="true" />{before}</p>
          <p className="fix-after" role="cell"><Check size={18} aria-hidden="true" />{after}</p>
        </div>)}
      </div>
    </Section>

    {/* 3. The four products */}
    <Section id="produits" tone="tint">
      <SectionHead eyebrow={t.products.eyebrow} title={t.products.title} intro={t.products.lead} />
      <ul className="shelf">
        {t.products.items.map((p) => <li key={p.id} className={`pcard pcard--${p.product.toLowerCase()} reveal`}>
          <figure className={`pcard-media${p.format === "Carte" ? " pcard-media--cutout" : ""}`}>
            <Photo name={p.image as "connect-card"} alt={p.alt} sizes="(min-width: 960px) 280px, 46vw" />
            <figcaption className="tag">{p.format === "Carte" ? fr.labels.example : fr.labels.demo}</figcaption>
          </figure>
          <div className="pcard-body">
            <p className="pcard-name"><b>{p.product}</b> · {p.format}</p>
            <p className="pcard-copy">{p.copy}</p>
            <p className="pcard-price">{p.price}<em>{fr.labels.dh}</em></p>
            <WaButton msg={p.msg as "connectCarte"} block className="btn--compact">{t.products.order}</WaButton>
          </div>
        </li>)}
      </ul>
      <p className="shelf-foot"><span>{fr.labels.delivery}</span><Link className="link-arrow" href="/produits">{t.products.compare}<ArrowRight size={16} aria-hidden="true" /></Link></p>
    </Section>

    {/* 4. How it works */}
    <Section tone="dark">
      <SectionHead eyebrow={t.steps.eyebrow} title={t.steps.title} intro={t.steps.lead} />
      <ol className="steps6">
        {t.steps.items.map((s, i) => <li key={s.title} className="step6 reveal">
          <span className="step6-n" aria-hidden="true">{i + 1}</span>
          <h3>{s.title}</h3>
          <p>{s.copy}</p>
          <p className="step6-action">{s.action}</p>
        </li>)}
      </ol>
      <div className="section-cta"><WaButton msg="info" size="lg">{t.steps.cta}</WaButton></div>
    </Section>

    {/* 5. Stand personalisation */}
    <Section>
      <div className="split6">
        <figure className="split6-media reveal">
          <Photo name="grow-stand-avis" alt={t.stand.photoAlt} sizes="(min-width: 960px) 560px, 100vw" />
          <figcaption className="tag">{fr.labels.example} · {fr.labels.demo}</figcaption>
        </figure>
        <div className="stack">
          <SectionHead eyebrow={t.stand.eyebrow} title={t.stand.title} intro={t.stand.lead} />
          <ul className="check-list">{t.stand.items.map((it) => <li key={it}><Check aria-hidden="true" />{it}</li>)}</ul>
          <div className="price-inline"><span>Stand Connect <b>{PRICING.connect.stand} DH</b></span><span>Stand Grow <b>{PRICING.grow.stand} DH</b></span></div>
          <div><WaButton msg="stand" size="lg">{t.stand.cta}</WaButton></div>
        </div>
      </div>
    </Section>

    {/* 6. Reseller kits teaser */}
    <Section tone="dark">
      <div className="kits6">
        <figure className="kits6-media reveal"><Photo name="kit-cards" alt={t.kits.photoAlt} sizes="(min-width: 960px) 320px, 60vw" /></figure>
        <div className="stack">
          <SectionHead eyebrow={t.kits.eyebrow} title={t.kits.title} intro={t.kits.lead} />
          {LAUNCH_PRICE_ACTIVE && <div><Badge tone="solid">{t.kits.launch}</Badge></div>}
          <div className="kits6-prices">
            <p><span>{t.kits.kit5}</span><strong>{PRICING.kits.kit5.price}<em>{fr.labels.dh}</em></strong></p>
            <p><span>{t.kits.kit10}</span><strong>{PRICING.kits.kit10.price}<em>{fr.labels.dh}</em></strong></p>
          </div>
          <p className="small">{t.kits.adult} +{PRICING.delivery} DH de livraison.</p>
          <div className="kits6-actions">
            <WaButton msg="reseller" size="lg">Précommander un kit</WaButton>
            <Button href="/revendeurs" variant="ghost-dark" size="lg">{t.kits.more}<ArrowRight size={18} aria-hidden="true" /></Button>
          </div>
        </div>
      </div>
    </Section>

    {/* 7. Short FAQ */}
    <Section>
      <div className="faq6">
        <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <div>
          {t.faq.items.map(([q, a]) => <details key={q} className="qa"><summary>{q}<Plus aria-hidden="true" /></summary><p>{a}</p></details>)}
          <Link className="link-arrow" href="/faq">{t.faq.more}<ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </Section>

    {/* 8. Final CTA */}
    <section className="final6">
      <div className="container final6-inner">
        <h2 className="h2">{t.final.title}</h2>
        <p className="lead">{t.final.lead}</p>
        <WaButton msg="info" size="lg">{t.final.cta}</WaButton>
      </div>
    </section>
  </>;
}
