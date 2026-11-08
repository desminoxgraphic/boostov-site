import type { Metadata } from "next";
import { ArrowUpRight, Briefcase, Contact, Link2, MessageCircle } from "lucide-react";
import { PRO_DEMO_URL } from "@/src/config/pricing";
import { proPage as t } from "@/content/pages.fr";
import { fr } from "@/content/fr";
import { pageMeta } from "@/lib/meta";
import { breadcrumb, faq, products } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { PagePhone } from "@/components/site/page-phone";
import { Breadcrumbs, Head, Offer, PageHero } from "@/components/site/ui";
import { CardIll, Faq, FinalCta } from "@/components/site/sections";

const ICONS = { contact: MessageCircle, save: Contact, links: Link2, services: Briefcase } as const;

export const metadata: Metadata = pageMeta({ title: t.title, description: t.description, path: "/pro", og: "pro" });

export default function ProPage() {
  return <>
    <JsonLd data={[products()[1], breadcrumb([[t.crumb, "/pro"]]), faq(t.faq)]} />
    <Breadcrumbs items={[[t.crumb, "/pro"]]} />
    <PageHero eyebrow={t.eyebrow} title={t.h1} lead={t.lead} msg="pro" visual={<div className="duo"><PagePhone {...t.phone} dark /><div className="duo-card"><CardIll dark icon="user" /></div></div>}>
      {/* Only shown when a real demo URL is set in src/config/pricing.ts. */}
      {PRO_DEMO_URL && <a className="btn-ghost" href={PRO_DEMO_URL} target="_blank" rel="noopener noreferrer">{fr.home.products.demo}<ArrowUpRight size={16} aria-hidden="true" /></a>}
    </PageHero>

    <section className="section" aria-labelledby="inc-title"><div className="container">
      <Head eyebrow={t.included.eyebrow} title={t.included.title} id="inc-title" />
      <ul className="included included--4">
        {t.included.items.map((it) => { const Icon = ICONS[it.icon as keyof typeof ICONS]; return <li key={it.title} className="inc"><span className="inc-ico"><Icon size={22} aria-hidden="true" /></span><h3>{it.title}</h3><p>{it.text}</p></li>; })}
      </ul>
    </div></section>

    <Offer eyebrow={t.offer.eyebrow} title={t.offer.title} price={fr.prices.pro} note={fr.home.products.oneTime} items={t.offer.items} msg="pro" />
    <Faq items={t.faq} title={fr.home.faq.title.replace("4", String(t.faq.length))} eyebrow={fr.home.faq.eyebrow} more />
    <FinalCta title={t.final} msg="pro" />
  </>;
}
