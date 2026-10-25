"use client";
/* eslint-disable @next/next/no-img-element -- images are pre-sized WebP in /public/img; plain <img> avoids the runtime optimizer on this Nitro/Vercel build. */

import { useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart3, Check, Gift, Heart, Link2, MapPin, Menu, MessageCircle, Moon, Phone, QrCode, Radio, Save, Share2, ShieldCheck, Smartphone, Star, Sun, Truck, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { OrderModal, type Offer } from "@/components/boostov/order-modal";
import { useNearViewport, usePrefersReducedMotion, useReveal, useScrollProgress, useTilt } from "@/components/boostov/motion";
import { MESSAGES, PACK_SAVING, PACK_SEPARATE_TOTAL, PHONE_DISPLAY, PRICES, telHref, waHref } from "@/lib/contact";

const faqs = [
  ["Est-ce qu’une application est nécessaire ?", "Non. Vos clients ouvrent votre profil directement depuis leur navigateur, sans rien installer."],
  ["Est-ce compatible avec iPhone et Android ?", "Oui, avec les smartphones compatibles NFC. Le QR code offre aussi une alternative simple."],
  ["Puis-je modifier mes informations après la commande ?", "Oui. Vos informations et liens peuvent évoluer sans remplacer votre carte."],
  ["Comment fonctionne Boostov Connect ?", "Un tap ouvre votre profil digital avec vos coordonnées, liens, galerie et actions utiles."],
  ["Comment fonctionne Boostov Grow ?", "Après un tap, le client suit un parcours qui peut inclure avis, partage, récompense et retour en boutique."],
  ["Est-ce que la livraison est gratuite ?", "Oui, la livraison est gratuite partout au Maroc pour Connect et Grow."],
  ["Comment se passe le paiement ?", "Après votre commande, notre équipe vous contacte pour confirmer les informations et les modalités de paiement."],
  ["Que se passe-t-il après ma commande ?", "Nous vous contactons pour confirmer la commande, puis nous préparons votre carte et votre expérience digitale."],
];
const connectFeatures = ["Carte NFC personnalisée", "Profil digital premium", "WhatsApp, téléphone, réseaux sociaux, Maps", "Galerie ou catalogue", "Enregistrer le contact", "Analytics des visites et clics", "Informations modifiables sans changer la carte"];
const growFeatures = ["Expérience NFC après achat", "Avis Google optionnel", "Partage avec des proches", "Récompense unique", "Retour client et fidélisation", "Dashboard marchand", "Suivi des interactions"];
const growSteps = [
  { key: "merci", label: "Merci", icon: Heart, title: "Un merci chaleureux", copy: "Le client tape la carte après son achat : une page à vos couleurs le remercie.", img: "/img/grow-thanks.webp" },
  { key: "avis", label: "Avis", icon: Star, title: "Avis Google, en option", copy: "Il peut noter sa visite et publier son avis sur Google Maps — s’il le souhaite.", img: "/img/grow-review.webp" },
  { key: "partage", label: "Partage", icon: Share2, title: "Partage avec ses proches", copy: "Un bouton pour recommander votre adresse à ses amis.", img: "/img/grow-share.webp" },
  { key: "recompense", label: "Récompense", icon: Gift, title: "Une récompense unique", copy: "Une carte de récompense à usage unique, à présenter lors de sa prochaine visite.", img: "/img/grow-reward.webp" },
] as const;

function Logo({ size = 34 }: { size?: number }) {
  return <img src="/img/boostov-logo.webp" alt="" width={size} height={size} className="logo-img" style={{ width: size, height: size }} />;
}

function Brand() {
  return <a href="#top" className="brand" aria-label="Boostov — accueil"><Logo /><span>boostov<em>.ma</em></span></a>;
}

function ThemeToggle() {
  const toggleTheme = () => {
    const nextDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextDark);
    document.documentElement.style.colorScheme = nextDark ? "dark" : "light";
    window.localStorage.setItem("theme", nextDark ? "dark" : "light");
  };
  return <button className="icon-btn" type="button" onClick={toggleTheme} aria-label="Changer le thème clair ou sombre" title="Changer le thème"><Sun className="theme-icon-sun" size={18} /><Moon className="theme-icon-moon" size={18} /></button>;
}

function NfcWaves({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M7 8.5a5 5 0 0 1 0 7" /><path d="M11 6a8.5 8.5 0 0 1 0 12" /><path d="M15 3.5a12 12 0 0 1 0 17" /></svg>;
}

function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`phone ${className}`}><div className="phone-screen">{children}</div></div>;
}

function NfcCard({ variant = "signal", className = "", label }: { variant?: "signal" | "gold"; className?: string; label?: string }) {
  return <div className={`nfc-card ${variant} ${className}`} aria-hidden="true"><div className="nfc-card-face"><div className="nfc-card-top"><Logo size={30} /><NfcWaves className="nfc-waves" /></div><div className="nfc-chip" /><div className="nfc-card-bottom"><b>{label ?? "boostov.ma"}</b><small>TAP · NFC · QR</small></div></div></div>;
}

function Hero({ reduced, onOrderPack }: { reduced: boolean; onOrderPack: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const [screen, setScreen] = useState<"connect" | "grow">("connect");
  const [tapping, setTapping] = useState(false);
  useScrollProgress(section, !reduced);
  useTilt(stage, !reduced);

  const tap = () => {
    if (tapping) return;
    setTapping(true);
    window.setTimeout(() => setScreen((s) => (s === "connect" ? "grow" : "connect")), reduced ? 0 : 380);
    window.setTimeout(() => setTapping(false), reduced ? 0 : 900);
  };
  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => { setTapping(true); window.setTimeout(() => setTapping(false), 900); }, 900);
    return () => window.clearTimeout(t);
  }, [reduced]);

  return <section ref={section} className="hero" id="top-hero">
    <div className="hero-rings" aria-hidden="true"><i /><i /><i /></div>
    <div className="wrap hero-grid">
      <div className="hero-text">
        <p className="kicker"><span className="dot" />Cartes NFC pour commerces · Maroc</p>
        <h1>Un tap.<br /><span>Plus de business.</span></h1>
        <p className="hero-sub"><b>Boostov Connect</b> présente votre commerce. <b>Boostov Grow</b> invite vos clients à laisser un avis, partager et revenir.</p>
      </div>
      <div className="stage-label" aria-live="polite"><span className={`chip ${screen}`}>{screen === "connect" ? "Connect" : "Grow"}</span>{screen === "connect" ? "Votre profil s’ouvre" : "Avis, partage, récompense"}<button type="button" onClick={tap} className="stage-tap">Tapez la carte <NfcWaves className="w14" /></button></div>
      <div className="hero-actions">
        <div className="hero-ctas">
          <a className="btn btn-white" href={onOrderPack} target="_blank" rel="noreferrer" data-wa="pack"><MessageCircle size={19} />Commander le Pack · {PRICES.pack} DH</a>
          <a className="btn btn-glass" href="#offres">Voir les offres <ArrowRight size={17} /></a>
        </div>
        <p className="hero-note"><Truck size={16} /> Livraison gratuite partout au Maroc</p>
      </div>
      <div ref={stage} className={`hero-stage ${tapping ? "is-tapping" : ""}`}>
        <div className="hero-mega" aria-hidden="true"><span>TAP.</span><span className="outline">TAP.</span></div>
        <PhoneFrame className="hero-phone">
          <img className={screen === "connect" ? "on" : ""} src="/img/connect-profile.webp" alt="Page Boostov Connect réelle : profil d’un commerce de démonstration" width={390} height={844} fetchPriority="high" />
          <img className={screen === "grow" ? "on" : ""} src="/img/grow-review.webp" alt="Parcours Boostov Grow réel : écran d’avis d’un commerce de démonstration" width={520} height={1125} loading="lazy" />
          <span className="tap-ripple" aria-hidden="true" />
        </PhoneFrame>
        <button type="button" className="hero-card-btn" onClick={tap} aria-label={`Démo : taper la carte pour afficher ${screen === "connect" ? "Boostov Grow" : "Boostov Connect"}`}>
          <NfcCard className="hero-card" />
        </button>
      </div>
    </div>
  </section>;
}

function Ticker() {
  const items: [typeof Radio, string][] = [[Radio, "NFC + QR code"], [Smartphone, "Sans application"], [Truck, "Livraison gratuite"], [Link2, "Profil modifiable"], [BarChart3, "Analytics"], [MessageCircle, "Support WhatsApp"]];
  const row = items.map(([Icon, label]) => <span className="tick" key={label}><Icon size={16} />{label}</span>);
  return <div className="ticker" aria-label="Points clés"><div className="ticker-track"><div className="ticker-row">{row}</div><div className="ticker-row" aria-hidden="true">{row}</div></div></div>;
}

function ConnectSection({ reduced, onOrder }: { reduced: boolean; onOrder: (o: Offer) => void }) {
  const section = useRef<HTMLElement>(null);
  const near = useNearViewport(section, "600px");
  useScrollProgress(section, !reduced);
  return <section ref={section} id="connect" className="sheet connect">
    <div className="giant-word" aria-hidden="true">CONNECT</div>
    <div className="wrap split">
      <div className="split-top">
        <p className="eyebrow rv">Boostov Connect · carte de visite digitale</p>
        <h2 className="title rv">Votre commerce,<br /><span>en un tap.</span></h2>
        <p className="lead rv">Un tap sur la carte ouvre votre profil : appel, WhatsApp, Instagram, itinéraire Maps, galerie et bouton « Enregistrer le contact ». Sans application.</p>
      </div>
      <div className="split-bottom">
        <div className="action-grid rv">{[[Phone, "Appel"], [MessageCircle, "WhatsApp"], [MapPin, "Maps"], [Save, "Contact"]].map(([I, l]) => { const Icon = I as typeof Phone; return <span key={l as string}><Icon size={18} />{l as string}</span>; })}</div>
        <ul className="ticks rv">{connectFeatures.map((f) => <li key={f}><Check size={15} strokeWidth={3} />{f}</li>)}</ul>
        <div className="buy-row rv"><div><small>Boostov Connect</small><strong>{PRICES.connect} <em>DH</em></strong></div><button className="btn btn-blue" onClick={() => onOrder("Boostov Connect")}>Commander Connect <ArrowRight size={17} /></button></div>
      </div>
      <div className="split-visual rv">
        <PhoneFrame className="scroll-phone">
          {near ? <img className="scroll-shot" src="/img/connect-profile-full.webp" alt="Page publique Boostov Connect réelle, commerce de démonstration « Atlas Coffee Roasters »" width={390} height={2165} loading="lazy" decoding="async" /> : <div className="shot-placeholder" />}
        </PhoneFrame>
        <NfcCard className="float-card" />
        <p className="shot-caption">Écran réel du produit · commerce de démonstration</p>
      </div>
    </div>
  </section>;
}

function GrowSection({ reduced, onOrder }: { reduced: boolean; onOrder: (o: Offer) => void }) {
  const section = useRef<HTMLElement>(null);
  const near = useNearViewport(section, "500px");
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!near || !auto || reduced) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % growSteps.length), 3200);
    return () => window.clearInterval(t);
  }, [near, auto, reduced]);
  const step = growSteps[active];
  return <section ref={section} id="grow" className="sheet grow">
    <div className="giant-word gold" aria-hidden="true">GROW</div>
    <div className="wrap split reverse">
      <div className="split-top">
        <p className="eyebrow gold rv">Boostov Grow · avis, partage, retour</p>
        <h2 className="title rv">Chaque visite peut<br /><span className="gold-text">en amener une autre.</span></h2>
        <p className="lead rv">Après l’achat, votre client tape la carte et suit un parcours simple. Touchez une étape pour voir l’écran réel.</p>
      </div>
      <div className="split-tabs">
        <div className="steps-tabs rv" role="group" aria-label="Étapes du parcours Boostov Grow">
          {growSteps.map((s, i) => { const Icon = s.icon; return <button key={s.key} type="button" aria-pressed={i === active} className={i === active ? "on" : ""} onClick={() => { setActive(i); setAuto(false); }}><b>{i + 1}</b><Icon size={17} />{s.label}</button>; })}
        </div>
      </div>
      <div className="split-bottom">
        <div className="step-detail rv" aria-live="polite"><h3>{step.title}</h3><p>{step.copy}</p></div>
        <p className="note"><ShieldCheck size={17} /> La récompense n’est jamais conditionnée par la publication d’un avis Google.</p>
        <ul className="ticks gold rv">{growFeatures.map((f) => <li key={f}><Check size={15} strokeWidth={3} />{f}</li>)}</ul>
        <div className="buy-row rv"><div><small>Boostov Grow</small><strong>{PRICES.grow} <em>DH</em></strong></div><button className="btn btn-gold" onClick={() => onOrder("Boostov Grow")}>Commander Grow <ArrowRight size={17} /></button></div>
      </div>
      <div className="split-visual rv">
        <PhoneFrame className="grow-phone">
          {near ? growSteps.map((s, i) => <img key={s.key} className={i === active ? "on" : ""} src={s.img} alt={`Écran réel Boostov Grow : ${s.title} (commerce de démonstration)`} width={520} height={1125} loading="lazy" decoding="async" />) : <div className="shot-placeholder dark" />}
        </PhoneFrame>
        <NfcCard variant="gold" className="float-card" />
        <p className="shot-caption">Écrans réels du produit · commerce de démonstration</p>
      </div>
    </div>
  </section>;
}

function PackSection({ onOrder }: { onOrder: (o: Offer) => void }) {
  return <section id="offres" className="sheet pack-sec">
    <div className="wrap">
      <p className="eyebrow light rv">Les offres</p>
      <h2 className="title rv">Le Pack.<br /><span className="outline-text">Grow + Connect.</span></h2>
      <article className="pack rv" aria-labelledby="pack-title">
        <div className="pack-cards" aria-hidden="true"><NfcCard className="pc pc-connect" label="Connect" /><NfcCard variant="gold" className="pc pc-grow" label="Grow" /></div>
        <div className="pack-body">
          <span className="save-tag">Vous économisez {PACK_SAVING} DH</span>
          <h3 id="pack-title">Pack Grow + Connect</h3>
          <div className="pack-math" aria-label={`Grow ${PRICES.grow} DH plus Connect ${PRICES.connect} DH égale ${PACK_SEPARATE_TOTAL} DH séparément`}>
            <span>Grow {PRICES.grow} DH</span><i>+</i><span>Connect {PRICES.connect} DH</span><i>=</i><s>{PACK_SEPARATE_TOTAL} DH</s>
          </div>
          <div className="pack-price"><strong>{PRICES.pack}</strong><em>DH</em><span className="was">au lieu de <s>{PACK_SEPARATE_TOTAL} DH</s></span></div>
          <p className="pack-ship"><Truck size={18} /> Livraison gratuite</p>
          <ul className="pack-list"><li><Check size={15} strokeWidth={3} />Boostov Connect : carte NFC + profil digital</li><li><Check size={15} strokeWidth={3} />Boostov Grow : parcours avis, partage, récompense</li></ul>
          <a className="btn btn-white wide" href={waHref(MESSAGES.pack)} target="_blank" rel="noreferrer" data-wa="pack"><MessageCircle size={19} />Commander le Pack sur WhatsApp</a>
        </div>
      </article>
      <div className="solo-grid">
        <article className="solo rv"><div className="solo-top"><Radio size={20} /><h3>Connect</h3></div><p>Carte NFC + profil digital modifiable.</p><strong>{PRICES.connect} <em>DH</em></strong><small>Livraison gratuite</small><button className="btn btn-blue wide" onClick={() => onOrder("Boostov Connect")}>Commander Connect</button></article>
        <article className="solo rv"><div className="solo-top"><Star size={20} /><h3>Grow</h3></div><p>Avis, partage et récompense après l’achat.</p><strong>{PRICES.grow} <em>DH</em></strong><small>Livraison gratuite</small><button className="btn btn-ink wide" onClick={() => onOrder("Boostov Grow")}>Commander Grow</button></article>
      </div>
    </div>
  </section>;
}

function HowItWorks() {
  const steps = [["01", "Commandez votre Boostov", "Choisissez Connect, Grow ou le Pack et envoyez votre demande."], ["02", "Nous préparons votre expérience", "Notre équipe confirme vos informations et configure votre solution."], ["03", "Commencez à l’utiliser", "Votre carte et votre expérience digitale sont prêtes à travailler pour vous."]];
  return <section id="fonctionnement" className="sheet how">
    <div className="wrap">
      <p className="eyebrow rv">Comment ça marche</p>
      <h2 className="title rv">Commandez.<br />Configurez. <span>Tap.</span></h2>
      <ol className="how-grid">{steps.map(([n, t, c]) => <li className="how-step rv" key={n}><span className="how-n">{n}</span><h3>{t}</h3><p>{c}</p></li>)}</ol>
    </div>
  </section>;
}

function Faq() {
  return <section id="faq" className="sheet faq">
    <div className="wrap faq-grid">
      <div><p className="eyebrow rv">FAQ</p><h2 className="title rv">Les réponses,<br />simplement.</h2></div>
      <Accordion className="faq-panel" type="single" collapsible>{faqs.map(([q, a], i) => <AccordionItem value={`faq-${i}`} key={q}><AccordionTrigger className="faq-q">{q}</AccordionTrigger><AccordionContent className="faq-a">{a}</AccordionContent></AccordionItem>)}</Accordion>
    </div>
  </section>;
}

function FinalCta() {
  return <section className="final">
    <div className="hero-rings" aria-hidden="true"><i /><i /><i /></div>
    <div className="wrap final-inner">
      <p className="kicker"><span className="dot" />Votre prochaine connexion commence ici</p>
      <h2>Prêt à booster<br />votre business ?</h2>
      <div className="final-ctas">
        <a className="btn btn-white" href={waHref(MESSAGES.order)} target="_blank" rel="noreferrer" data-wa="order"><MessageCircle size={19} />Écrire sur WhatsApp</a>
        <a className="btn btn-glass" href={telHref} data-tel="final"><Phone size={18} />Appeler le {PHONE_DISPLAY}</a>
      </div>
    </div>
  </section>;
}

export function BoostovSite() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [menu, setMenu] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [offer, setOffer] = useState<Offer>("Boostov Connect");
  const order = (next: Offer = "Boostov Connect") => { setOffer(next); setOrderOpen(false); requestAnimationFrame(() => setOrderOpen(true)); };
  useReveal(root, !reduced);

  return <div ref={root} className="site" id="top">
    <header className="topbar">
      <div className="wrap topbar-inner">
        <Brand />
        <nav className="nav-desktop" aria-label="Navigation principale"><a href="#connect">Connect</a><a href="#grow">Grow</a><a href="#offres">Offres</a><a href="#fonctionnement">Comment ça marche</a><a href="#faq">FAQ</a></nav>
        <div className="topbar-actions">
          <ThemeToggle />
          <a className="btn btn-wa-sm" href={waHref(MESSAGES.support)} target="_blank" rel="noreferrer" data-wa="header" aria-label="Écrire à Boostov sur WhatsApp"><MessageCircle size={16} /><span>WhatsApp</span></a>
          <button className="icon-btn menu-btn" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}>{menu ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {menu && <nav className="mobile-menu" aria-label="Menu mobile"><div className="wrap">{[["#connect", "Boostov Connect"], ["#grow", "Boostov Grow"], ["#offres", "Offres & Pack"], ["#fonctionnement", "Comment ça marche"], ["#faq", "FAQ"]].map(([h, l]) => <a key={h} href={h} onClick={() => setMenu(false)}>{l}<ArrowRight size={16} /></a>)}<a href="https://www.instagram.com/boostov.ma/" target="_blank" rel="noreferrer">Instagram · @boostov.ma<ArrowRight size={16} /></a><a href={telHref} data-tel="menu">Appeler le {PHONE_DISPLAY}<Phone size={16} /></a></div></nav>}
    </header>

    <main>
      <Hero reduced={reduced} onOrderPack={waHref(MESSAGES.pack)} />
      <Ticker />
      <ConnectSection reduced={reduced} onOrder={order} />
      <GrowSection reduced={reduced} onOrder={order} />
      <PackSection onOrder={order} />
      <HowItWorks />
      <Faq />
      <FinalCta />
    </main>

    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div><Brand /><p className="footer-copy">Des outils digitaux conçus pour aider les entreprises marocaines à mieux se connecter et grandir.</p></div>
          <div><b>Navigation</b><a href="#connect">Boostov Connect</a><a href="#grow">Boostov Grow</a><a href="#offres">Offres</a><a href="#faq">FAQ</a></div>
          <div><b>Contact</b><a href={waHref(MESSAGES.support)} target="_blank" rel="noreferrer" data-wa="footer">WhatsApp · {PHONE_DISPLAY}</a><a href={telHref} data-tel="footer">Téléphone · {PHONE_DISPLAY}</a><a href="https://www.instagram.com/boostov.ma/" target="_blank" rel="noreferrer">Instagram · @boostov.ma</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Boostov · boostov.ma</span><span><QrCode size={14} /> NFC + QR code</span></div>
      </div>
    </footer>

    <div className="sticky-bar" role="region" aria-label="Contact rapide">
      <a className="btn btn-wa" href={waHref(MESSAGES.order)} target="_blank" rel="noreferrer" data-wa="sticky"><MessageCircle size={20} />Commander sur WhatsApp</a>
      <a className="btn-call" href={telHref} aria-label={`Appeler Boostov au ${PHONE_DISPLAY}`} data-tel="sticky"><Phone size={20} /></a>
    </div>
    <OrderModal key={offer} open={orderOpen} offer={offer} onOpenChange={setOrderOpen} />
  </div>;
}
