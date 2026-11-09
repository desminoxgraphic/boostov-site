import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Camera, Check, Contact, MapPin, MessageCircle, Palette, QrCode } from "lucide-react";
import { connectPage as t } from "@/content/pages.fr";
import { fr } from "@/content/fr";
import { pageMeta } from "@/lib/meta";
import { breadcrumb, faq, products } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Cta } from "@/components/site/cta";
import { Photo } from "@/components/site/photo";
import { PageHero } from "@/components/site/ui";
import { Faq, FinalCta, SecHead } from "@/components/site/sections";

const ICONS = { wa: MessageCircle, insta: Camera, map: MapPin, save: Contact, qr: QrCode, brand: Palette } as const;

export const metadata: Metadata = pageMeta({ title: t.title, description: t.description, path: "/connect", og: "connect" });

export default function ConnectPage() {
  const f = t.formats;
  const formats = [
    { id: "carte", it: f.carte, price: fr.prices.connectCarte, msg: "connectCarte", img: "render-card-connect" },
    { id: "stand", it: f.stand, price: fr.prices.connectStand, msg: "connectStand", img: "render-stand-connect" },
  ] as const;
  return <>
    <PageHero crumbs={[[t.crumb, "/connect"]]} eyebrow={t.eyebrow} title={t.h1} lead={t.lead} msg="connect"
      visual={<Photo name="render-connect-duo" alt={t.heroAlt} sizes="(min-width: 960px) 440px, 90vw" priority />} />

    {/* Carte ou stand */}
    <section className="sec sec--light" aria-labelledby="formats-title"><div className="container">
      <SecHead eyebrow={f.eyebrow} title={f.title} id="formats-title" />
      <div className="rail rail--2">
        {formats.map((x) => <article key={x.id} className="tcard">
          <div className="tcard-media"><Photo name={x.img} alt={x.it.alt} sizes="(min-width: 1000px) 600px, 78vw" /></div>
          <div className="tcard-body">
            <h3>{x.it.name}</h3>
            <p>{x.it.text}</p>
            <div className="tcard-meta"><p className="tcard-price"><b>{x.price}</b><span>DH</span><small>{fr.home.products.oneTime}</small></p></div>
            <div className="tcard-actions"><Cta msg={x.msg} /></div>
          </div>
        </article>)}
      </div>
    </div></section>

    {/* Ce que reçoit le client */}
    <section className="sec sec--white" aria-labelledby="rcv-title"><div className="container split">
      <div className="split-visual"><Photo name="render-phone-connect" alt={t.receive.phoneAlt} sizes="(min-width: 900px) 420px, 80vw" /></div>
      <div>
        <SecHead eyebrow={t.receive.eyebrow} title={t.receive.title} id="rcv-title" />
        <ul className="mini-features">
          {t.receive.items.map((it) => { const Icon = ICONS[it.icon as keyof typeof ICONS]; return <li key={it.title}><span className="feature-ico"><Icon size={20} aria-hidden="true" /></span><div><b>{it.title}</b><p>{it.text}</p></div></li>; })}
        </ul>
      </div>
    </div></section>

    {/* Connect ou Grow v2 */}
    <section className="sec sec--dark" aria-labelledby="diff-title"><div className="container">
      <SecHead eyebrow={t.diff.eyebrow} title={t.diff.title} id="diff-title" />
      <div className="diff">
        {[t.diff.connect, t.diff.grow].map((d, i) => <div key={d.name} className={`diff-card${i === 1 ? " diff-card--grow" : ""}`}>
          <b>{d.name}</b><p>{d.line}</p>
          <ul className="checks">{d.points.map((pt) => <li key={pt}><Check size={18} aria-hidden="true" />{pt}</li>)}</ul>
          {i === 1 && <Link className="link" href="/grow">{t.diff.more}<ArrowRight size={16} aria-hidden="true" /></Link>}
        </div>)}
      </div>
    </div></section>

    <Faq items={t.faq} title={fr.home.faq.title} eyebrow={fr.home.faq.eyebrow} more />
    <FinalCta title={t.final} msg="connect" />

    <JsonLd data={[products()[2], breadcrumb([[t.crumb, "/connect"]]), faq(t.faq)]} />
  </>;
}
