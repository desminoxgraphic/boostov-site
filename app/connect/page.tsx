import type { Metadata } from "next";
import { Camera, Contact, MapPin, MessageCircle, Palette, QrCode } from "lucide-react";
import { connectPage as t } from "@/content/pages.fr";
import { fr } from "@/content/fr";
import { pageMeta } from "@/lib/meta";
import { breadcrumb, faq, products } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Cta } from "@/components/site/cta";
import { PagePhone } from "@/components/site/page-phone";
import { Photo } from "@/components/site/photo";
import { Breadcrumbs, Head, PageHero } from "@/components/site/ui";
import { CardIll, Faq, FinalCta, StandIll } from "@/components/site/sections";

const ICONS = { wa: MessageCircle, insta: Camera, map: MapPin, save: Contact, qr: QrCode, brand: Palette } as const;

export const metadata: Metadata = pageMeta({ title: t.title, description: t.description, path: "/connect", og: "connect" });

export default function ConnectPage() {
  const f = t.formats;
  return <>
    <JsonLd data={[products()[2], breadcrumb([[t.crumb, "/connect"]]), faq(t.faq)]} />
    <Breadcrumbs items={[[t.crumb, "/connect"]]} />
    <PageHero eyebrow={t.eyebrow} title={t.h1} lead={t.lead} msg="connect" visual={<div className="duo"><PagePhone {...t.phone} /><figure className="duo-photo"><Photo name="connect-card" alt={t.photoAlt} sizes="(min-width: 960px) 200px, 40vw" /></figure></div>} />

    {/* Carte ou stand */}
    <section className="section" aria-labelledby="formats-title"><div className="container">
      <Head eyebrow={f.eyebrow} title={f.title} id="formats-title" />
      <div className="formats">
        {([["carte", f.carte, fr.prices.connectCarte, "connectCarte", <CardIll key="c" />], ["stand", f.stand, fr.prices.connectStand, "connectStand", <StandIll key="s" />]] as const).map(([id, it, price, msg, ill]) => <article key={id} className="pcard">
          <div className="pcard-visual">{ill}</div>
          <div className="pcard-body">
            <h3>{it.name}</h3>
            <p>{it.text}</p>
            <p className="price"><b>{price}</b><span>DH</span></p>
            <p className="price-note">{fr.home.products.oneTime}</p>
            <div className="pcard-actions"><Cta msg={msg} /></div>
          </div>
        </article>)}
      </div>
    </div></section>

    {/* Ce qui s'ouvre */}
    <section className="section" aria-labelledby="inc-title"><div className="container">
      <Head eyebrow={t.included.eyebrow} title={t.included.title} id="inc-title" />
      <ul className="included">
        {t.included.items.map((it) => { const Icon = ICONS[it.icon as keyof typeof ICONS]; return <li key={it.title} className="inc"><span className="inc-ico"><Icon size={22} aria-hidden="true" /></span><h3>{it.title}</h3><p>{it.text}</p></li>; })}
      </ul>
    </div></section>

    <Faq items={t.faq} title={fr.home.faq.title.replace("4", String(t.faq.length))} eyebrow={fr.home.faq.eyebrow} more />
    <FinalCta title={t.final} msg="connect" />
  </>;
}
