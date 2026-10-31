import type { Metadata } from "next";
import { BadgeCheck, Check, GraduationCap, Info, MessageCircle, Package, Store, Truck, UserCheck } from "lucide-react";
import { LAUNCH_PRICE_ACTIVE, PRICING } from "@/src/config/pricing";
import { Badge, Card, PageHead, Section, SectionHead, WaButton } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Devenir revendeur",
  description: `Kit 5 (${PRICING.kits.kit5.price} DH) ou Kit 10 (${PRICING.kits.kit10.price} DH) : cartes, accès au système et formation. Réservé aux 18 ans et plus. Précommande sur WhatsApp.`,
  alternates: { canonical: "/revendeurs" },
  openGraph: { title: "Devenir revendeur Boostov", url: "/revendeurs" },
};

const kits = [
  { name: "Kit 5", kit: PRICING.kits.kit5, msg: "kit5", featured: false },
  { name: "Kit 10", kit: PRICING.kits.kit10, msg: "kit10", featured: true },
] as const;

const steps = [
  { icon: MessageCircle, title: "Précommandez sur WhatsApp", copy: "Choisissez le Kit 5 ou le Kit 10." },
  { icon: Package, title: "Recevez votre kit", copy: `Livraison partout au Maroc, +${PRICING.delivery} DH.` },
  { icon: GraduationCap, title: "Suivez la formation", copy: "Et activez votre accès au système." },
  { icon: Store, title: "Proposez Boostov", copy: "Aux commerces que vous connaissez." },
];

const forWho = ["Vous avez 18 ans ou plus", "Vous connaissez des commerces dans votre ville", "Vous aimez le contact et le terrain"];

export default function Revendeurs() {
  return <>
    <PageHead eyebrow="Revendeurs" title={<>Les kits<br /><span className="accent">revendeur.</span></>} intro="Des cartes Boostov, l’accès au système et une formation, dans un seul kit.">
      <Badge><UserCheck size={14} aria-hidden="true" />Réservé aux 18 ans et plus</Badge>
    </PageHead>

    <Section tone="tint">
      <SectionHead eyebrow="Comparer" title="Kit 5 ou Kit 10." center />
      <div className="compare reveal" role="table" aria-label="Comparaison des kits revendeur">
        {kits.map(({ name, kit, msg, featured }) => <div key={name} className={`compare-col${featured ? " compare-col--featured" : ""}`} role="rowgroup">
          <div className="compare-head" role="row">
            <h3 role="columnheader">{name}</h3>
            {LAUNCH_PRICE_ACTIVE && <Badge tone="solid">Prix de lancement, 10 premiers kits</Badge>}
          </div>
          <div className="compare-row" role="row"><small>Cartes</small><span role="cell"><Check aria-hidden="true" />{kit.cartes} cartes</span></div>
          <div className="compare-row" role="row"><small>Système</small><span role="cell"><Check aria-hidden="true" />Accès inclus</span></div>
          <div className="compare-row" role="row"><small>Formation</small><span role="cell"><Check aria-hidden="true" />Incluse</span></div>
          <div className="compare-price" role="row"><strong role="cell">{kit.price}<em>DH</em></strong><span>+{PRICING.delivery} DH livraison</span></div>
          <div className="compare-cta"><WaButton msg={msg} block variant={featured ? "wa" : "ghost"}>Précommander</WaButton></div>
        </div>)}
      </div>
      <div className="notes">
        <p className="note-item"><Check size={18} aria-hidden="true" />Inclus : les cartes, l’accès au système et la formation.</p>
        <p className="note-item"><Truck size={18} aria-hidden="true" />Non inclus : la livraison, +{PRICING.delivery} DH.</p>
        <p className="note-item"><Info size={18} aria-hidden="true" />Aucun revenu n’est promis ni garanti : vos résultats dépendent de vos ventes.</p>
      </div>
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
          <WaButton msg="reseller" block size="lg">Précommander un kit</WaButton>
        </Card>
      </div>
    </Section>
  </>;
}
