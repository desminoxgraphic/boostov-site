import type { Metadata } from "next";
import { Check, Info, UserCheck } from "lucide-react";
import { LAUNCH_PRICE_ACTIVE, PRICING } from "@/src/config/pricing";
import { revendeurs as t } from "@/content/pages.fr";
import { pageMeta } from "@/lib/meta";
import { breadcrumb, product } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Photo } from "@/components/site/photo";
import { Badge, Breadcrumbs, PageHero, Section, SectionHead, WaButton } from "@/components/site/ui";

export const metadata: Metadata = pageMeta({ title: t.title, description: t.description, path: "/revendeurs", og: "revendeurs" });

const kits = [
  { name: "Kit 5", kit: PRICING.kits.kit5, msg: "kit5", featured: false },
  { name: "Kit 10", kit: PRICING.kits.kit10, msg: "kit10", featured: true },
] as const;

export default function Revendeurs() {
  return <>
    <JsonLd data={[breadcrumb([["Revendeurs", "/revendeurs"]]), product("Kit revendeur Boostov", t.lead, "/products/kit-cards-500.webp", kits.map((k) => ({ name: k.name, price: k.kit.price })))]} />
    <PageHero eyebrow={t.eyebrow} title={t.h1} intro={t.lead} media={<figure className="kit-photo"><Photo name="kit-cards" alt={t.photoAlt} sizes="(min-width: 960px) 360px, 70vw" priority /></figure>}>
      <p className="hero-note rise rise-4"><UserCheck size={18} aria-hidden="true" />{t.adult}</p>
    </PageHero>
    <Breadcrumbs items={[["Revendeurs", "/revendeurs"]]} />

    <Section tone="tint">
      <SectionHead eyebrow="Les kits" title={t.compareTitle} center />
      {LAUNCH_PRICE_ACTIVE && <p className="center launch"><Badge tone="solid">{t.launch}</Badge></p>}
      <div className="table-wrap reveal">
        <table className="ctable ctable--kits">
          <caption className="sr-only">Comparaison Kit 5 et Kit 10</caption>
          <thead><tr><th scope="col"><span className="sr-only">Contenu</span></th>{kits.map((k) => <th key={k.name} scope="col" className={k.featured ? "is-featured" : undefined}>{k.name}</th>)}</tr></thead>
          <tbody>
            <tr><th scope="row">{t.rows[0]}</th>{kits.map((k) => <td key={k.name} className={k.featured ? "is-featured" : undefined}><b>{k.kit.cartes}</b></td>)}</tr>
            <tr><th scope="row">{t.rows[1]}</th>{kits.map((k) => <td key={k.name} className={k.featured ? "is-featured" : undefined}><Check size={18} aria-label="Inclus" /></td>)}</tr>
            <tr><th scope="row">{t.rows[2]}</th>{kits.map((k) => <td key={k.name} className={k.featured ? "is-featured" : undefined}><Check size={18} aria-label="Incluse" /></td>)}</tr>
            <tr><th scope="row">{t.rows[3]}</th>{kits.map((k) => <td key={k.name} className={k.featured ? "is-featured" : undefined}>Sur WhatsApp</td>)}</tr>
            <tr className="ctable-price"><th scope="row">Prix</th>{kits.map((k) => <td key={k.name} className={k.featured ? "is-featured" : undefined}><strong>{k.kit.price}</strong> DH</td>)}</tr>
            <tr className="ctable-cta"><td />{kits.map((k) => <td key={k.name} className={k.featured ? "is-featured" : undefined}><WaButton msg={k.msg} block variant={k.featured ? "wa" : "ghost"} className="btn--compact">{t.cta}</WaButton></td>)}</tr>
          </tbody>
        </table>
      </div>
      <p className="disclaimer-line"><Info size={18} aria-hidden="true" />{t.noPromise}</p>
    </Section>

    <Section>
      <SectionHead eyebrow="Contenu" title={t.inside.title} />
      <ul className="grid-3">{t.inside.items.map(([title, copy]) => <li key={title} className="feature reveal"><span className="icon-tile"><Check size={22} aria-hidden="true" /></span><h3>{title}</h3><p>{copy}</p></li>)}</ul>
    </Section>

    <Section tone="dark">
      <SectionHead eyebrow="Étapes" title={t.how.title} />
      <ol className="steps6 steps6--4">{t.how.steps.map(([title, copy], i) => <li key={title} className="step6 reveal"><span className="step6-n" aria-hidden="true">{i + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
    </Section>

    <Section>
      <div className="grid-2 grid-2--center">
        <SectionHead eyebrow="Profil" title={t.forWho.title} intro={t.adult} />
        <div className="card card--raised reveal">
          <ul className="check-list check-list--spaced">{t.forWho.items.map((it) => <li key={it}><Check aria-hidden="true" />{it}</li>)}</ul>
          <WaButton msg="reseller" block size="lg">Précommander un kit</WaButton>
        </div>
      </div>
    </Section>
  </>;
}
