import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Nfc, QrCode, Smartphone, Sparkles, Star } from "lucide-react";
import { PRICING } from "@/src/config/pricing";
import { PRODUCTS, STEPS } from "@/lib/site";
import { Badge, Button, Card, Section, SectionHead, WaButton } from "@/components/site/ui";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const icons = { connect: Smartphone, grow: Star } as const;

export default function Home() {
  const [connect, grow] = PRODUCTS;
  return <>
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <Badge><Nfc size={14} aria-hidden="true" />NFC + QR code · Maroc</Badge>
          <h1 className="display rise">Votre commerce, <span className="accent">à&nbsp;portée de tap.</span></h1>
          <p className="lead rise rise-2">Une carte ou un stand personnalisé sur votre comptoir. Vos clients tapent ou scannent pour vous contacter, laisser un avis et revenir.</p>
          <div className="hero-actions rise rise-3">
            <Button href="/produits" size="lg">Voir les produits<ArrowRight size={18} aria-hidden="true" /></Button>
            <WaButton msg="info" variant="ghost" size="lg">Écrire sur WhatsApp</WaButton>
          </div>
          <div className="hero-meta rise rise-4"><span><Smartphone size={16} aria-hidden="true" />Sans application</span><span><QrCode size={16} aria-hidden="true" />QR si pas de NFC</span></div>
        </div>
        <div className="showcase rise rise-3" aria-label="Écrans réels Boostov, commerce de démonstration">
          <div className="phone phone--back float float-2"><Image src={grow.img.src} alt="Écran réel Boostov Grow : avis client, commerce de démonstration" width={grow.img.w} height={grow.img.h} sizes="240px" /></div>
          <div className="phone phone--front float"><Image src={connect.img.src} alt="Écran réel Boostov Connect : page d’un commerce de démonstration" width={connect.img.w} height={connect.img.h} sizes="240px" priority /></div>
          <span className="showcase-tag showcase-tag--a"><i />Connect · page du commerce</span>
          <span className="showcase-tag showcase-tag--b"><i />Grow · avis et retour</span>
          <p className="showcase-note">Écrans réels · commerce de démonstration</p>
        </div>
      </div>
    </section>

    <Section tone="tint">
      <SectionHead eyebrow="Deux produits" title="Choisissez ce dont votre commerce a besoin." />
      <div className="grid-2">
        {PRODUCTS.map((p) => { const Icon = icons[p.id]; return <Card key={p.id} as="article" interactive className="overview reveal">
          <div className="overview-top"><span className="overview-icon"><Icon size={22} aria-hidden="true" /></span><span className="price-from">dès <b>{p.prices.carte} DH</b></span></div>
          <h3 className="h3">{p.name}</h3>
          <p className="small">{p.summary}</p>
          <Link className="link-arrow" href={`/produits#${p.id}`}>Découvrir {p.name.split(" ")[1]}<ArrowRight size={16} aria-hidden="true" /></Link>
        </Card>; })}
      </div>
    </Section>

    <Section>
      <SectionHead eyebrow="Comment ça marche" title="Prêt en trois étapes." />
      <ol className="grid-3">
        {STEPS.map((s, i) => <li key={s.title} className="step reveal"><span className="step-n">{i + 1}</span><h3>{s.title}</h3><p>{s.copy}</p></li>)}
      </ol>
    </Section>

    <section className="section section--tint flush-top">
      <div className="container">
        <div className="cta-band reveal">
          <div className="stack stack--sm">
            <Badge tone="dark"><Sparkles size={14} aria-hidden="true" />Personnalisé à votre image</Badge>
            <h2 className="h2">Équipez votre comptoir.</h2>
            <p className="lead">Carte ou stand, Connect ou Grow. Commande sur WhatsApp, livraison partout au Maroc (+{PRICING.delivery} DH).</p>
          </div>
          <WaButton msg="info" size="lg">Commander sur WhatsApp</WaButton>
        </div>
      </div>
    </section>
  </>;
}
