import Image from "next/image";
import type { Metadata } from "next";
import { Check, Image as ImageIcon, Info, MessageCircle, Nfc, Palette, QrCode, Truck, Type } from "lucide-react";
import { PRICING } from "@/src/config/pricing";
import { PRODUCTS } from "@/lib/site";
import { CardArt, StandArt } from "@/components/site/illustrations";
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
      {PRODUCTS.map((p, i) => <article key={p.id} id={p.id} className={`product${i % 2 ? " product--flip" : ""}`} aria-labelledby={`${p.id}-t`}>
        <div className={`art product-art reveal${p.id === "grow" ? " art--dark" : ""}`}>
          <span className={`tag${p.id === "grow" ? " tag--dark" : ""}`}>Illustration</span>
          <figure><CardArt tone={p.id} /><figcaption>Carte</figcaption></figure>
          <figure><StandArt tone={p.id} /><figcaption>Stand</figcaption></figure>
        </div>
        <div className="product-copy">
          <span className="eyebrow">{p.name}</span>
          <h2 id={`${p.id}-t`} className="h2">{p.tagline}</h2>
          <p className="lead">{p.summary}</p>
          <ul className="feature-list">{p.features.map((f) => <li key={f}><Check size={18} aria-hidden="true" />{f}</li>)}</ul>
          <div className="price-pair">
            <div className="price-box"><span>Carte</span><strong>{p.prices.carte}<em>DH</em></strong></div>
            <div className="price-box"><span>Stand</span><strong>{p.prices.stand}<em>DH</em></strong></div>
          </div>
          <div className="order-row">
            <WaButton msg={p.msg.carte} variant="ghost" block>Commander la carte</WaButton>
            <WaButton msg={p.msg.stand} block>Commander le stand</WaButton>
          </div>
        </div>
      </article>)}

      <div className="notes">
        <p className="note-item"><Truck size={18} aria-hidden="true" />Livraison partout au Maroc : +{PRICING.delivery} DH sur chaque commande.</p>
        <p className="note-item"><Info size={18} aria-hidden="true" />Prix par carte ou par stand. La personnalisation est incluse.</p>
        <p className="note-item"><MessageCircle size={18} aria-hidden="true" />Une question avant de commander ? Écrivez-nous sur WhatsApp.</p>
      </div>
    </Section>

    <Section id="stand" tone="dark">
      <div className="custom">
        <div className="art custom-art reveal">
          <span className="tag">Illustration</span>
          <StandArt tone="connect" callouts />
        </div>
        <div className="custom-side">
          <SectionHead eyebrow="Stand personnalisé" title="Un stand à votre image." intro="Chaque stand est préparé pour un seul commerce. Nous définissons le design avec vous sur WhatsApp." />
          <div className="chips">{custom.map(({ icon: Icon, label }) => <span key={label} className="chip"><Icon size={16} aria-hidden="true" />{label}</span>)}</div>
          <div className="photo-row">
            <figure className="custom-photo">
              <span className="tag tag--photo">Photo réelle</span>
              <Image src="/products/stand-sample.jpg" alt="Photo réelle du stand Boostov vierge, avant personnalisation" width={800} height={1000} sizes="140px" />
            </figure>
            <p>Le stand avant personnalisation. Votre design est appliqué sur la face avant.</p>
          </div>
          <div><WaButton msg="stand" size="lg">Commander un stand personnalisé</WaButton></div>
        </div>
      </div>
    </Section>
  </>;
}
