import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Package, Smartphone, Star, Store } from "lucide-react";
import { PRICING } from "@/src/config/pricing";
import { STEPS } from "@/lib/site";
import { CardArt, StandArt, StepArt } from "@/components/site/illustrations";
import { Badge, Button, Section, SectionHead, WaButton } from "@/components/site/ui";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const entries = [
  { href: "/produits#connect", icon: Smartphone, title: "Connect", copy: "Votre page de contact en un tap." },
  { href: "/produits#grow", icon: Star, title: "Grow", copy: "Avis, partage et retour client." },
  { href: "/produits#stand", icon: Store, title: "Stands", copy: "Personnalisés à vos couleurs." },
  { href: "/revendeurs", icon: Package, title: "Revendeurs", copy: "Kits de 5 ou 10 cartes." },
];

export default function Home() {
  return <>
    <section className="hero">
      <div className="container hero-inner">
        <Badge tone="dark">Cartes et stands NFC + QR · Maroc</Badge>
        <h1 className="rise">Un tap.<br /><span>Votre commerce.</span></h1>
        <p className="lead rise rise-2">Vos clients tapent ou scannent au comptoir pour vous contacter, laisser un avis et revenir.</p>
        <div className="hero-actions rise rise-3">
          <WaButton msg="info" size="lg">Commander sur WhatsApp</WaButton>
          <Button href="/produits" variant="ghost-dark" size="lg">Voir les produits<ArrowRight size={18} aria-hidden="true" /></Button>
        </div>
        <div className="hero-art rise rise-4">
          <div className="art-card float"><CardArt tone="connect" /></div>
          <div className="art-stand float float-2"><StandArt tone="grow" /></div>
          <span className="tag tag--dark">Illustration</span>
        </div>
      </div>
    </section>

    <div className="container entry">
      <nav className="entry-grid" aria-label="Accès rapide">
        {entries.map(({ href, icon: Icon, title, copy }) => <Link key={title} href={href} className="entry-card">
          <span className="icon-tile"><Icon size={20} aria-hidden="true" /></span>
          <b>{title}<ArrowRight size={16} aria-hidden="true" /></b>
          <span>{copy}</span>
        </Link>)}
      </nav>
    </div>

    <Section>
      <SectionHead eyebrow="Comment ça marche" title="Prêt en trois étapes." />
      <ol className="grid-3">
        {STEPS.map((s, i) => <li key={s.title} className="step-card reveal">
          <div className="art"><span className="tag">Illustration</span><StepArt step={(i + 1) as 1 | 2 | 3} /></div>
          <h3><span className="step-n">{i + 1}</span>{s.title}</h3>
          <p>{s.copy}</p>
        </li>)}
      </ol>
    </Section>

    <section className="section flush-top">
      <div className="container">
        <div className="cta-band reveal">
          <div className="stack stack--sm">
            <h2 className="h2">Équipez votre comptoir.</h2>
            <p className="lead">Carte ou stand, Connect ou Grow. Commande sur WhatsApp, livraison partout au Maroc (+{PRICING.delivery} DH).</p>
          </div>
          <WaButton msg="info" size="lg">Commander sur WhatsApp</WaButton>
        </div>
      </div>
    </section>
  </>;
}
