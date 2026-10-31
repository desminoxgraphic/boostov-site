// Blog guides. General, verifiable advice only: no statistics, no invented cases.
// Google policy wording is paraphrased; readers are pointed to Google's own pages.

export type Block = { h2?: string; p?: string[]; ul?: string[]; ol?: string[]; tip?: string };
export type Post = { slug: string; title: string; h1: string; description: string; answer: string; published: string; og: string; image: string; related: { label: string; href: string }; body: Block[] };

const GOOGLE_POLICY = "https://support.google.com/contributionpolicy/answer/7400114";

export const POSTS: Post[] = [
  {
    slug: "demander-des-avis-google",
    title: "Demander des avis Google sans enfreindre les règles | Boostov",
    h1: "Comment demander des avis Google sans enfreindre les règles",
    description: "Ce que Google interdit (avis récompensés, tri des avis positifs) et une méthode simple et honnête pour demander des avis à vos clients.",
    answer: "Vous pouvez demander un avis à tous vos clients, mais jamais en échange d’une récompense, et jamais seulement à ceux qui sont satisfaits. Le client doit publier librement, depuis son propre téléphone.",
    published: "2026-10-31",
    og: "blog-avis",
    image: "/products/grow-stand-avis-1080.webp",
    related: { label: "Découvrir Boostov Grow", href: "/produits#grow" },
    body: [
      { h2: "Ce que Google interdit", p: ["Les règles de Google sur le contenu des contributions (avis inclus) visent les avis qui ne reflètent pas une expérience réelle et libre. En pratique, trois choses posent problème :"], ul: [
        "Offrir une récompense en échange d’un avis : remise, cadeau, boisson offerte, participation à un tirage.",
        "Le « tri » des avis (review gating) : demander d’abord si le client est satisfait, puis n’envoyer vers Google que les clients contents.",
        "Publier des avis à la place des clients, ou faire publier les avis sur un appareil du commerce plutôt que sur le téléphone du client.",
      ] },
      { p: [`Les règles exactes évoluent : lisez la page officielle de Google sur le contenu interdit et restreint (${GOOGLE_POLICY}).`] },
      { h2: "Ce que vous pouvez faire", ul: [
        "Demander un avis à tous vos clients, de la même façon, qu’ils soient satisfaits ou non.",
        "Rendre la demande facile : un lien direct vers votre page d’avis, un QR code ou une carte NFC au comptoir.",
        "Choisir le bon moment : juste après le paiement ou le service, quand l’expérience est fraîche.",
        "Répondre à tous les avis, positifs comme négatifs, poliment et rapidement.",
      ] },
      { h2: "Une méthode simple en 4 étapes", ol: [
        "Créez votre lien d’avis Google (voir notre guide dédié).",
        "Placez-le là où le client vous voit : comptoir, ticket, table, message WhatsApp de remerciement.",
        "Dites une phrase simple et neutre : « Si vous avez une minute, votre avis sur Google nous aide beaucoup. »",
        "Laissez le client publier depuis son téléphone, sans le regarder ni l’aider à écrire.",
      ] },
      { h2: "Et les récompenses de fidélité ?", p: ["Une récompense de fidélité est possible si elle n’a aucun lien avec l’avis : le client la reçoit qu’il publie un avis ou non. C’est le principe de Boostov Grow, où l’avis Google reste toujours optionnel."], tip: "Règle à retenir : même demande pour tous, aucune contrepartie pour l’avis, le client publie depuis son propre téléphone." },
    ],
  },
  {
    slug: "carte-nfc-ou-qr-code",
    title: "Carte NFC ou QR code : que choisir pour un commerce ? | Boostov",
    h1: "Carte NFC ou QR code : que choisir pour un commerce ?",
    description: "NFC et QR code ouvrent tous les deux une page sur le téléphone du client. Différences, avantages et pourquoi combiner les deux au comptoir.",
    answer: "Le NFC ouvre la page d’un simple tap, le QR code avec l’appareil photo. Le plus sûr pour un commerce est de combiner les deux : NFC pour la rapidité, QR code pour les téléphones sans NFC.",
    published: "2026-10-31",
    og: "blog-nfc-qr",
    image: "/products/connect-stand-1080.webp",
    related: { label: "Voir les cartes et stands", href: "/produits" },
    body: [
      { h2: "Comment fonctionne chaque solution", ul: [
        "NFC : une petite puce dans la carte ou le stand. Le client approche son téléphone et un lien s’ouvre, sans application.",
        "QR code : un code imprimé. Le client ouvre l’appareil photo, vise le code et touche le lien qui apparaît.",
      ] },
      { h2: "Les points forts du NFC", ul: [
        "Un seul geste : approcher le téléphone.",
        "Pas besoin de viser ni d’ouvrir l’appareil photo.",
        "Une expérience qui surprend et qui donne une image moderne.",
      ] },
      { h2: "Les limites du NFC", ul: [
        "Le téléphone doit avoir le NFC, et sur certains Android il doit être activé dans les réglages.",
        "La zone NFC du téléphone n’est pas au même endroit selon les modèles : il faut parfois chercher un peu.",
      ] },
      { h2: "Les points forts du QR code", ul: [
        "Fonctionne avec l’appareil photo de la plupart des smartphones récents.",
        "Peut être imprimé partout : stand, ticket, vitrine, menu.",
      ] },
      { h2: "Pourquoi combiner les deux", p: ["Au comptoir, vous ne choisissez pas le téléphone de vos clients. Avec le NFC et un QR code sur le même support, chaque client a une solution : le tap pour les plus rapides, le scan pour les autres. C’est le choix fait sur toutes les cartes et tous les stands Boostov."], tip: "Vérifiez toujours que le NFC et le QR code ouvrent bien la même page avant de poser le support au comptoir." },
    ],
  },
  {
    slug: "creer-lien-avis-google",
    title: "Créer un lien d’avis Google pour votre commerce | Boostov",
    h1: "Comment créer un lien d’avis Google pour votre commerce",
    description: "Deux façons de créer le lien qui ouvre directement la fenêtre d’avis Google de votre commerce, puis où l’utiliser.",
    answer: "Depuis votre fiche d’établissement Google, utilisez « Demander des avis » pour copier votre lien. Le client qui l’ouvre arrive directement sur la fenêtre pour noter votre commerce.",
    published: "2026-10-31",
    og: "blog-lien-avis",
    image: "/products/grow-stand-1080.webp",
    related: { label: "Mettre votre lien sur un stand Grow", href: "/produits#grow" },
    body: [
      { h2: "Avant de commencer", p: ["Il vous faut une fiche d’établissement Google (Google Business Profile) validée, et être connecté avec le compte Google qui la gère."] },
      { h2: "Méthode 1 : depuis votre fiche Google", ol: [
        "Connectez-vous au compte Google qui gère votre fiche.",
        "Cherchez le nom de votre commerce sur Google ou ouvrez Google Maps : votre fiche s’affiche avec les outils de gestion.",
        "Touchez « Demander des avis » (ou « Obtenir plus d’avis »).",
        "Copiez le lien proposé. C’est votre lien d’avis.",
      ] },
      { h2: "Méthode 2 : avec l’identifiant de lieu (Place ID)", ol: [
        "Trouvez l’identifiant de lieu de votre commerce avec l’outil « Place ID Finder » de Google.",
        "Ajoutez-le à la fin de cette adresse : search.google.com/local/writereview?placeid=",
        "Ouvrez le lien obtenu pour vérifier qu’il affiche bien la fenêtre d’avis de votre commerce.",
      ] },
      { h2: "Où utiliser votre lien", ul: [
        "Sur un stand ou une carte NFC avec QR code au comptoir.",
        "Dans le message WhatsApp de remerciement après une commande.",
        "Sur votre ticket ou votre facture, sous forme de QR code.",
      ], tip: "Testez le lien sur un téléphone qui n’est pas connecté à votre compte : c’est ce que verront vos clients." },
      { p: ["Et n’oubliez pas les règles : même demande pour tous les clients, aucune récompense en échange de l’avis."] },
    ],
  },
];
