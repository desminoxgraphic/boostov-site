import type { Metadata } from "next";
import { PageHero } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Comment boostov.ma traite vos données : pas de formulaire, commandes sur WhatsApp.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false },
};

// Keep this page in sync with reality: list every analytics or tracking tool if one is ever added.
export default function Confidentialite() {
  return <>
    <PageHero eyebrow="Informations · à valider" title="Confidentialité" lead="Ce site ne collecte pas vos données personnelles." />
    <section className="sec sec--light"><div className="container prose-wrap">
      <div className="prose">
        <h2>Pas de formulaire</h2>
        <p>Le site boostov.ma ne contient aucun formulaire et ne vous demande aucune information.</p>
        <h2>Commandes sur WhatsApp</h2>
        <p>Les boutons « Commander sur WhatsApp » ouvrent WhatsApp avec un message prérempli. Les échanges qui suivent se font sur WhatsApp, selon les conditions de WhatsApp.</p>
        <h2>Mesure d’audience</h2>
        <p>Aucun outil de mesure d’audience ni cookie publicitaire n’est utilisé sur ce site.</p>
      </div>
    </div></section>
  </>;
}
