// French copy for /produits, /stands, /revendeurs and /faq. Same rules as content/fr.ts:
// prices only from src/config/pricing.ts, unconfirmed facts omitted (see content/TODO.md).
import { PRICING } from "@/src/config/pricing";

const { connect, grow, delivery, kits } = PRICING;

export const produits = {
  title: "Carte NFC Connect ou Grow : comparatif et prix | Boostov",
  description: `Comparez Boostov Connect (carte de visite digitale, dès ${connect.carte} DH) et Boostov Grow (avis Google et fidélisation client, dès ${grow.carte} DH). Carte ou stand, livraison +${delivery} DH au Maroc.`,
  eyebrow: "Produits",
  h1: "Connect ou Grow : quelle carte NFC pour votre commerce ?",
  lead: "Choisissez Connect pour que vos clients vous contactent, Grow pour obtenir des avis Google et les faire revenir. Les deux existent en carte et en stand de comptoir.",
  products: [
    {
      id: "connect", name: "Boostov Connect", accent: "connect",
      oneLine: "La carte de visite digitale de votre commerce.",
      does: "Un tap ou un scan ouvre la page de votre commerce : appel, WhatsApp, Instagram, itinéraire et « Enregistrer le contact ».",
      forWho: "Pour tout commerce qui veut être contacté et retrouvé facilement.",
      card: { image: "connect-card", alt: "Carte NFC Boostov Connect personnalisée (exemple de personnalisation)", label: "Exemple de personnalisation", price: connect.carte, msg: "connectCarte" },
      stand: { image: "connect-stand", alt: "Stand NFC Boostov Connect « Contactez-nous » sur un comptoir (visuel de démonstration)", label: "Visuel de démonstration", price: connect.stand, msg: "connectStand" },
    },
    {
      id: "grow", name: "Boostov Grow", accent: "grow",
      oneLine: "Avis Google, partage et fidélité après l’achat.",
      does: "Après l’achat, le client tape et suit un parcours simple : avis Google (toujours optionnel), partage avec ses proches, récompense pour sa prochaine visite.",
      forWho: "Pour les commerces qui veulent plus d’avis Google et des clients qui reviennent.",
      card: { image: "grow-card", alt: "Carte NFC Boostov Grow personnalisée (exemple de personnalisation)", label: "Exemple de personnalisation", price: grow.carte, msg: "growCarte" },
      stand: { image: "grow-stand", alt: "Stand NFC Boostov Grow « programme fidélité » sur un comptoir (visuel de démonstration)", label: "Visuel de démonstration", price: grow.stand, msg: "growStand" },
    },
  ],
  table: {
    caption: "Comparatif Boostov Connect et Boostov Grow",
    cols: ["", "Connect", "Grow"],
    rows: [
      ["À quoi ça sert", "Être contacté et retrouvé", "Avis Google et clients qui reviennent"],
      ["Ce qui s’ouvre après le tap", "La page de votre commerce", "Un parcours avis, partage, récompense"],
      ["Appel, WhatsApp, Instagram, itinéraire", "✓", "—"],
      ["« Enregistrer le contact »", "✓", "—"],
      ["Lien vers votre page d’avis Google", "—", "✓ (optionnel pour le client)"],
      ["Partage avec les proches", "—", "✓"],
      ["Récompense pour la prochaine visite", "—", "✓"],
      ["NFC + QR code de secours", "✓", "✓"],
      ["Sans application", "✓", "✓"],
      ["Personnalisé (logo, couleurs, texte)", "✓", "✓"],
      ["Prix carte", `${connect.carte} DH`, `${grow.carte} DH`],
      ["Prix stand", `${connect.stand} DH`, `${grow.stand} DH`],
    ],
  },
  notes: [
    `Livraison partout au Maroc : +${delivery} DH sur chaque commande.`,
    "La personnalisation est incluse dans le prix.",
    "La récompense Grow n’est jamais conditionnée à la publication d’un avis.",
  ],
  related: "À lire aussi",
};

export const stands = {
  title: "Stand NFC personnalisé pour comptoir, avis Google et contact | Boostov",
  description: `Stand NFC de comptoir personnalisé à votre logo et vos couleurs, avec QR code de secours. Connect ${connect.stand} DH, Grow ${grow.stand} DH. Commande sur WhatsApp.`,
  eyebrow: "Stands",
  h1: "Stand NFC personnalisé pour votre comptoir.",
  lead: "Un stand posé là où vos clients paient : ils tapent avec leur téléphone ou scannent le QR code, et votre page s’ouvre.",
  parts: [
    ["Votre logo et votre nom", "En haut du stand, bien visibles."],
    ["Vos couleurs", "Le fond et les accents reprennent votre identité."],
    ["Un QR code", "Pour les téléphones sans NFC : le scan ouvre la même page."],
    ["Une puce NFC", "Le client approche son téléphone, la page s’ouvre."],
    ["Votre message", "« Contactez-nous » pour Connect, « Donnez votre avis » pour Grow, ou le texte de votre choix."],
  ] as [string, string][],
  preview: {
    eyebrow: "Aperçu",
    title: "Essayez votre stand.",
    lead: "Choisissez une couleur, ajoutez votre logo et votre nom. L’aperçu reste sur votre téléphone : rien n’est envoyé ni enregistré.",
    disclaimer: "Aperçu indicatif. Le design final est validé avec vous sur WhatsApp.",
    product: "Produit",
    color: "Couleur du fond",
    name: "Nom du commerce",
    namePlaceholder: "Votre commerce",
    logo: "Votre logo (facultatif)",
    logoHint: "Le fichier reste sur votre appareil.",
    removeLogo: "Retirer le logo",
    tap: "Touchez ou scannez",
    cta: "Commander ce stand sur WhatsApp",
  },
  // TODO (content/TODO.md): size and material once confirmed from the real stand.
};

export const revendeurs = {
  title: "Devenir revendeur NFC au Maroc : kits Boostov | Boostov",
  description: `Kits revendeur Boostov : Kit 5 à ${kits.kit5.price} DH, Kit 10 à ${kits.kit10.price} DH (+${delivery} DH de livraison). Cartes NFC, accès au système et formation. Réservé aux 18 ans et plus.`,
  eyebrow: "Revendeurs",
  h1: "Devenir revendeur NFC Boostov.",
  lead: `Deux kits pour proposer Boostov aux commerces de votre ville : Kit 5 à ${kits.kit5.price} DH ou Kit 10 à ${kits.kit10.price} DH.`,
  adult: "Le programme revendeur est réservé aux personnes de 18 ans et plus.",
  launch: "Prix de lancement, 10 premiers kits",
  photoAlt: "Cartes NFC blanches empilées",
  compareTitle: "Kit 5 ou Kit 10",
  rows: ["Cartes NFC Boostov", "Accès au système", "Formation", "Livraison"],
  inside: {
    title: "Ce qu’il y a dans le kit",
    items: [
      ["Cartes NFC Boostov", "5 ou 10 cartes selon le kit."],
      ["Accès au système", "Vous créez et gérez les pages de vos clients commerçants, et vous suivez leurs statistiques."],
      ["Formation", "Formation incluse."],
    ] as [string, string][],
    // TODO (content/TODO.md): card type, training details, client-shop limit once confirmed.
  },
  how: {
    title: "Comment ça marche",
    steps: [
      ["Précommandez sur WhatsApp", "Choisissez le Kit 5 ou le Kit 10."],
      ["Recevez votre kit", `Livraison partout au Maroc, +${delivery} DH.`],
      ["Suivez la formation", "Et recevez votre accès au système."],
      ["Proposez Boostov", "Aux commerces de votre ville."],
    ] as [string, string][],
  },
  forWho: {
    title: "Pour qui ?",
    items: ["Vous connaissez des commerçants dans votre ville.", "Vous aimez le contact et le terrain.", "Vous voulez une activité que vous gérez vous-même."],
  },
  noPromise: "Nous ne promettons aucun revenu. Vos résultats dépendent de vos ventes.",
  cta: "Précommander",
};

export const faqPage = {
  title: "FAQ cartes et stands NFC : livraison, NFC ou QR, commande | Boostov",
  description: "Réponses courtes sur les cartes et stands NFC Boostov : prix, livraison au Maroc, NFC ou QR code, personnalisation, avis Google et programme revendeur.",
  eyebrow: "FAQ",
  h1: "Questions fréquentes sur les cartes et stands NFC.",
  lead: "Des réponses courtes et honnêtes. Une autre question ? Écrivez-nous sur WhatsApp.",
  groups: [
    {
      id: "commande", title: "Commande, prix et livraison",
      items: [
        ["Comment commander ?", "Sur WhatsApp uniquement. Touchez un bouton « Commander » : le message nomme déjà le produit, puis nous confirmons avec vous le design, le paiement et la livraison."],
        ["Combien coûtent les produits ?", `Connect : carte ${connect.carte} DH, stand ${connect.stand} DH. Grow : carte ${grow.carte} DH, stand ${grow.stand} DH. La personnalisation est incluse.`],
        ["Combien coûte la livraison ?", `${delivery} DH sur chaque commande, partout au Maroc.`],
      ],
    },
    {
      id: "produits", title: "Produits et technologie",
      items: [
        ["Quelle différence entre Connect et Grow ?", "Connect ouvre la page de contact de votre commerce. Grow ouvre un parcours avis Google, partage et récompense pour faire revenir le client."],
        ["Faut-il une application ?", "Non. La page s’ouvre dans le navigateur du téléphone du client."],
        ["Et si le téléphone n’a pas le NFC ?", "Chaque carte et chaque stand a un QR code : le scan avec l’appareil photo ouvre la même page."],
        ["Puis-je modifier ma page après la commande ?", "Oui. Vos informations et liens peuvent changer sans remplacer la carte ou le stand."],
      ],
    },
    {
      id: "personnalisation", title: "Personnalisation",
      items: [
        ["Que comprend la personnalisation ?", "Votre logo, votre nom, vos couleurs, un QR code et le texte de votre choix. Nous définissons le design avec vous sur WhatsApp."],
        ["Que dois-je envoyer ?", "Votre logo, vos couleurs et vos liens (WhatsApp, Instagram, Google Maps, page d’avis Google selon le produit)."],
      ],
    },
    {
      id: "avis", title: "Avis Google",
      items: [
        ["Grow respecte-t-il les règles de Google ?", "Grow propose l’avis sans l’imposer : la récompense n’est jamais liée à la publication d’un avis, et chaque client donne son avis librement depuis son propre téléphone."],
      ],
    },
    {
      id: "revendeurs", title: "Revendeurs",
      items: [
        ["Comment devenir revendeur ?", `Précommandez le Kit 5 (${kits.kit5.price} DH) ou le Kit 10 (${kits.kit10.price} DH) sur WhatsApp. Le programme est réservé aux 18 ans et plus.`],
        ["Combien vais-je gagner ?", "Nous ne promettons aucun revenu. Vos résultats dépendent de vos ventes."],
      ],
    },
  ] as { id: string; title: string; items: [string, string][] }[],
};
