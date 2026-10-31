import Image from "next/image";
import { Check, ChevronDown, LogIn, MessageCircle, Nfc, QrCode, ScanLine, Store, Wrench } from "lucide-react";
import { INSTAGRAM_URL, LOGIN_URL, MESSAGES, PHONE_DISPLAY, waHref, type MessageKey } from "@/lib/contact";
import { LAUNCH_PRICE_ACTIVE, PRICING } from "@/src/config/pricing";

// Images are pre-compressed in /public, so the runtime optimizer is skipped (not available on this Nitro build).
const IMG = { unoptimized: true } as const;

function Wa({ msg, children, className = "btn btn-wa" }: { msg: MessageKey; children: React.ReactNode; className?: string }) {
  return <a className={className} href={waHref(MESSAGES[msg])} target="_blank" rel="noreferrer" data-wa={msg}><MessageCircle size={18} aria-hidden="true" />{children}</a>;
}

function InstagramIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
}

function Brand() {
  return <a href="#top" className="brand" aria-label="Boostov, accueil"><Image {...IMG} src="/img/boostov-logo.webp" alt="" width={32} height={32} className="logo-img" priority /><span>boostov<em>.ma</em></span></a>;
}

const products = [
  {
    id: "connect", name: "Connect", tone: "blue", img: "/img/connect-profile.webp", w: 390, h: 844,
    copy: "Un tap ou un scan ouvre la page de votre commerce : appel, WhatsApp, Instagram, itinéraire Maps et « Enregistrer le contact ». Sans application.",
    prices: PRICING.connect, carte: "connectCarte", stand: "connectStand",
  },
  {
    id: "grow", name: "Grow", tone: "gold", img: "/img/grow-review.webp", w: 520, h: 1125,
    copy: "Après l’achat, le client tape et suit un parcours simple : avis Google (optionnel), partage avec ses proches et une récompense pour revenir.",
    prices: PRICING.grow, carte: "growCarte", stand: "growStand",
  },
] as const;

const steps = [
  { icon: Wrench, title: "On programme", copy: "Nous configurons votre carte ou votre stand avec votre page Boostov." },
  { icon: Store, title: "Vous le posez au comptoir", copy: "Le stand ou la carte reste visible là où vos clients paient." },
  { icon: ScanLine, title: "Vos clients scannent", copy: "Un tap NFC ou un scan du QR code, et votre page s’ouvre." },
];

const faqs = [
  ["Combien coûte la livraison ?", `+${PRICING.delivery} DH sur chaque commande, partout au Maroc.`],
  ["Comment commander ?", "Touchez un bouton « Commander » : WhatsApp s’ouvre avec le produit déjà écrit. On confirme ensuite les détails et le paiement avec vous."],
  ["Que comprend la personnalisation ?", "Votre logo, vos couleurs, votre QR code et le texte de votre choix (nom, slogan, réseaux). Nous définissons le design avec vous sur WhatsApp."],
  ["Et si le téléphone n’a pas le NFC ?", "Le QR code imprimé sur la carte ou le stand ouvre exactement la même page. Le client le scanne avec son appareil photo."],
  ["Comment devenir revendeur ?", "Précommandez le Kit 5 ou le Kit 10 sur WhatsApp. Réservé aux personnes de 18 ans et plus. Aucun revenu n’est garanti."],
];

export function BoostovSite() {
  const { kit5, kit10 } = PRICING.kits;
  return <div className="site" id="top">
    <header className="topbar">
      <div className="wrap topbar-inner">
        <Brand />
        <nav className="nav-desktop" aria-label="Navigation principale"><a href="#produits">Produits</a><a href="#stand">Stand</a><a href="#etapes">Comment ça marche</a><a href="#revendeur">Revendeur</a><a href="#faq">FAQ</a></nav>
        <a className="btn btn-login" href={LOGIN_URL}><LogIn size={16} aria-hidden="true" />Connexion</a>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="wrap hero-inner">
          <p className="kicker"><Nfc size={16} aria-hidden="true" />NFC + QR code · Maroc</p>
          <h1>Vos clients tapent ou scannent au comptoir, et retrouvent votre commerce <span>d’un seul geste.</span></h1>
          <p className="hero-sub">Cartes et stands personnalisés pour les commerces locaux : contact, avis, partage et retour client.</p>
          <Wa msg="info" className="btn btn-wa btn-lg">Écrire sur WhatsApp</Wa>
          <p className="hero-note">Livraison partout au Maroc · +{PRICING.delivery} DH</p>
        </div>
      </section>

      <section id="produits" className="sec">
        <div className="wrap">
          <p className="eyebrow">Produits</p>
          <h2 className="title">Deux produits. Carte ou stand.</h2>
          <div className="prod-grid">
            {products.map((p) => <article key={p.id} className={`prod prod-${p.tone}`} aria-labelledby={`p-${p.id}`}>
              <div className="prod-shot">
                <Image {...IMG} src={p.img} alt={`Écran réel Boostov ${p.name}, commerce de démonstration`} width={p.w} height={p.h} sizes="140px" />
              </div>
              <div className="prod-body">
                <h3 id={`p-${p.id}`}>Boostov {p.name}</h3>
                <p>{p.copy}</p>
              </div>
              <ul className="price-list">
                <li><span>Carte</span><b>{p.prices.carte} DH</b><Wa msg={p.carte} className="btn btn-wa btn-sm">Commander sur WhatsApp</Wa></li>
                <li><span>Stand</span><b>{p.prices.stand} DH</b><Wa msg={p.stand} className="btn btn-wa btn-sm">Commander sur WhatsApp</Wa></li>
              </ul>
              <p className="prod-foot">Écran : commerce de démonstration · Livraison +{PRICING.delivery} DH</p>
            </article>)}
          </div>
        </div>
      </section>

      <section id="stand" className="sec sec-alt">
        <div className="wrap stand-grid">
          <figure className="stand-photo">
            <Image {...IMG} src="/products/stand-sample.jpg" alt="Photo réelle du stand vierge, avant personnalisation (7,6 × 12,75 cm)" width={602} height={686} sizes="(min-width: 900px) 460px, 100vw" />
            <figcaption>Photo réelle : stand vierge, avant personnalisation.</figcaption>
          </figure>
          <div>
            <p className="eyebrow">Stand personnalisé</p>
            <h2 className="title">Un stand à votre image, posé sur votre comptoir.</h2>
            <p className="lead">Chaque stand est préparé pour un seul commerce. Format 7,6 × 12,75 cm, base de 5 cm.</p>
            <ul className="ticks">
              {["Votre logo", "Vos couleurs de marque", "Votre QR code", "Puce NFC programmée", "Texte au choix : nom, slogan, réseaux"].map((t) => <li key={t}><Check size={16} strokeWidth={3} aria-hidden="true" />{t}</li>)}
            </ul>
            <Wa msg="stand">Commander un stand personnalisé</Wa>
          </div>
        </div>
      </section>

      <section id="etapes" className="sec">
        <div className="wrap">
          <p className="eyebrow">Comment ça marche</p>
          <h2 className="title">Trois étapes.</h2>
          <ol className="steps">
            {steps.map(({ icon: Icon, title, copy }, i) => <li key={title}><span className="step-n">{i + 1}</span><Icon size={22} aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></li>)}
          </ol>
        </div>
      </section>

      <section id="revendeur" className="sec sec-dark">
        <div className="wrap">
          <p className="eyebrow light">Devenir revendeur</p>
          <h2 className="title">Proposez Boostov aux commerces de votre ville.</h2>
          <div className="kit-grid">
            {([["Kit 5", kit5, "kit5"], ["Kit 10", kit10, "kit10"]] as const).map(([name, kit, msg]) => <article key={name} className="kit">
              {LAUNCH_PRICE_ACTIVE && <span className="badge">Prix de lancement, 10 premiers kits</span>}
              <h3>{name}</h3>
              <strong>{kit.price} <em>DH</em></strong>
              <ul className="ticks">
                <li><Check size={16} strokeWidth={3} aria-hidden="true" />{kit.cartes} cartes</li>
                <li><Check size={16} strokeWidth={3} aria-hidden="true" />Accès au système</li>
                <li><Check size={16} strokeWidth={3} aria-hidden="true" />Formation</li>
              </ul>
              <Wa msg={msg} className="btn btn-wa wide">Précommander sur WhatsApp</Wa>
            </article>)}
          </div>
          <p className="fine">Réservé aux 18 ans et plus. Livraison +{PRICING.delivery} DH. Aucun revenu n’est promis ni garanti : vos résultats dépendent de vos ventes.</p>
        </div>
      </section>

      <section id="faq" className="sec">
        <div className="wrap faq-wrap">
          <p className="eyebrow">FAQ</p>
          <h2 className="title">Questions fréquentes.</h2>
          <div className="faq">
            {faqs.map(([q, a]) => <details key={q}><summary>{q}<ChevronDown size={18} aria-hidden="true" /></summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="wrap footer-inner">
        <Brand />
        <div className="footer-links">
          <Wa msg="info" className="flink">WhatsApp {PHONE_DISPLAY}</Wa>
          <a className="flink" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><InstagramIcon />@boostov.ma</a>
        </div>
        <p className="powered"><QrCode size={14} aria-hidden="true" />Powered by boostov.ma</p>
      </div>
    </footer>

    <div className="sticky-wa"><Wa msg="info" className="btn btn-wa wide">Commander sur WhatsApp</Wa></div>
  </div>;
}
