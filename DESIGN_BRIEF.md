# boostov.ma — Design brief (v6)

## Goal
The clearest, most persuasive small-business NFC site in Morocco. A shop owner on a phone understands in 5 seconds what Boostov is, sees the real product, sees the price, and taps WhatsApp.

## Audience
Moroccan shop owners (cafés, restaurants, salons, boutiques), mostly on Android phones over 4G, French-speaking. Second audience: people who want to become resellers (18+).

## Principles
1. **Product first.** Big product photography in every section; text supports the photo, never replaces it.
2. **One job per section.** Each answers: what is it, why do I want it, what do I do next.
3. **One primary action.** Green WhatsApp button, same label pattern everywhere ("Commander … sur WhatsApp").
4. **Honest by default.** Real prices, real contact, demo visuals labelled "Visuel de démonstration" / "Exemple de personnalisation". No testimonials, numbers or claims we can't prove. Unknowns are omitted and tracked in `content/TODO.md`.
5. **No system exposure.** No login, no link to the reseller platform.

## Identity (Desminox standards, from the repo)
- Logo: Boostov logo (`public/img/boostov-logo.webp`).
- Colours: blue `#2864F0` (action, accents), ink `#0B1220` (dark sections), ink-2 `#15243B`, grey `#5F6B7A`, line `#D5E0F4`, soft `#EAF1FF`, white. WhatsApp green `#0E7A40` (AA contrast) only for order buttons. Grow accent: warm gold `#E0B04A` (matches the Grow card/stand).
- Type: Inter (self-hosted, variable). Display 800 with tight tracking; body 400–500.

## Layout & rhythm
- Dark / light alternation: dark hero → light problem/fix → light products → dark how-it-works → light personalisation → dark resellers teaser → light FAQ → dark final CTA.
- Mobile first (360/390), 16px gutters, single column, photo leads each block. Desktop 1280: 12-col grid, max 1200px, photo and text side by side, no empty half-screens.
- Spacing scale 4/8/12/16/24/32/48/64/96/128. Radius 10/16/24/32. Three shadow levels.

## Components
Button (wa, primary, ghost, dark variants, 48–56px), Badge, Tag (photo label), Card, ProductCard (photo, name, format, price, CTA), Section (light/tint/dark), SectionHead (eyebrow, H2, answer-first lead), Steps, FAQ (native details), PriceTag, Sticky mobile WhatsApp bar, Header (logo, Produits, Stands, Revendeurs, FAQ, WhatsApp), Footer (WhatsApp, Instagram, delivery, legal).

## Motion
CSS only, transform/opacity, 60 fps: hero photo gentle rise on load, sections fade-up on scroll (scroll-timeline where supported, otherwise static), card hover lift, button press. All disabled with `prefers-reduced-motion`.

## Imagery
| Slot | File | Label |
|---|---|---|
| Connect stand | connect-stand | Visuel de démonstration · Exemple de personnalisation |
| Grow stand | grow-stand (+ grow-stand-avis) | Visuel de démonstration · Exemple de personnalisation |
| Connect / Grow card | connect-card / grow-card (shop name replaced, QR blurred) | Exemple de personnalisation |
| Reseller kit | kit-cards (≤500px until a bigger photo arrives) | — |
Served as responsive WebP (320–1280w) with blur placeholders via `next/image`.

## Quality bar
WCAG AA contrast, 44px tap targets, visible focus, alt text on every image, CLS 0, no console errors, Lighthouse 95+.
