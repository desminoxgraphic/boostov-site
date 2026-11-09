import type { Metadata } from "next";
import { Download, Gift, MapPin, MessageCircle, Nfc, Wrench } from "lucide-react";
import { fr } from "@/content/fr";
import { pageMeta } from "@/lib/meta";
import { breadcrumb, products } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Photo } from "@/components/site/photo";
import { ScrollStory } from "@/components/site/scroll-story";
import { Offer, PageHero } from "@/components/site/ui";
import { Beta, FinalCta, SecHead } from "@/components/site/sections";

const t = fr.grow;
const ICONS = { stand: Nfc, install: Wrench, review: MapPin, wa: MessageCircle, export: Download, reward: Gift } as const;

export const metadata: Metadata = pageMeta({ title: fr.meta.growTitle, description: fr.meta.growDescription, path: "/grow", og: "grow" });

// Illustrative visit pattern (not data): one visit without Grow, regular visits up to the reward with Grow.
const WITHOUT = ["on", "", "", "", "", ""];
const WITH = ["on", "on", "on", "on", "g", "on"];

export default function GrowPage() {
  return <>
    <PageHero crumbs={[[t.crumb, "/grow"]]} eyebrow={t.eyebrow} title={t.title} lead={t.lead} msg="grow"
      visual={<Photo name="render-stand-grow" alt={t.heroAlt} sizes="(min-width: 960px) 440px, 90vw" priority />} />

    {/* Le problème */}
    <section className="sec sec--light" aria-labelledby="pb-title"><div className="container split">
      <SecHead eyebrow={t.problem.eyebrow} title={t.problem.title} lead={t.problem.text} id="pb-title" />
      <div className="visits" role="img" aria-label={t.problem.label}>
        <div className="visits-row"><span>{t.problem.without}</span><div className="visits-track">{WITHOUT.map((v, i) => <i key={i} className={v || undefined} />)}</div></div>
        <div className="visits-row"><span>{t.problem.with}</span><div className="visits-track">{WITH.map((v, i) => <i key={i} className={v || undefined} />)}</div></div>
        <div className="visits-legend" aria-hidden="true"><span><i />{t.problem.visit}</span><span><i className="g" />{t.problem.reward}</span></div>
      </div>
    </div></section>

    {/* Scroll story */}
    <section className="sec sec--light sec--tight-top" aria-labelledby="story-title">
      <div className="container"><SecHead eyebrow={fr.story.eyebrow} title={fr.story.title} lead={fr.story.lead} id="story-title" /></div>
      <ScrollStory />
    </section>

    {/* Ce qui est inclus */}
    <section className="sec sec--white" aria-labelledby="inc-title"><div className="container">
      <SecHead eyebrow={t.included.eyebrow} title={t.included.title} id="inc-title" />
      <ul className="features">
        {t.included.items.map((it) => {
          const Icon = ICONS[it.icon as keyof typeof ICONS];
          return <li key={it.title} className="feature">
            <span className="feature-ico"><Icon size={22} aria-hidden="true" /></span>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
            {"optional" in it && it.optional && <span className="opt">{t.included.optional}</span>}
          </li>;
        })}
      </ul>
    </div></section>

    <Offer eyebrow={t.offer.eyebrow} title={t.offer.title} price={fr.prices.grow} note={`${fr.home.products.oneTime} · ${fr.home.products.install}`} items={t.offer.items} msg="grow" />
    <Beta />
    <FinalCta title={t.final.title} msg="grow" />

    <JsonLd data={[products()[0], breadcrumb([[t.crumb, "/grow"]])]} />
  </>;
}
