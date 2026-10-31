import type { Metadata } from "next";
import { PHONE_DISPLAY } from "@/lib/contact";
import { Badge, PageHead, Section } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site boostov.ma.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
};

// TODO (content/TODO.md): add the ICE / registration number when available; page to be validated.
export default function MentionsLegales() {
  return <>
    <PageHead eyebrow="Informations" title="Mentions légales" intro="Les informations sur l’éditeur du site boostov.ma."><Badge>À valider</Badge></PageHead>
    <Section>
      <div className="prose">
        <h2>Éditeur</h2>
        <p>Boostov, Agadir, Maroc.</p>
        <p>Contact : WhatsApp {PHONE_DISPLAY}.</p>
        <h2>Contenu</h2>
        <p>Les visuels marqués « Visuel de démonstration » ou « Exemple de personnalisation » sont des exemples et non des photos de commandes de clients.</p>
      </div>
    </Section>
  </>;
}
