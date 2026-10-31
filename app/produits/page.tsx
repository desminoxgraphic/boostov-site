import Image from "next/image";
import type { Metadata } from "next";
import { Check, Nfc, Palette, QrCode, Truck, Type, Image as ImageIcon } from "lucide-react";
import { PRICING } from "@/src/config/pricing";
import { PRODUCTS } from "@/lib/site";
import { PageHead, Section, SectionHead, WaButton } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Produits : Connect et Grow",
  description: `Boostov Connect (carte ${PRICING.connect.carte} DH, stand ${PRICING.connect.stand} DH) et Boostov Grow (carte ${PRICING.grow.carte} DH, stand ${PRICING.grow.stand} DH). Stand personnalisé avec logo, couleurs et QR code.`,
  alternates: { canonical: "/produits" },
  openGraph: { title: "Produits Boostov : Connect et Grow", url: "/produits" },
};

const custom = [
  { icon: ImageIcon, label: "Votre logo" },
  { icon: Palette, label: "Vos couleurs" },
  { icon: QrCode, label: "Votre QR code" },
  { icon: Nfc, label: "Puce NFC" },
  { icon: Type, label: "Nom, slogan, réseaux" },
];

export default function Produits() {
  return <>
    <PageHead eyebrow="Produits" title={<>Connect et Grow.<br /><span className="accent">En carte ou en stand.</span></>} intro="Deux produits, deux formats. Chaque carte et chaque stand est personnalisé pour votre commerce." />

    <Section>
      {PRODUCTS.map((p, i) => <div key={p.id}>
        {i > 0 && <div className="divider" />}
        <article id={p.id} className={`product${i % 2 ? " product--flip" : ""}`} aria-labelledby={`${p.id}-t`}>
          <figure className="product-visual reveal">
            <div className="phone"><Image src={p.img.src} alt={`Écran réel ${p.name}, commerce de démonstration`} width={p.img.w} height={p.img.h} sizes="240px" priority={i === 0} /></div>
            <figcaption>Écran réel · commerce de démonstration</figcaption>
          </figure>
          <div className="product-copy">
            <span className="eyebrow">{p.name}</span>
            <h2 id={`${p.id}-t`} className="h2">{p.tagline}</h2>
            <p className="lead">{p.summary}</p>
            <ul className="feature-list">{p.features.map((f) => <li key={f}><Check size={18} aria-hidden="true" />{f}</li>)}</ul>
            <div className="options">
              {(["carte", "stand"] as const).map((fmt) => <div key={fmt} className="option">
                <span className="option-name">{fmt === "carte" ? "Carte" : "Stand"}<small>{fmt === "carte" ? "Format carte bancaire" : "Posé sur le comptoir"}</small></span>
                <span className="option-price">{p.prices[fmt]}<em>DH</em></span>
                <WaButton msg={p.msg[fmt]} block variant={fmt === "carte" ? "ghost" : "wa"}>Commander {fmt === "carte" ? "la carte" : "le stand"}</WaButton>
              </div>)}
            </div>
          </div>
        </article>
      </div>)}
      <p className="note mt-7"><Truck size={20} aria-hidden="true" />Livraison partout au Maroc : +{PRICING.delivery} DH sur chaque commande.</p>
    </Section>

    <Section id="stand" tone="dark">
      <div className="stand">
        <div className="stand-stage reveal">
          <figure className="stand-main figure-reset">
            <Image src="/products/stand-sample.jpg" alt="Photo réelle du stand Boostov vierge, avant personnalisation" width={800} height={1000} sizes="(min-width: 960px) 560px, 100vw" />
            <span className="hotspot" style={{ left: "38%", top: "26%" }}><i /><b /><span>Votre logo</span></span>
            <span className="hotspot hotspot--l" style={{ left: "41%", top: "37%" }}><i /><b /><span>QR code</span></span>
            <span className="hotspot" style={{ left: "47%", top: "50%" }}><i /><b /><span>Puce NFC</span></span>
            <span className="hotspot hotspot--l" style={{ left: "40%", top: "74%" }}><i /><b /><span>Vos couleurs</span></span>
          </figure>
          <figure className="stand-inset figure-reset">
            <Image src="/products/stand-counter.jpg" alt="Photo réelle du stand vierge posé sur une table" width={640} height={800} sizes="200px" />
            <span>Sur le comptoir</span>
          </figure>
          <p className="stand-caption">Photos réelles du stand vierge. Les points indiquent les zones personnalisées.</p>
        </div>
        <div className="stack">
          <SectionHead eyebrow="Stand personnalisé" title="Un stand à votre image." intro="Chaque stand est préparé pour un seul commerce. Nous définissons le design avec vous sur WhatsApp." />
          <div className="chips">{custom.map(({ icon: Icon, label }) => <span key={label} className="chip"><Icon size={16} aria-hidden="true" />{label}</span>)}</div>
          <div><WaButton msg="stand" size="lg">Commander un stand personnalisé</WaButton></div>
        </div>
      </div>
    </Section>
  </>;
}
