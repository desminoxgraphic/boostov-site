// French copy for /pro, /connect, /revendeurs, /faq and /blog. Same rules as content/fr.ts:
// prices only from src/config/pricing.ts, unconfirmed facts omitted (see content/TODO.md),
// no hosting duration or renewal terms (undecided).
import { PRICING } from "@/src/config/pricing";

const { grow, pro, connect, kits } = PRICING;

export const proPage = {
  title: `Boostov Pro · Carte NFC pour freelances et pros, ${pro.carte} DH | Boostov`,
  description: `Boostov Pro : une carte NFC pour freelances et professionnels au Maroc, avec votre page personnelle (contact, WhatsApp, liens, services). ${pro.carte} DH, paiement unique.`,
  crumb: "Boostov Pro",
  eyebrow: "Boostov Pro · Carte pro",
  h1: "Votre carte pro. Votre page à vous.",
  lead: "Un tap sur la carte ouvre votre page : qui vous êtes, ce que vous faites, et comment vous joindre.",
  phone: { name: "Votre nom", job: "Votre métier", rows: ["WhatsApp", "Enregistrer le contact", "Mes services", "Instagram"], alt: "Écran de téléphone : page personnelle Boostov Pro." },
  included: {
    eyebrow: "Sur votre page",
    title: "Tout ce qu’un client doit savoir.",
    items: [
      { icon: "contact", title: "Contact et WhatsApp", text: "On vous écrit ou on vous appelle en un geste." },
      { icon: "save", title: "Enregistrer le contact", text: "Votre numéro entre dans son téléphone, sans le taper." },
      { icon: "links", title: "Liens et réseaux", text: "Instagram, portfolio, site : vos liens au même endroit." },
      { icon: "services", title: "Vos services", text: "Ce que vous proposez, présenté simplement." },
    ],
  },
  offer: { eyebrow: "Prix", title: "Une carte. Une page.", items: ["Carte NFC Boostov Pro", "Votre page personnelle", "Sans application pour vos clients"] },
  faq: [
    ["À qui s’adresse Boostov Pro ?", "Aux freelances et aux professionnels : consultants, artisans, coachs, créatifs, commerciaux… à toute personne qui donne sa carte de visite."],
    ["Mon client doit-il installer une application ?", "Non. Il touche la carte avec son téléphone et votre page s’ouvre dans son navigateur."],
    ["Comment commander ?", "Sur WhatsApp, en un clic. On prépare votre carte et votre page avec vous."],
  ] as [string, string][],
  final: "Votre prochaine carte de visite tient en un tap.",
};

export const connectPage = {
  title: `Boostov Connect · Carte ou stand NFC pour commerces, dès ${connect.carte} DH | Boostov`,
  description: `Boostov Connect : carte (${connect.carte} DH) ou stand (${connect.stand} DH) NFC et QR code qui ouvre la page de votre commerce : WhatsApp, Instagram, localisation, contact. Agadir, Maroc.`,
  crumb: "Boostov Connect",
  eyebrow: "Boostov Connect · Carte ou stand",
  h1: "La page de votre commerce, en un tap.",
  lead: "Le client touche la carte ou le stand, ou scanne le QR code : votre WhatsApp, votre Instagram et votre adresse s’ouvrent.",
  photoAlt: "Carte Boostov Connect personnalisée au nom « Votre commerce ».",
  formats: {
    eyebrow: "Deux formats",
    title: "Carte ou stand, à vous de choisir.",
    carte: { name: "Carte Connect", text: "Dans la poche ou à côté de la caisse. Vous la tendez, le client tape." },
    stand: { name: "Stand Connect", text: "Posé sur le comptoir. Le client tape quand il veut, sans vous déranger." },
  },
  included: {
    eyebrow: "Ce qui s’ouvre",
    title: "Tout pour vous contacter et vous retrouver.",
    items: [
      { icon: "wa", title: "WhatsApp et appel", text: "Un geste pour vous écrire ou vous appeler." },
      { icon: "insta", title: "Instagram", text: "Vos photos et nouveautés à portée de tap." },
      { icon: "map", title: "Localisation", text: "L’itinéraire vers votre commerce sur Google Maps." },
      { icon: "save", title: "Enregistrer le contact", text: "Votre commerce entre dans son répertoire." },
      { icon: "qr", title: "NFC et QR code", text: "Pour tous les téléphones, même sans NFC." },
      { icon: "brand", title: "Personnalisé", text: "Votre nom, votre logo et vos couleurs." },
    ],
  },
  phone: { name: "Votre commerce", job: "Agadir", rows: ["WhatsApp", "Instagram", "Itinéraire", "Enregistrer le contact"], alt: "Écran de téléphone : page de commerce Boostov Connect." },
  faq: [
    ["Quelle différence avec Boostov Grow v2 ?", "Connect ouvre la page de contact de votre commerce. Grow v2 est un système de fidélité : points à chaque visite et récompense pour faire revenir le client."],
    ["Et si le téléphone n’a pas le NFC ?", "Chaque carte et chaque stand Connect a un QR code : le scan avec l’appareil photo ouvre la même page."],
    ["Comment commander ?", "Sur WhatsApp, en un clic. Dites-nous si vous voulez la carte ou le stand, et on prépare le design avec vous."],
  ] as [string, string][],
  final: "Vos clients vous retrouvent en un tap.",
};

export const revendeurs = {
  title: "Devenir revendeur NFC au Maroc : kits Boostov | Boostov",
  description: `Kits revendeur Boostov : Kit 5 à ${kits.kit5.price} DH, Kit 10 à ${kits.kit10.price} DH : cartes NFC, accès au système et formation. Réservé aux 18 ans et plus.`,
  crumb: "Revendeurs",
  eyebrow: "Kits revendeurs",
  h1: "Devenir revendeur NFC Boostov.",
  lead: `Deux kits pour proposer Boostov aux commerces de votre ville : Kit 5 à ${kits.kit5.price} DH ou Kit 10 à ${kits.kit10.price} DH.`,
  adult: "Le programme revendeur est réservé aux personnes de 18 ans et plus.",
  launch: "Prix de lancement, 10 premiers kits",
  photoAlt: "Cartes NFC blanches empilées",
  kitsTitle: "Kit 5 ou Kit 10.",
  cards: "cartes NFC Boostov",
  kitItems: ["Accès au système", "Formation incluse"],
  inside: {
    title: "Ce qu’il y a dans le kit.",
    items: [
      ["Cartes NFC Boostov", "5 ou 10 cartes selon le kit."],
      ["Accès au système", "Vous créez et gérez les pages de vos clients commerçants, et vous suivez leurs statistiques."],
      ["Formation", "Formation incluse."],
    ] as [string, string][],
    // TODO (content/TODO.md): card type, training details, client-shop limit once confirmed.
  },
  how: {
    title: "Comment ça marche.",
    steps: [
      ["Précommandez sur WhatsApp", "Choisissez le Kit 5 ou le Kit 10."],
      ["Recevez votre kit", "Avec vos cartes NFC Boostov."],
      ["Suivez la formation", "Et recevez votre accès au système."],
      ["Proposez Boostov", "Aux commerces de votre ville."],
    ] as [string, string][],
  },
  forWho: {
    title: "Pour qui ?",
    items: ["Vous connaissez des commerçants dans votre ville.", "Vous aimez le contact et le terrain.", "Vous voulez une activité que vous gérez vous-même."],
  },
  noPromise: "Nous ne promettons aucun revenu. Vos résultats dépendent de vos ventes.",
};

export const faqPage = {
  title: "FAQ Boostov : fidélité, cartes NFC, prix et commande | Boostov",
  description: "Réponses courtes sur Boostov Grow v2, Boostov Pro et Boostov Connect : prix, installation, NFC ou QR code, avis Google, commande sur WhatsApp et kits revendeurs.",
  eyebrow: "FAQ",
  h1: "Questions fréquentes.",
  lead: "Des réponses courtes et honnêtes. Une autre question ? Écrivez-nous sur WhatsApp.",
  guides: "Guides",
  groups: [
    {
      id: "commande", title: "Commande et prix",
      items: [
        ["Comment commander ?", "Sur WhatsApp uniquement. Touchez « Commander sur WhatsApp » : le message nomme déjà le produit, puis nous confirmons avec vous le design et le paiement."],
        ["Combien coûtent les produits ?", `Boostov Grow v2 : stand ${grow.stand} DH, installation incluse. Boostov Pro : carte ${pro.carte} DH. Boostov Connect : carte ${connect.carte} DH ou stand ${connect.stand} DH. Paiement unique.`],
        ["Est-ce que je peux tester avant ?", "Boostov Grow v2 est en Beta : nous cherchons 3 commerces testeurs. Écrivez-nous sur WhatsApp si votre commerce est intéressé."],
      ],
    },
    {
      id: "produits", title: "Les produits",
      items: [
        ["Quelle différence entre Grow v2, Pro et Connect ?", "Grow v2 est un stand de fidélité : le client gagne des points à chaque visite et revient pour sa récompense. Pro est une carte pour freelances et professionnels avec une page personnelle. Connect ouvre la page de contact d’un commerce, en carte ou en stand."],
        ["Qui choisit la récompense Grow ?", "Vous. Vous décidez ce que le client gagne, et le compteur repart à zéro une fois la récompense utilisée."],
        ["Qui installe le stand Grow v2 ?", "Nous. L’installation est incluse dans le prix."],
        ["Que deviennent les contacts de mes clients ?", "Ils restent à vous : avec Grow v2, vous pouvez exporter la liste de vos clients."],
      ],
    },
    {
      id: "technologie", title: "NFC et QR code",
      items: [
        ["Faut-il une application ?", "Non. La page s’ouvre dans le navigateur du téléphone du client."],
        ["Et si le téléphone n’a pas le NFC ?", "Les stands Grow v2 et les cartes et stands Connect ont aussi un QR code : le scan avec l’appareil photo ouvre la même page."],
      ],
    },
    {
      id: "avis", title: "Avis Google",
      items: [
        ["L’avis Google est-il obligatoire ?", "Non, il est optionnel. La récompense n’est jamais liée à la publication d’un avis, et chaque client donne son avis librement depuis son propre téléphone."],
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

export const blogPage = {
  title: "Guides fidélité client, avis Google et NFC pour commerces | Boostov",
  description: "Guides pratiques pour les commerces au Maroc : demander des avis Google dans les règles, choisir entre NFC et QR code, créer son lien d’avis Google.",
  eyebrow: "Guides",
  h1: "Guides pour les commerces.",
  lead: "Des guides courts et pratiques sur la fidélité, les avis Google, le NFC et le QR code.",
  read: "Lire le guide",
};
