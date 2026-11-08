// All French copy for the shared chrome, the homepage and /grow.
// Prices are never written here as numbers: they come from src/config/pricing.ts.
// Rules: no invented numbers, no testimonials, no hosting duration or renewal terms (undecided).
// Unknown facts go to content/TODO.md, never on the site.
import { PRICING } from "@/src/config/pricing";

const { grow, pro, connect } = PRICING;

export const fr = {
  cta: "Commander sur WhatsApp",
  meta: {
    homeTitle: "Boostov · Fidélité client et cartes NFC pour commerces au Maroc",
    homeDescription: `Boostov Grow v2 : un stand de fidélité, le client touche, gagne ses points et revient. ${grow.stand} DH, installation incluse. Cartes Boostov Pro et Connect. Agadir, Maroc.`,
    growTitle: `Boostov Grow v2 · Stand de fidélité client, ${grow.stand} DH | Boostov`,
    growDescription: `Stand de fidélité NFC et QR code pour commerces au Maroc : points à chaque visite, récompense choisie par vous, rappel WhatsApp, avis Google optionnel. ${grow.stand} DH, installation incluse.`,
  },
  nav: { home: "Boostov, accueil", menu: "Menu", items: [["/grow", "Grow v2"], ["/pro", "Pro"], ["/connect", "Connect"], ["/faq", "FAQ"], ["/blog", "Guides"]] as [string, string][] },
  phone: {
    alt: "Écran de téléphone : carte fidélité Boostov.",
    shop: "Votre commerce",
    kind: "Carte fidélité",
    member: "Client",
    memberName: "Yasmine",
    rewardLabel: "Votre récompense",
    unlockedLabel: "Récompense débloquée",
    reward: "Celle que vous choisissez",
    rowWa: "WhatsApp du commerce",
    rowContact: "Enregistrer le contact",
    rowReview: "Laisser un avis Google",
    tap: "Touchez le stand",
    loop: "Nouvelle carte · 0/5",
  },
  story: {
    eyebrow: "Comment ça marche",
    title: "Quatre gestes. Zéro application.",
    steps: ["Le client touche le stand", "Il valide sa visite", "Il débloque sa récompense", "Il revient"],
  },
  home: {
    hero: {
      title: ["Boostov:", "la tech qui fait grandir votre business."],
      sub: "Un tap. Vos clients reviennent.",
      chipA: "Récompense choisie par vous",
      chipB: "Sans application",
      phoneLabel: "Carte fidélité Boostov sur un téléphone : 3 visites sur 5 validées.",
    },
    products: {
      eyebrow: "Produits",
      title: "Choisissez votre outil.",
      featured: "Le plus complet",
      oneTime: "Paiement unique",
      install: "Installation incluse",
      more: "Découvrir",
      demo: "Voir la démo",
      items: {
        grow: { name: "Boostov Grow v2", kind: "Stand fidélité", text: "Vos clients touchent le stand, gagnent des points à chaque visite et reviennent chercher leur récompense." },
        pro: { name: "Boostov Pro", kind: "Carte pro", text: "Une carte pour freelances et professionnels, avec votre page personnelle : contact, liens, services." },
        connect: { name: "Boostov Connect", kind: "Carte ou stand", text: "Un tap ouvre la page de votre commerce : WhatsApp, Instagram, localisation, contact." },
      },
      carte: "Carte",
      stand: "Stand",
    },
    beta: {
      tag: "Beta",
      title: "Beta : on cherche 3 commerces testeurs.",
      text: "Boostov Grow v2 est tout nouveau. Testez-le dans votre commerce et dites-nous ce qui marche.",
      cta: "Devenir testeur",
      slots: "3 places testeurs",
    },
    faq: {
      eyebrow: "Questions",
      title: "L’essentiel, en 4 réponses.",
      items: [
        ["Faut-il installer une application ?", "Non. Le client touche le stand avec son téléphone, ou scanne le QR code, et sa carte fidélité s’ouvre dans le navigateur."],
        ["Qui choisit la récompense ?", "Vous. Un café offert, une remise, un petit cadeau : vous décidez ce que le client gagne."],
        ["Comment se passe l’installation ?", "Nous installons le stand dans votre commerce et préparons votre carte fidélité. L’installation est incluse dans le prix."],
        ["Comment commander ?", "Sur WhatsApp : écrivez-nous en un clic, on vous répond pour personnaliser votre stand ou votre carte. Paiement unique."],
      ] as [string, string][],
      all: "Toutes les questions",
    },
    final: { title: "Vos clients reviennent. Commencez aujourd’hui.", text: "Une question ? On répond sur WhatsApp." },
  },
  grow: {
    crumb: "Boostov Grow v2",
    eyebrow: "Boostov Grow v2 · Stand fidélité",
    title: "Faites revenir vos clients, en un tap.",
    lead: "Un stand sur votre comptoir. Le client le touche avec son téléphone, gagne un point à chaque visite et revient pour sa récompense.",
    problem: {
      eyebrow: "Le problème",
      title: "Le client vient une fois. Puis il disparaît.",
      text: "Il a aimé, mais rien ne lui rappelle de revenir. Grow lui donne une raison : sa prochaine récompense.",
      without: "Sans Grow",
      with: "Avec Grow",
      visit: "Visite",
      reward: "Récompense",
      label: "Schéma : sans Grow, une seule visite. Avec Grow, des visites régulières jusqu’à la récompense.",
    },
    included: {
      eyebrow: "Ce qui est inclus",
      title: "Tout est prêt. Vous servez vos clients.",
      optional: "Optionnel",
      items: [
        { icon: "stand", title: "Stand personnalisé", text: "À votre nom et à vos couleurs, avec NFC et QR code." },
        { icon: "install", title: "Installation", text: "Nous installons le stand et préparons votre carte fidélité." },
        { icon: "review", title: "Avis Google", text: "Le client peut laisser un avis sur Google Maps, sans obligation.", optional: true },
        { icon: "wa", title: "Rappel WhatsApp", text: "Un rappel sur WhatsApp invite le client à revenir." },
        { icon: "export", title: "Export des contacts", text: "Vos clients restent à vous : exportez la liste quand vous voulez." },
        { icon: "reward", title: "Récompense au choix", text: "Vous fixez la récompense. Le compteur repart à zéro ensuite." },
      ],
    },
    screen: {
      eyebrow: "Le vrai produit",
      title: "Ce que voit votre client.",
      text: "Sa carte, ses points, sa récompense. Avec vos liens WhatsApp, Instagram et Google juste en dessous.",
      alt: "Écran réel de Boostov Grow v2 : carte fidélité avec 5 visites sur 5 et un cadeau débloqué, pour un commerce de démonstration.",
      caption: "Écran réel de Boostov Grow v2, avec un commerce de démo.",
    },
    offer: {
      eyebrow: "Prix",
      title: "Un prix. Tout compris.",
      items: ["Stand personnalisé NFC et QR code", "Installation incluse", "Carte fidélité prête à l’emploi", "Rappel WhatsApp et export des contacts", "Avis Google optionnel"],
    },
    faq: [
      ["Le client doit-il télécharger une application ?", "Non. Il touche le stand ou scanne le QR code, et sa carte fidélité s’ouvre dans le navigateur de son téléphone."],
      ["Qui choisit la récompense ?", "Vous. Vous décidez ce que le client gagne, et le compteur repart à zéro une fois la récompense utilisée."],
      ["L’avis Google est-il obligatoire ?", "Non, il est optionnel. La récompense n’est jamais liée à un avis : chaque client donne son avis librement."],
      ["Comment commander Grow v2 ?", "Sur WhatsApp, en un clic. On personnalise le stand avec vous, puis on l’installe dans votre commerce."],
    ] as [string, string][],
    final: { title: "Prêt à faire revenir vos clients ?" },
  },
  footer: {
    tagline: "La tech qui fait grandir votre business.",
    site: "Produits",
    resellers: "Kits revendeurs",
    help: "Aide",
    contact: "Contact",
    instagram: "Instagram @boostov.ma",
    place: "Agadir, Maroc",
    legalNotice: "Mentions légales",
    privacy: "Confidentialité",
  },
  prices: { grow: grow.stand, pro: pro.carte, connectCarte: connect.carte, connectStand: connect.stand },
};
