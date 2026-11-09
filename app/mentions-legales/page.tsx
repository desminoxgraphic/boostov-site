import type { Metadata } from "next";
import { PHONE_DISPLAY } from "@/lib/contact";
import { PageHero } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site boostov.ma.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
};

// TODO (content/TODO.md): add the ICE / registration number when available; page to be validated.
export default function MentionsLegales() {
  return <>
    <PageHero eyebrow="Informations · à valider" title="Mentions légales" lead="Les informations sur l’éditeur du site boostov.ma." />
    <section className="sec sec--light"><div className="container prose-wrap">
      <div className="prose">
        <h2>Éditeur</h2>
        <p>Boostov, Agadir, Maroc.</p>
        <p>Contact : WhatsApp {PHONE_DISPLAY}.</p>
        <h2>Contenu</h2>
        <p>Les écrans de téléphone dessinés sur le site montrent un commerce fictif (« Votre commerce »). L’écran réel de Boostov Grow v2 montre un commerce de démonstration. Aucun visuel ne représente une commande de client.</p>
      </div>
    </div></section>
  </>;
}
