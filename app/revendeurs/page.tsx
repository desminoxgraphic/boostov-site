import type { Metadata } from "next";
import { Check, GraduationCap, IdCard, Info, MonitorSmartphone, UserCheck } from "lucide-react";
import { LAUNCH_PRICE_ACTIVE, PRICING } from "@/src/config/pricing";
import { revendeurs as t } from "@/content/pages.fr";
import { fr } from "@/content/fr";
import { pageMeta } from "@/lib/meta";
import { breadcrumb, product } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Cta } from "@/components/site/cta";
import { Photo } from "@/components/site/photo";
import { PageHero } from "@/components/site/ui";
import { FinalCta, SecHead } from "@/components/site/sections";

export const metadata: Metadata = pageMeta({ title: t.title, description: t.description, path: "/revendeurs", og: "revendeurs" });

const kits = [
  { name: "Kit 5", kit: PRICING.kits.kit5, msg: "kit5", featured: false },
  { name: "Kit 10", kit: PRICING.kits.kit10, msg: "kit10", featured: true },
] as const;
const INSIDE_ICONS = [IdCard, MonitorSmartphone, GraduationCap];

export default function Revendeurs() {
  return <>
    <PageHero crumbs={[[t.crumb, "/revendeurs"]]} eyebrow={t.eyebrow} title={t.h1} lead={t.lead} msg="reseller"
      visual={<figure className="kit-photo"><Photo name="kit-cards" alt={t.photoAlt} sizes="(min-width: 960px) 360px, 70vw" priority /></figure>}>
      <p className="hero-note"><UserCheck size={18} aria-hidden="true" />{t.adult}</p>
    </PageHero>

    {/* Les kits */}
    <section className="sec sec--light" aria-labelledby="kits-title"><div className="container">
      <SecHead eyebrow="Les kits" title={t.kitsTitle} id="kits-title" />
      <div className="kits">
        {kits.map((k) => <article key={k.name} className={`tcard kit${k.featured ? " tcard--featured" : ""}`}>
          {LAUNCH_PRICE_ACTIVE && <span className={`tag${k.featured ? "" : " tag--soft"}`}>{t.launch}</span>}
          <div className="tcard-body">
            <h3>{k.name}</h3>
            <p className="kit-count"><b>{k.kit.cartes}</b> {t.cards}</p>
            <ul className="checks">{t.kitItems.map((i) => <li key={i}><Check size={18} aria-hidden="true" />{i}</li>)}</ul>
            <div className="tcard-meta"><p className="tcard-price"><b>{k.kit.price}</b><span>DH</span></p></div>
            <div className="tcard-actions"><Cta msg={k.msg} /></div>
          </div>
        </article>)}
      </div>
      <p className="note"><Info size={18} aria-hidden="true" />{t.noPromise}</p>
    </div></section>

    {/* Contenu */}
    <section className="sec sec--white" aria-labelledby="inside-title"><div className="container">
      <SecHead eyebrow="Contenu" title={t.inside.title} id="inside-title" />
      <ul className="features">{t.inside.items.map(([title, copy], i) => { const Icon = INSIDE_ICONS[i]; return <li key={title} className="feature"><span className="feature-ico"><Icon size={22} aria-hidden="true" /></span><h3>{title}</h3><p>{copy}</p></li>; })}</ul>
    </div></section>

    {/* Étapes */}
    <section className="sec sec--light" aria-labelledby="how-title"><div className="container">
      <SecHead eyebrow="Étapes" title={t.how.title} id="how-title" />
      <ol className="steps">{t.how.steps.map(([title, copy], i) => <li key={title}><span aria-hidden="true">{i + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
    </div></section>

    {/* Pour qui */}
    <section className="sec sec--white" aria-labelledby="who-title"><div className="container split">
      <SecHead eyebrow="Profil" title={t.forWho.title} lead={t.adult} id="who-title" />
      <ul className="checks who-list">{t.forWho.items.map((it) => <li key={it}><Check size={20} aria-hidden="true" />{it}</li>)}</ul>
    </div></section>

    <FinalCta title={t.h1} msg="reseller" text={fr.home.final.text} />

    <JsonLd data={[breadcrumb([[t.crumb, "/revendeurs"]]), product("Kit revendeur Boostov", t.lead, "/og/revendeurs.jpg", kits.map((k) => ({ name: k.name, price: k.kit.price })), "/revendeurs")]} />
  </>;
}
