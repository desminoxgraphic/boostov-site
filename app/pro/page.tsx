import type { Metadata } from "next";
import { ArrowUpRight, BarChart3, IdCard, LayoutTemplate, Link2, MessageSquareText, Send } from "lucide-react";
import { PRO_DEMO_URL } from "@/src/config/pricing";
import { proPage as t } from "@/content/pages.fr";
import { fr } from "@/content/fr";
import { pageMeta } from "@/lib/meta";
import { breadcrumb, faq, products } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Photo } from "@/components/site/photo";
import { Offer, PageHero } from "@/components/site/ui";
import { Faq, FinalCta, SecHead } from "@/components/site/sections";

const ICONS = { card: IdCard, page: LayoutTemplate, links: Link2, assistant: MessageSquareText, leads: Send, stats: BarChart3 } as const;

export const metadata: Metadata = pageMeta({ title: t.title, description: t.description, path: "/pro", og: "pro" });

export default function ProPage() {
  return <>
    <PageHero crumbs={[[t.crumb, "/pro"]]} eyebrow={t.eyebrow} title={t.h1} lead={t.lead} msg="pro"
      visual={<Photo name="render-card-pro" alt={t.heroAlt} sizes="(min-width: 960px) 440px, 90vw" priority />}>
      {/* Only shown when a real demo URL is set in src/config/pricing.ts. */}
      {PRO_DEMO_URL && <a className="ghost ghost--lg" href={PRO_DEMO_URL} target="_blank" rel="noopener noreferrer">{fr.home.products.demo}<ArrowUpRight size={18} aria-hidden="true" /></a>}
    </PageHero>

    {/* Exemple réel : Desminox */}
    <section className="sec sec--light" aria-labelledby="demo-title"><div className="container split">
      <div className="split-visual"><Photo name="render-phone-pro" alt={t.demo.phoneAlt} sizes="(min-width: 900px) 420px, 80vw" /></div>
      <div>
        <SecHead eyebrow={t.demo.eyebrow} title={t.demo.title} lead={t.demo.lead} id="demo-title" />
        <ol className="points">{t.demo.points.map(([title, text], i) => <li key={title}><span aria-hidden="true">{i + 1}</span><div><b>{title}</b><p>{text}</p></div></li>)}</ol>
      </div>
    </div></section>

    {/* Ce que vous recevez */}
    <section className="sec sec--white" aria-labelledby="inc-title"><div className="container">
      <SecHead eyebrow={t.included.eyebrow} title={t.included.title} id="inc-title" />
      <ul className="features">
        {t.included.items.map((it) => { const Icon = ICONS[it.icon as keyof typeof ICONS]; return <li key={it.title} className="feature"><span className="feature-ico"><Icon size={22} aria-hidden="true" /></span><h3>{it.title}</h3><p>{it.text}</p></li>; })}
      </ul>
    </div></section>

    <Offer eyebrow={t.offer.eyebrow} title={t.offer.title} price={fr.prices.pro} note={fr.home.products.oneTime} items={t.offer.items} msg="pro" />
    <Faq items={t.faq} title={fr.home.faq.title} eyebrow={fr.home.faq.eyebrow} tone="white" more />
    <FinalCta title={t.final} msg="pro" />

    <JsonLd data={[products()[1], breadcrumb([[t.crumb, "/pro"]]), faq(t.faq)]} />
  </>;
}
