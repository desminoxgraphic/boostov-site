// French copy for /pro, /connect, /revendeurs, /faq and /blog. Same rules as content/fr.ts:
// prices only from src/config/pricing.ts, unconfirmed facts omitted (see content/TODO.md),
// no hosting duration or renewal terms (undecided).
import { BETA_SLOTS, PRICING } from "@/src/config/pricing";

const { grow, pro, connect, kits } = PRICING;

export const proPage = {
  title: `Boostov Pro · Carte NFC pour freelances et pros, ${pro.carte} DH | Boostov`,
  description: `Boostov Pro : une carte NFC et QR code pour freelances au Maroc, avec votre page pro (services, galerie, liens, demandes de devis). Exemple : Desminox, Agadir. ${pro.carte} DH, paiement unique.`,
  crumb: "Boostov Pro",
  eyebrow: "Boostov Pro · Carte pro",
  h1: "Votre carte pro. Votre page à vous.",
  lead: "Un tap sur la carte ouvre votre page : ce que vous faites, vos réalisations, et un bouton pour vous écrire.",
  heroAlt: "Rendu de la carte Boostov Pro noire au nom de Desminox, designer graphique et motion, avec QR code au verso.",
  demo: {
    eyebrow: "Exemple réel",
    title: "Desminox, designer graphique à Agadir.",
    lead: "Voici la carte et la page de démonstration de Desminox. Votre page suit la même structure, avec vos infos.",
    phoneAlt: "Rendu de la page Boostov Pro de Desminox : designer graphique et motion à Agadir, services, bouton WhatsApp, demande de devis et galerie.",
    points: [
      ["Qui il est", "Designer graphique & motion, basé à Agadir, avec une courte présentation."],
      ["Ses services", "Logo & identité visuelle, flyers et affiches, motion design, posts réseaux sociaux."],
      ["Ses réalisations", "Une galerie de 6 projets et ses liens Instagram, TikTok, Behance."],
      ["Un contact direct", "WhatsApp, appel, « Enregistrer le contact » et un bouton « Demander un devis »."],
    ] as [string, string][],
  },
  included: {
    eyebrow: "Ce que vous recevez",
    title: "Une carte, une page, et des outils pour la gérer.",
    items: [
      { icon: "card", title: "La carte Boostov Pro", text: "Carte NFC avec QR code, à votre nom." },
      { icon: "page", title: "Votre page pro", text: "Photo, bannière, présentation, couleur, services." },
      { icon: "links", title: "Liens et galerie", text: "Vos réseaux et jusqu’à 6 réalisations en photos." },
      { icon: "assistant", title: "Assistant de questions", text: "Vos réponses prêtes : tarifs, délais, services." },
      { icon: "leads", title: "Demandes de devis", text: "Le visiteur décrit son besoin, vous répondez sur WhatsApp." },
      { icon: "stats", title: "Statistiques", text: "Combien de vues, par NFC, QR code ou lien." },
    ],
  },
  offer: { eyebrow: "Prix", title: "Une carte. Une page.", items: ["Carte Boostov Pro NFC et QR code", "Votre page pro avec galerie et services", "Demandes de devis et statistiques", "Sans application pour vos clients"] },
  faq: [
    ["À qui s’adresse Boostov Pro ?", "Aux freelances et aux professionnels : designers, coachs, artisans, consultants, commerciaux… à toute personne qui donne sa carte de visite."],
    ["Mon client doit-il installer une application ?", "Non. Il touche la carte (NFC) ou scanne le QR code, et votre page s’ouvre dans son navigateur."],
    ["Puis-je modifier ma page ensuite ?", "Oui. Vous gérez votre profil, vos liens, votre galerie et vos réponses depuis votre espace."],
    ["Comment commander ?", "Sur WhatsApp, en un clic. On prépare votre carte et votre page avec vous."],
  ] as [string, string][],
  final: "Votre prochaine carte de visite tient en un tap.",
};

export const connectPage = {
  title: `Boostov Connect · Carte ou stand NFC pour commerces, dès ${connect.carte} DH | Boostov`,
  description: `Boostov Connect : carte (${connect.carte} DH) ou stand (${connect.stand} DH) NFC et QR code qui ouvre la page de votre commerce : WhatsApp, appel, Instagram, itinéraire, contact. Agadir, Maroc.`,
  crumb: "Boostov Connect",
  eyebrow: "Boostov Connect · Carte ou stand",
  h1: "La page de votre commerce, en un tap.",
  lead: "Le client touche la carte ou le stand, ou scanne le QR code : votre WhatsApp, votre Instagram et votre adresse s’ouvrent.",
  heroAlt: "Rendu de la carte bleue et du stand blanc Boostov Connect au nom de « Votre commerce ».",
  formats: {
    eyebrow: "Deux formats",
    title: "Carte ou stand, à vous de choisir.",
    carte: { name: "Carte Connect", text: "Dans la poche ou près de la caisse. Vous la tendez, le client tape.", alt: "Rendu de la carte Boostov Connect bleue, recto et verso avec QR code." },
    stand: { name: "Stand Connect", text: "Posé sur le comptoir. Le client tape quand il veut, sans vous déranger.", alt: "Rendu du stand Boostov Connect blanc « Contactez-nous » avec NFC et QR code." },
  },
  receive: {
    eyebrow: "Ce que reçoit votre client",
    title: "Tout pour vous contacter et vous retrouver.",
    phoneAlt: "Rendu de la page Boostov Connect d’un commerce : WhatsApp, appeler, Instagram, itinéraire, enregistrer le contact.",
    items: [
      { icon: "wa", title: "WhatsApp et appel", text: "Un geste pour vous écrire ou vous appeler." },
      { icon: "insta", title: "Instagram", text: "Vos photos et nouveautés à portée de tap." },
      { icon: "map", title: "Itinéraire", text: "Le chemin vers votre commerce sur Google Maps." },
      { icon: "save", title: "Enregistrer le contact", text: "Votre commerce entre dans son répertoire." },
      { icon: "qr", title: "NFC et QR code", text: "Pour tous les téléphones, même sans NFC." },
      { icon: "brand", title: "Personnalisé", text: "Votre nom, votre logo et vos couleurs." },
    ],
  },
  diff: {
    eyebrow: "Connect ou Grow v2 ?",
    title: "Une page contact, ou un système de fidélité.",
    connect: { name: "Connect", line: "Pour être contacté et retrouvé.", points: ["Page contact du commerce", "WhatsApp, Instagram, itinéraire", "Carte ou stand"] },
    grow: { name: "Grow v2", line: "Pour faire revenir vos clients.", points: ["Carte fidélité avec visites", "Récompense choisie par vous", "Rappel WhatsApp, installation incluse"] },
    more: "Découvrir Grow v2",
  },
  faq: [
    ["Quelle différence avec Boostov Grow v2 ?", "Connect ouvre la page contact de votre commerce. Grow v2 est un système de fidélité : une visite validée à chaque passage et une récompense pour faire revenir le client."],
    ["Et si le téléphone n’a pas le NFC ?", "La carte et le stand Connect ont un QR code : le scan avec l’appareil photo ouvre la même page."],
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
  kitItems: ["Accès au système revendeur", "Formation incluse", "Précommande sur WhatsApp"],
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
        ["Qu’est-ce que la Beta Grow v2 ?", `Nous cherchons ${BETA_SLOTS} commerces testeurs. Ils reçoivent Grow v2 à un prix spécial, en échange de leurs retours et de leur accord pour montrer leurs résultats. L’offre normale reste ${grow.stand} DH, installation incluse.`],
      ],
    },
    {
      id: "produits", title: "Les produits",
      items: [
        ["Quelle différence entre Grow v2, Pro et Connect ?", "Grow v2 est un stand de fidélité : le client valide une visite à chaque passage et revient pour sa récompense. Pro est une carte pour freelances et professionnels avec une page personnelle. Connect ouvre la page de contact d’un commerce, en carte ou en stand."],
        ["Qui choisit la récompense Grow ?", "Vous. Vous décidez ce que le client gagne, et le compteur repart à zéro une fois la récompense utilisée."],
        ["Qui installe le stand Grow v2 ?", "Nous. L’installation est incluse dans le prix."],
        ["Que deviennent les contacts de mes clients ?", "Ils restent à vous : avec Grow v2, vous pouvez exporter la liste de vos clients."],
      ],
    },
    {
      id: "technologie", title: "NFC et QR code",
      items: [
        ["Faut-il une application ?", "Non. La page s’ouvre dans le navigateur du téléphone du client."],
        ["NFC ou QR code ?", "Grow v2, Pro et Connect fonctionnent avec les deux : le client approche son téléphone (NFC) ou scanne le QR code avec l’appareil photo. Les deux ouvrent la même page."],
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
