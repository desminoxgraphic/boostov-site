import type { Metadata } from "next";
import { Gift, Smartphone } from "lucide-react";
import { fr } from "@/content/fr";
import { pageMeta } from "@/lib/meta";
import { faq, products } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Cta } from "@/components/site/cta";
import { Phone } from "@/components/site/phone";
import { ScrollStory } from "@/components/site/scroll-story";
import { BetaBanner, Faq, FinalCta, ProductCards } from "@/components/site/sections";

const t = fr.home;

export const metadata: Metadata = pageMeta({ title: fr.meta.homeTitle, description: fr.meta.homeDescription, path: "/", og: "home" });

export default function Home() {
  return <>
    <JsonLd data={[...products(), faq(t.faq.items)]} />

    {/* 1. Hero */}
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <h1 className="rise">{t.hero.title[0]} <span className="grad">{t.hero.title[1]}</span></h1>
          <p className="hero-sub rise rise-2">{t.hero.sub}</p>
          <div className="hero-actions rise rise-3" data-hero-cta><Cta msg="info" size="lg" /></div>
        </div>
        <div className="hero-visual rise rise-3">
          <Phone state="hero" label={t.hero.phoneLabel} />
          <span className="hero-chip hero-chip--a" aria-hidden="true"><Gift />{t.hero.chipA}</span>
          <span className="hero-chip hero-chip--b" aria-hidden="true"><Smartphone />{t.hero.chipB}</span>
        </div>
      </div>
    </section>

    {/* 2. Scroll story */}
    <ScrollStory />

    {/* 3. Products */}
    <section id="produits" className="section" aria-labelledby="produits-title"><div className="container">
      <div className="head"><span className="eyebrow">{t.products.eyebrow}</span><h2 id="produits-title" className="h2">{t.products.title}</h2></div>
      <ProductCards />
    </div></section>

    {/* 4. Beta */}
    <BetaBanner />

    {/* 5. FAQ */}
    <Faq items={t.faq.items} title={t.faq.title} eyebrow={t.faq.eyebrow} more />

    {/* 6. Final CTA */}
    <FinalCta title={t.final.title} text={t.final.text} />
  </>;
}
