import type { Metadata } from "next";
import { Download, Gift, MapPin, MessageCircle, Nfc, Wrench } from "lucide-react";
import { fr } from "@/content/fr";
import { pageMeta } from "@/lib/meta";
import { breadcrumb, faq, products } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Cta } from "@/components/site/cta";
import { Phone } from "@/components/site/phone";
import { Photo } from "@/components/site/photo";
import { ScrollStory } from "@/components/site/scroll-story";
import { Breadcrumbs, Offer } from "@/components/site/ui";
import { Faq, FinalCta } from "@/components/site/sections";

const t = fr.grow;
const ICONS = { stand: Nfc, install: Wrench, review: MapPin, wa: MessageCircle, export: Download, reward: Gift } as const;

export const metadata: Metadata = pageMeta({ title: fr.meta.growTitle, description: fr.meta.growDescription, path: "/grow", og: "grow" });

// Visits over 6 weeks: one-off visit without Grow, regular visits up to the reward with Grow. Illustrative, not data.
const WITHOUT = [1, 0, 0, 0, 0, 0];
const WITH = [1, 1, 1, 1, 2, 1];

export default function GrowPage() {
  return <>
    <JsonLd data={[products()[0], breadcrumb([[t.crumb, "/grow"]]), faq(t.faq)]} />
    <Breadcrumbs items={[[t.crumb, "/grow"]]} />

    {/* Hero */}
    <header className="page-hero">
      <div className="container page-hero-grid">
        <div>
          <span className="eyebrow rise">{t.eyebrow}</span>
          <h1 className="rise rise-2">{t.title}</h1>
          <p className="lead rise rise-3">{t.lead}</p>
          <div className="hero-actions rise rise-4" data-hero-cta><Cta msg="grow" size="lg" /></div>
        </div>
        <div className="hero-visual rise rise-3"><Phone state="hero" label={fr.home.hero.phoneLabel} /></div>
      </div>
    </header>

    {/* Le problème */}
    <section className="section" aria-labelledby="pb-title"><div className="container problem">
      <div className="head" style={{ marginBottom: 0 }}>
        <span className="eyebrow">{t.problem.eyebrow}</span>
        <h2 id="pb-title" className="h2">{t.problem.title}</h2>
        <p className="lead">{t.problem.text}</p>
      </div>
      <div className="visits" role="img" aria-label={t.problem.label}>
        <div className="visits-row"><span>{t.problem.without}</span><div className="visits-track">{WITHOUT.map((v, i) => <i key={i} className={v ? "on" : undefined} />)}</div></div>
        <div className="visits-row"><span>{t.problem.with}</span><div className="visits-track">{WITH.map((v, i) => <i key={i} className={v === 2 ? "on g" : v ? "on" : undefined} />)}</div></div>
        <div className="visits-legend" aria-hidden="true"><span>● {t.problem.visit}</span><span className="gold">● {t.problem.reward}</span></div>
      </div>
    </div></section>

    {/* Scroll story */}
    <ScrollStory />

    {/* Ce qui est inclus */}
    <section className="section" aria-labelledby="inc-title"><div className="container">
      <div className="head"><span className="eyebrow">{t.included.eyebrow}</span><h2 id="inc-title" className="h2">{t.included.title}</h2></div>
      <ul className="included">
        {t.included.items.map((it) => {
          const Icon = ICONS[it.icon as keyof typeof ICONS];
          return <li key={it.title} className="inc">
            <span className="inc-ico"><Icon size={22} aria-hidden="true" /></span>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
            {"optional" in it && it.optional && <span className="tag">{t.included.optional}</span>}
          </li>;
        })}
      </ul>
    </div></section>

    {/* Real screen */}
    <section className="section" aria-labelledby="screen-title"><div className="container real-screen">
      <div className="head" style={{ marginBottom: 0 }}>
        <span className="eyebrow">{t.screen.eyebrow}</span>
        <h2 id="screen-title" className="h2">{t.screen.title}</h2>
        <p className="lead">{t.screen.text}</p>
      </div>
      <figure>
        <div className="phone"><div className="screen"><Photo name="grow-v2-card" alt={t.screen.alt} sizes="300px" /></div></div>
        <figcaption>{t.screen.caption}</figcaption>
      </figure>
    </div></section>

    <Offer eyebrow={t.offer.eyebrow} title={t.offer.title} price={fr.prices.grow} note={`${fr.home.products.oneTime} · ${fr.home.products.install}`} items={t.offer.items} msg="grow" />
    <Faq items={t.faq} title={fr.home.faq.title} eyebrow={fr.home.faq.eyebrow} more />
    <FinalCta title={t.final.title} msg="grow" />
  </>;
}
