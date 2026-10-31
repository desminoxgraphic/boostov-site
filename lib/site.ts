// Site copy shared by several pages. Prices always come from src/config/pricing.ts.
import { PRICING } from "@/src/config/pricing";
import type { MessageKey } from "@/lib/contact";

export const SITE_URL = "https://boostov.ma";

export const PRODUCTS = [
  {
    id: "connect",
    name: "Boostov Connect",
    tagline: "Votre commerce, en un tap.",
    summary: "Un tap ou un scan ouvre la page de votre commerce : appel, WhatsApp, Instagram, itinéraire et contact enregistré.",
    features: ["Appel, WhatsApp, Instagram et Maps en un geste", "Bouton « Enregistrer le contact »", "Galerie ou catalogue", "Informations modifiables sans changer la carte"],
    img: { src: "/img/connect-profile.webp", w: 390, h: 844 },
    prices: PRICING.connect,
    msg: { carte: "connectCarte", stand: "connectStand" } as Record<"carte" | "stand", MessageKey>,
  },
  {
    id: "grow",
    name: "Boostov Grow",
    tagline: "Chaque visite peut en amener une autre.",
    summary: "Après l’achat, le client tape et suit un parcours simple : avis Google, partage avec ses proches, récompense pour revenir.",
    features: ["Avis Google, toujours optionnel", "Partage avec ses proches", "Récompense à usage unique pour la prochaine visite", "Tableau de bord pour suivre les interactions"],
    img: { src: "/img/grow-review.webp", w: 520, h: 1125 },
    prices: PRICING.grow,
    msg: { carte: "growCarte", stand: "growStand" } as Record<"carte" | "stand", MessageKey>,
  },
] as const;

export const STEPS = [
  { title: "Nous programmons", copy: "Votre carte ou votre stand est configuré avec la page de votre commerce." },
  { title: "Vous le posez au comptoir", copy: "Là où vos clients paient, bien visible." },
  { title: "Vos clients tapent ou scannent", copy: "NFC ou QR code : votre page s’ouvre, sans application." },
] as const;

export const FAQ: { group: string; items: [string, string][] }[] = [
  {
    group: "Commande et livraison",
    items: [
      ["Comment commander ?", "Touchez un bouton « Commander » : WhatsApp s’ouvre avec le produit déjà écrit. Nous confirmons ensuite les détails et le paiement avec vous."],
      ["Combien coûte la livraison ?", `+${PRICING.delivery} DH sur chaque commande, partout au Maroc.`],
    ],
  },
  {
    group: "Produits",
    items: [
      ["Que comprend la personnalisation ?", "Votre logo, vos couleurs, votre QR code et le texte de votre choix (nom, slogan, réseaux). Le design est défini avec vous sur WhatsApp."],
      ["Et si le téléphone n’a pas le NFC ?", "Le QR code imprimé ouvre exactement la même page. Le client le scanne avec l’appareil photo."],
      ["Faut-il installer une application ?", "Non. La page s’ouvre directement dans le navigateur du téléphone."],
      ["Puis-je modifier ma page après la commande ?", "Oui. Vos informations et liens peuvent changer sans remplacer la carte ou le stand."],
    ],
  },
  {
    group: "Revendeurs",
    items: [
      ["Comment devenir revendeur ?", "Précommandez le Kit 5 ou le Kit 10 sur WhatsApp. Réservé aux personnes de 18 ans et plus."],
      ["Combien vais-je gagner ?", "Nous ne promettons aucun revenu. Vos résultats dépendent uniquement de vos ventes."],
    ],
  },
];
