import Link from "next/link";
import type { Metadata } from "next";
import { fr } from "@/content/fr";
import { pageMeta } from "@/lib/meta";
import { faq, products } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Cta } from "@/components/site/cta";
import { Photo } from "@/components/site/photo";
import { ScrollStory } from "@/components/site/scroll-story";
import { Beta, Bridge, Compare, Faq, FinalCta, KitsStrip, ProductRail, SecHead, WhoGrid } from "@/components/site/sections";

const t = fr.home;

export const metadata: Metadata = pageMeta({ title: fr.meta.homeTitle, description: fr.meta.homeDescription, path: "/", og: "home" });

export default function Home() {
  return <>
    {/* 2. Hero */}
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="rise">{t.hero.title[0]} <span className="grad">{t.hero.title[1]}</span></h1>
          <p className="hero-sub rise rise-2">{t.hero.sub}</p>
          <div className="hero-actions rise rise-3" data-hero-cta><Cta msg="info" size="lg" /><Link className="ghost ghost--lg" href="#produits">{t.hero.ghost}</Link></div>
        </div>
        <div className="hero-visual"><Photo name="render-phone-loyalty" alt={t.hero.phoneAlt} sizes="(min-width: 960px) 440px, 88vw" priority /></div>
      </div>
    </section>

    {/* 3. Overlapping card + 4. Comment ça marche (light) */}
    <div className="sec--light">
      <Bridge />
      <section className="sec" aria-labelledby="story-title">
        <div className="container"><SecHead eyebrow={fr.story.eyebrow} title={fr.story.title} lead={fr.story.lead} id="story-title" /></div>
        <ScrollStory />
      </section>
    </div>

    {/* 5. Products */}
    <section id="produits" className="sec sec--light sec--tight-top" aria-labelledby="produits-title"><div className="container">
      <SecHead eyebrow={t.products.eyebrow} title={t.products.title} id="produits-title" />
      <ProductRail />
    </div></section>

    {/* 6. Pour qui */}
    <section className="sec sec--white" aria-labelledby="who-title"><div className="container">
      <SecHead eyebrow={t.who.eyebrow} title={t.who.title} id="who-title" />
      <WhoGrid />
    </div></section>

    {/* 7. Comparatif (dark) */}
    <section className="sec sec--dark" aria-labelledby="compare-title"><div className="container">
      <SecHead eyebrow={t.compare.eyebrow} title={t.compare.title} lead={t.compare.lead} id="compare-title" />
      <Compare />
    </div></section>

    {/* 8. Revendeurs */}
    <section className="sec sec--light" aria-labelledby="kits-title"><div className="container"><KitsStrip /></div></section>

    {/* 9. Beta */}
    <Beta />

    {/* 10. FAQ + final CTA */}
    <Faq items={t.faq.items} title={t.faq.title} eyebrow={t.faq.eyebrow} tone="white" more />
    <FinalCta title={t.final.title} text={t.final.text} />

    {/* Structured data last, so text tools read the page content first. */}
    <JsonLd data={[...products(), faq(t.faq.items)]} />
  </>;
}
