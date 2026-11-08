import type { Metadata } from "next";
import { Check, Info, UserCheck } from "lucide-react";
import { LAUNCH_PRICE_ACTIVE, PRICING } from "@/src/config/pricing";
import { revendeurs as t } from "@/content/pages.fr";
import { fr } from "@/content/fr";
import { pageMeta } from "@/lib/meta";
import { breadcrumb, product } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Cta } from "@/components/site/cta";
import { Photo } from "@/components/site/photo";
import { Breadcrumbs, Head, PageHero } from "@/components/site/ui";
import { FinalCta } from "@/components/site/sections";

export const metadata: Metadata = pageMeta({ title: t.title, description: t.description, path: "/revendeurs", og: "revendeurs" });

const kits = [
  { name: "Kit 5", kit: PRICING.kits.kit5, msg: "kit5", featured: false },
  { name: "Kit 10", kit: PRICING.kits.kit10, msg: "kit10", featured: true },
] as const;

export default function Revendeurs() {
  return <>
    <JsonLd data={[breadcrumb([[t.crumb, "/revendeurs"]]), product("Kit revendeur Boostov", t.lead, "/og/revendeurs.jpg", kits.map((k) => ({ name: k.name, price: k.kit.price })), "/revendeurs")]} />
    <Breadcrumbs items={[[t.crumb, "/revendeurs"]]} />
    <PageHero eyebrow={t.eyebrow} title={t.h1} lead={t.lead} msg="reseller" visual={<figure className="kit-photo"><Photo name="kit-cards" alt={t.photoAlt} sizes="(min-width: 960px) 360px, 70vw" priority /></figure>}>
      <p className="hero-note"><UserCheck size={18} aria-hidden="true" />{t.adult}</p>
    </PageHero>

    {/* Kits */}
    <section className="section" aria-labelledby="kits-title"><div className="container">
      <Head eyebrow="Les kits" title={t.kitsTitle} id="kits-title" />
      <div className="kits">
        {kits.map((k) => <article key={k.name} className={`pcard kit${k.featured ? " pcard--featured" : ""}`}>
          {LAUNCH_PRICE_ACTIVE && <span className={`badge${k.featured ? "" : " badge--quiet"}`}>{t.launch}</span>}
          <div className="pcard-body">
            <h3>{k.name}</h3>
            <p className="kit-count"><b>{k.kit.cartes}</b> {t.cards}</p>
            <ul className="offer-list">{t.kitItems.map((i) => <li key={i}><Check size={20} aria-hidden="true" />{i}</li>)}</ul>
            <p className="price"><b>{k.kit.price}</b><span>DH</span></p>
            <div className="pcard-actions"><Cta msg={k.msg} /></div>
          </div>
        </article>)}
      </div>
      <p className="note"><Info size={18} aria-hidden="true" />{t.noPromise}</p>
    </div></section>

    {/* Contenu */}
    <section className="section" aria-labelledby="inside-title"><div className="container">
      <Head eyebrow="Contenu" title={t.inside.title} id="inside-title" />
      <ul className="included">{t.inside.items.map(([title, copy]) => <li key={title} className="inc"><span className="inc-ico"><Check size={22} aria-hidden="true" /></span><h3>{title}</h3><p>{copy}</p></li>)}</ul>
    </div></section>

    {/* Étapes */}
    <section className="section" aria-labelledby="how-title"><div className="container">
      <Head eyebrow="Étapes" title={t.how.title} id="how-title" />
      <ol className="steps">{t.how.steps.map(([title, copy], i) => <li key={title}><span aria-hidden="true">{i + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
    </div></section>

    {/* Pour qui */}
    <section className="section" aria-labelledby="who-title"><div className="container who">
      <Head eyebrow="Profil" title={t.forWho.title} id="who-title" lead={t.adult} />
      <ul className="offer-list who-list">{t.forWho.items.map((it) => <li key={it}><Check size={20} aria-hidden="true" />{it}</li>)}</ul>
    </div></section>

    <FinalCta title={t.h1} msg="reseller" text={fr.home.final.text} />
  </>;
}
