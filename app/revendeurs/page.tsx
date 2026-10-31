import type { Metadata } from "next";
import { BadgeCheck, Check, CreditCard, GraduationCap, Info, LayoutDashboard, MessageCircle, Package, Store, UserCheck } from "lucide-react";
import { LAUNCH_PRICE_ACTIVE, PRICING } from "@/src/config/pricing";
import { Badge, Card, PageHead, Section, SectionHead, WaButton } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Devenir revendeur",
  description: `Kit 5 (${PRICING.kits.kit5.price} DH) ou Kit 10 (${PRICING.kits.kit10.price} DH) : cartes, accès au système et formation. Réservé aux 18 ans et plus. Précommande sur WhatsApp.`,
  alternates: { canonical: "/revendeurs" },
  openGraph: { title: "Devenir revendeur Boostov", url: "/revendeurs" },
};

const kits = [
  { name: "Kit 5", kit: PRICING.kits.kit5, msg: "kit5" },
  { name: "Kit 10", kit: PRICING.kits.kit10, msg: "kit10", featured: true },
] as const;

const gets = [
  { icon: CreditCard, title: "Des cartes Boostov", copy: "5 ou 10 cartes selon le kit choisi." },
  { icon: LayoutDashboard, title: "Accès au système", copy: "L’accès au système Boostov inclus dans le kit." },
  { icon: GraduationCap, title: "Une formation", copy: "Pour comprendre les produits et les présenter aux commerces." },
];

const steps = [
  { icon: MessageCircle, title: "Précommandez sur WhatsApp", copy: "Choisissez le Kit 5 ou le Kit 10." },
  { icon: Package, title: "Recevez votre kit", copy: `Livraison partout au Maroc, +${PRICING.delivery} DH.` },
  { icon: GraduationCap, title: "Suivez la formation", copy: "Et activez votre accès au système." },
  { icon: Store, title: "Proposez Boostov", copy: "Aux commerces que vous connaissez." },
];

const forWho = ["Vous avez 18 ans ou plus", "Vous connaissez des commerces dans votre ville", "Vous aimez le contact et le terrain"];

export default function Revendeurs() {
  return <>
    <PageHead eyebrow="Revendeurs" title={<>Proposez Boostov<br /><span className="accent">dans votre ville.</span></>} intro="Un kit pour démarrer : des cartes, l’accès au système et une formation.">
      <Badge><UserCheck size={14} aria-hidden="true" />Réservé aux 18 ans et plus</Badge>
    </PageHead>

    <Section tone="tint">
      <SectionHead eyebrow="Les kits" title="Deux kits pour commencer." />
      <div className="grid-2">
        {kits.map(({ name, kit, msg, ...k }) => <Card key={name} as="article" raised className={`kit reveal${"featured" in k ? " kit--featured" : ""}`}>
          <div className="kit-head"><h3>{name}</h3>{LAUNCH_PRICE_ACTIVE && <Badge tone="solid">Prix de lancement, 10 premiers kits</Badge>}</div>
          <p className="kit-price">{kit.price}<em>DH</em></p>
          <ul className="check-list">
            <li><Check aria-hidden="true" />{kit.cartes} cartes</li>
            <li><Check aria-hidden="true" />Accès au système</li>
            <li><Check aria-hidden="true" />Formation</li>
          </ul>
          <WaButton msg={msg} block size="lg">Précommander le {name}</WaButton>
        </Card>)}
      </div>
      <p className="disclaimer"><Info size={20} aria-hidden="true" />Aucun revenu n’est promis ni garanti : vos résultats dépendent uniquement de vos ventes. Livraison +{PRICING.delivery} DH.</p>
    </Section>

    <Section>
      <SectionHead eyebrow="Ce que vous recevez" title="Tout est dans le kit." />
      <div className="grid-3">{gets.map(({ icon: Icon, title, copy }) => <div key={title} className="feature reveal"><span className="icon-tile"><Icon size={22} aria-hidden="true" /></span><h3>{title}</h3><p>{copy}</p></div>)}</div>
    </Section>

    <Section tone="dark">
      <SectionHead eyebrow="Comment ça marche" title="De la précommande au terrain." />
      <ol className="grid-2">{steps.map(({ icon: Icon, title, copy }, i) => <li key={title} className="feature reveal"><span className="icon-tile"><Icon size={22} aria-hidden="true" /></span><h3>{i + 1}. {title}</h3><p>{copy}</p></li>)}</ol>
    </Section>

    <Section>
      <div className="grid-2 grid-2--center">
        <SectionHead eyebrow="Pour qui ?" title="Le bon profil." intro="Ce programme est réservé aux personnes majeures." />
        <Card raised className="reveal">
          <ul className="check-list check-list--spaced">{forWho.map((t) => <li key={t}><BadgeCheck aria-hidden="true" />{t}</li>)}</ul>
          <WaButton msg="reseller" block size="lg">Poser une question</WaButton>
        </Card>
      </div>
    </Section>
  </>;
}
