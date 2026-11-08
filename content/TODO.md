# Content TODO (waiting for confirmed facts or assets)

Nothing below is shown on the site until it is confirmed. Update `content/fr.ts` / `content/pages.fr.ts` when it is.

## Assets to provide
- [ ] **Grow v2 stand photo**: real stand, no real shop name visible, ≥1200px. Replaces the drawn stand on the homepage card and /grow. Put it in `assets/products-src/`, then `python scripts/build-images.py`.
- [ ] **Boostov Pro card photo**: ≥1200px. Replaces the drawn black card on the homepage and /pro.
- [ ] **Connect stand photo**: ≥1200px. Replaces the drawn stand on /connect (the old mockup was removed in v7).
- [ ] **Connect card photo, clean version**: the current photo had "QUALITY IFNI" replaced by "Votre commerce" and the QR blurred.
- [ ] **Kit photo**: bigger kit-cards photo (≥1200px). Currently capped at 500px.
- [ ] **PRO_DEMO_URL** in `src/config/pricing.ts`: when set, "Voir la démo" appears on /pro and on the Pro card.
- [ ] **Permission check**: the Grow v2 screen on /grow (`assets/products-src/grow-v2-card.png`) is from `boostovgrowv2/screenshots/final` with the fictional "Café Demo" shop. Confirm it's OK to show.

## Facts to confirm
- [ ] **Grow v2 hosting duration / renewal**: undecided. The site says only "Paiement unique" and "Installation incluse".
- [ ] **Grow v2 visits per reward**: the mockups show 5 slots (as in the app); the copy never states a number.
- [ ] **Pro page contents**: copy lists contact, WhatsApp, links, services. Confirm or adjust.
- [ ] **Stand size and material**: add to /grow and /connect once confirmed.
- [ ] **Reseller system access limit**: number of client shops per reseller (draft said 10, unconfirmed, not shown).
- [ ] **Reseller training**: format, length, content. Site currently says only "Formation incluse".
- [ ] **Kit cards**: blank NFC cards the reseller programs, or personalised? Site currently says only "Cartes NFC Boostov".
- [ ] **ICE / registration number**: add to /mentions-legales when available.
- [ ] **Legal pages**: /mentions-legales and /confidentialite are marked "à valider".
