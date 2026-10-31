# boostov.ma — SEO & GEO plan (v6)

## Pages, intent, keywords
| URL | H1 (draft) | Primary keywords | Intent |
|---|---|---|---|
| / | Cartes et stands NFC pour commerces au Maroc | carte NFC Maroc, stand NFC avis Google | discover + order |
| /produits | Connect ou Grow : quelle carte NFC pour votre commerce ? | carte de visite digitale Maroc, fidélisation client commerce | compare + order |
| /stands | Stand NFC personnalisé pour votre comptoir | stand NFC avis Google, présentoir QR code | order stand |
| /revendeurs | Devenir revendeur NFC Boostov | devenir revendeur NFC | pre-order kit |
| /faq | Questions fréquentes sur les cartes et stands NFC | NFC ou QR code, livraison Maroc | answers |
| /blog | Guides Boostov | — | hub |
| /blog/demander-des-avis-google | Comment demander des avis Google sans enfreindre les règles | avis Google commerce, règles avis Google | informational |
| /blog/carte-nfc-ou-qr-code | Carte NFC ou QR code : que choisir pour un commerce ? | NFC ou QR code | informational |
| /blog/creer-lien-avis-google | Créer un lien d'avis Google en 5 minutes | lien avis Google | informational |
| /mentions-legales, /confidentialite | (à valider) | — | trust |

Each page: unique `<title>` (≤60 chars), meta description (≤155), one H1, canonical, OG + Twitter card with a generated 1200×630 OG image.

## Technical
- `sitemap.xml` (all pages + posts), `robots.txt` (allow all, explicitly allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended), clean URLs, `lang="fr"`, `hreflang` fr-MA + x-default (ready for ar-MA).
- JSON-LD: Organization (name, logo, sameAs Instagram, contactPoint WhatsApp), Product + Offer per product/format (MAD, real prices, delivery as shippingDetails 40 MAD), FAQPage, BreadcrumbList, Article (author Organization "Boostov") on posts.
- Performance: responsive WebP with exact `sizes`, LCP image preloaded with `priority`, self-hosted font with metric fallback, almost no client JS (header nav only), CSS-only motion. Targets LCP < 2.5s (4G), CLS < 0.1, INP < 200ms; Lighthouse 95+ on all four categories.

## GEO (AI answer engines)
- Answer-first: every section lead and FAQ answer opens with a 1–2 sentence factual answer.
- Facts in plain HTML text (prices, delivery, contact), comparison as a real `<table>`.
- One source of truth for entity data (`src/config/pricing.ts`, `lib/contact.ts`) reused in copy, JSON-LD and `/llms.txt`.
- `/llms.txt`: what Boostov is, products and prices, delivery, how to order, contact, page index.

## Internal linking
Home → products/stands/revendeurs/faq; product pages ↔ related guides; each guide ends with a link to the relevant product and WhatsApp.

## You must do (after deploy)
1. Google Search Console: verify boostov.ma (DNS TXT), submit `https://boostov.ma/sitemap.xml`.
2. Google Business Profile for Boostov (Agadir) with the same name, WhatsApp and website.
3. Bing Webmaster Tools (import from Search Console).
4. Send the TODO items in `content/TODO.md`.

## Arabic/Darija (later)
All copy lives in `content/fr.ts`; an `ar` dictionary + RTL layout is a contained follow-up (estimate given separately before starting).
