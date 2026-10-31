// All French copy. An Arabic/Darija dictionary can be added later with the same shape.
// Prices are never written here: they come from src/config/pricing.ts.
// Unknown facts are omitted; see content/TODO.md.
import { PRICING } from "@/src/config/pricing";

const { connect, grow, delivery, kits } = PRICING;
const minPrice = Math.min(connect.carte, connect.stand, grow.carte, grow.stand);

export const fr = {
  meta: {
    siteName: "Boostov",
    homeTitle: "Carte NFC et stand avis Google pour commerces au Maroc | Boostov",
    homeDescription: `Cartes et stands NFC personnalisés pour commerces au Maroc : page de contact, avis Google et fidélité client. Dès ${minPrice} DH, commande sur WhatsApp.`,
  },
  nav: { produits: "Produits", revendeurs: "Revendeurs", faq: "FAQ", whatsapp: "WhatsApp", menu: "Menu", home: "Boostov, accueil", skip: "Aller au contenu" },
  labels: {
    demo: "Visuel de démonstration",
    example: "Exemple de personnalisation",
    from: "dès",
    dh: "DH",
    delivery: `Livraison partout au Maroc : +${delivery} DH`,
  },
  home: {
    hero: {
      eyebrow: "Cartes et stands NFC · Maroc",
      title: "Un tap, et vos clients vous retrouvent.",
      lead: "Cartes et stands NFC personnalisés pour les commerces : contact, avis Google et fidélité, sans application.",
      price: `dès ${minPrice} DH`,
      cta: "Commander sur WhatsApp",
      secondary: "Voir les produits",
      photoAlt: "Stand Boostov Grow personnalisé posé sur un comptoir, un client approche son téléphone (visuel de démonstration)",
    },
    problem: {
      eyebrow: "Le problème, la solution",
      title: "Vos clients aiment votre commerce. Puis ils repartent.",
      lead: "Sans outil simple, un client satisfait part sans enregistrer votre numéro, sans laisser d’avis et sans raison précise de revenir.",
      before: "Aujourd’hui",
      after: "Avec Boostov",
      items: [
        ["Votre numéro reste sur une carte papier perdue.", "Un tap enregistre votre contact, WhatsApp et Instagram."],
        ["Le client satisfait oublie de laisser un avis.", "Il arrive sur votre page d’avis Google en un geste."],
        ["Rien ne le fait revenir.", "Une récompense l’invite à sa prochaine visite."],
      ],
    },
    products: {
      eyebrow: "Les produits",
      title: "Deux produits, deux formats.",
      lead: "Connect sert au contact, Grow aux avis et à la fidélité. Chacun existe en carte ou en stand de comptoir, personnalisé à votre image.",
      compare: "Comparer Connect et Grow",
      items: [
        { id: "connect-card", product: "Connect", format: "Carte", price: connect.carte, msg: "connectCarte", image: "connect-card", copy: "Votre page de contact en un tap : appel, WhatsApp, Instagram, itinéraire.", alt: "Carte NFC Boostov Connect noire personnalisée avec QR code (exemple de personnalisation)" },
        { id: "connect-stand", product: "Connect", format: "Stand", price: connect.stand, msg: "connectStand", image: "connect-stand", copy: "Le même contact, posé sur votre comptoir.", alt: "Stand NFC Boostov Connect « Contactez-nous » sur un comptoir (visuel de démonstration)" },
        { id: "grow-card", product: "Grow", format: "Carte", price: grow.carte, msg: "growCarte", image: "grow-card", copy: "Avis Google, partage et récompense après l’achat.", alt: "Carte NFC Boostov Grow noire et or personnalisée avec QR code (exemple de personnalisation)" },
        { id: "grow-stand", product: "Grow", format: "Stand", price: grow.stand, msg: "growStand", image: "grow-stand", copy: "Le parcours avis et fidélité, visible au comptoir.", alt: "Stand NFC Boostov Grow « programme fidélité » sur un comptoir (visuel de démonstration)" },
      ],
      order: "Commander",
    },
    steps: {
      eyebrow: "Comment ça marche",
      title: "Trois étapes, et c’est prêt.",
      lead: "Vous commandez sur WhatsApp, nous préparons tout, vous posez la carte ou le stand au comptoir.",
      items: [
        { title: "Choisissez et écrivez-nous", copy: "Connect ou Grow, carte ou stand.", action: "Vous : un message WhatsApp." },
        { title: "Envoyez votre logo, vos couleurs et vos liens", copy: "Nous préparons votre design et votre page.", action: "Vous : vos fichiers et liens." },
        { title: "Recevez-le prêt à l’emploi", copy: `Livraison partout au Maroc (+${delivery} DH).`, action: "Vous : posez-le au comptoir." },
      ],
      cta: "Commencer sur WhatsApp",
    },
    stand: {
      eyebrow: "Stand personnalisé",
      title: "Un stand à votre image.",
      lead: "Chaque stand est préparé pour un seul commerce : votre logo, votre nom, vos couleurs, un QR code et une puce NFC.",
      items: ["Votre logo et votre nom", "Vos couleurs de marque", "Un QR code imprimé", "Une puce NFC, avec le QR code en secours", "Le texte de votre choix"],
      photoAlt: "Stand NFC Boostov Grow « Donnez votre avis » personnalisé avec le logo Choufna (visuel de démonstration)",
      cta: "Commander un stand personnalisé",
    },
    kits: {
      eyebrow: "Revendeurs",
      title: "Proposez Boostov dans votre ville.",
      lead: "Deux kits pour démarrer comme revendeur : des cartes NFC Boostov, l’accès au système et une formation.",
      launch: "Prix de lancement, 10 premiers kits",
      adult: "Réservé aux 18 ans et plus.",
      photoAlt: "Cartes NFC blanches empilées",
      kit5: `Kit 5 · ${kits.kit5.cartes} cartes`,
      kit10: `Kit 10 · ${kits.kit10.cartes} cartes`,
      more: "Voir les kits",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Les questions qu’on nous pose.",
      items: [
        ["Combien coûte la livraison ?", `${delivery} DH sur chaque commande, partout au Maroc.`],
        ["Faut-il une application ?", "Non. La page s’ouvre dans le navigateur du téléphone, d’un tap NFC ou d’un scan du QR code."],
        ["Et si le téléphone n’a pas le NFC ?", "Le QR code imprimé ouvre la même page. Le client le scanne avec l’appareil photo."],
        ["Comment commander ?", "Touchez un bouton WhatsApp : le message nomme déjà le produit. Nous confirmons ensuite les détails et le paiement avec vous."],
      ] as [string, string][],
      more: "Toutes les questions",
    },
    final: {
      title: "Prêt à équiper votre comptoir ?",
      lead: `Écrivez-nous sur WhatsApp. Cartes dès ${minPrice} DH, livraison +${delivery} DH partout au Maroc.`,
      cta: "Commander sur WhatsApp",
    },
  },
  footer: {
    tagline: "Cartes et stands NFC personnalisés pour les commerces au Maroc.",
    contact: "Contact",
    site: "Site",
    legal: "Informations",
    legalNotice: "Mentions légales",
    privacy: "Confidentialité",
    instagram: "@boostov.ma",
  },
};
