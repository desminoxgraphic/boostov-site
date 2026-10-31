import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PRICING } from "@/src/config/pricing";
import { stands as t } from "@/content/pages.fr";
import { pageMeta } from "@/lib/meta";
import { breadcrumb, product } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Photo } from "@/components/site/photo";
import { StandPreview } from "@/components/site/stand-preview";
import { Breadcrumbs, PageHero, Section, SectionHead, WaButton } from "@/components/site/ui";

export const metadata: Metadata = pageMeta({ title: t.title, description: t.description, path: "/stands", og: "stands" });

const options = [
  { name: "Stand Connect", line: "« Contactez-nous » : votre page de contact.", price: PRICING.connect.stand, msg: "connectStand", image: "connect-stand", alt: "Stand NFC Boostov Connect « Contactez-nous » (visuel de démonstration)" },
  { name: "Stand Grow", line: "« Donnez votre avis » : avis Google et fidélité.", price: PRICING.grow.stand, msg: "growStand", image: "grow-stand-avis", alt: "Stand NFC Boostov Grow « Donnez votre avis » (visuel de démonstration)" },
] as const;

export default function Stands() {
  return <>
    <JsonLd data={[breadcrumb([["Stands", "/stands"]]), ...options.map((o) => product(`Boostov ${o.name}`, o.line, `/products/${o.image}-1080.webp`, [{ name: o.name, price: o.price }]))]} />
    <PageHero eyebrow={t.eyebrow} title={t.h1} intro={t.lead} media={<figure className="hero-photo"><Photo name="grow-stand" alt="Stand NFC Boostov personnalisé sur un comptoir (visuel de démonstration)" sizes="(min-width: 960px) 460px, 92vw" priority /><figcaption className="tag">Visuel de démonstration · Exemple de personnalisation</figcaption></figure>}>
      <div className="hero-prices rise rise-4">{options.map((o) => <p key={o.name}><span>{o.name}</span><strong>{o.price} DH</strong></p>)}</div>
    </PageHero>
    <Breadcrumbs items={[["Stands", "/stands"]]} />

    <Section>
      <SectionHead eyebrow="Personnalisation" title="Ce qui est personnalisé." intro="Chaque stand est préparé pour un seul commerce. Nous définissons le design avec vous sur WhatsApp." />
      <ul className="parts">{t.parts.map(([title, copy], i) => <li key={title} className="part reveal"><span className="part-n">{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></li>)}</ul>
    </Section>

    <Section id="apercu" tone="tint">
      <SectionHead eyebrow={t.preview.eyebrow} title={t.preview.title} intro={t.preview.lead} />
      <StandPreview />
    </Section>

    <Section>
      <SectionHead eyebrow="Deux stands" title="Connect ou Grow." intro="Le même stand, deux usages : être contacté, ou obtenir des avis et faire revenir vos clients." />
      <div className="grid-2">{options.map((o) => <article key={o.name} className="format reveal">
        <figure className="format-media"><Photo name={o.image} alt={o.alt} sizes="(min-width: 720px) 45vw, 92vw" /><figcaption className="tag">Visuel de démonstration</figcaption></figure>
        <div className="format-body">
          <p className="format-name">{o.name}</p>
          <p className="small">{o.line}</p>
          <p className="format-price">{o.price}<em>DH</em></p>
          <WaButton msg={o.msg} block>Commander le {o.name}</WaButton>
        </div>
      </article>)}</div>
      <ul className="notes"><li className="note-item"><Check size={18} aria-hidden="true" />Personnalisation incluse. Livraison partout au Maroc : +{PRICING.delivery} DH.</li></ul>
    </Section>
  </>;
}
