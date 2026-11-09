# Content TODO (waiting for confirmed facts or assets)

Nothing below is shown on the site until it is confirmed. Update `content/fr.ts` / `content/pages.fr.ts` when it is.

## Assets to provide
- [ ] **Real photos to replace the renders** (v8 uses designed renders from `assets/renders/scenes.html`, built with `node scripts/build-renders.mjs` then `python scripts/build-images.py`): Grow v2 stand, Boostov Pro card, Connect card, Connect stand. No real shop name visible, ≥1200px.
- [ ] **Kit photo**: bigger kit-cards photo (≥1200px). Currently capped at 500px.
- [ ] **PRO_DEMO_URL** in `src/config/pricing.ts`. freelancerboostov/PLAN.md lists a live demo at https://boostov-pro.vercel.app/demo: set it only once you confirm.
- [ ] **BETA_PRICE** in `src/config/pricing.ts` (null = "Prix spécial pour les 3 testeurs, sur demande WhatsApp").

## Facts to confirm
- [ ] **Grow v2 hosting duration / renewal**: undecided. The site says only "Paiement unique" and "Installation incluse".
- [ ] **Grow v2 visits per reward**: the mockups show 5 slots (as in the app); the copy never states a number.
- [ ] **Pro card QR code**: the site says Pro works with NFC and QR (the Pro app tracks QR views). Confirm the printed Pro card has a QR code.
- [ ] **Pro features shown**: taken from freelancerboostov (profile, links, gallery ≤ 6, assistant, quote requests, stats). Confirm they are all in the 300 DH offer.
- [ ] **Stand size and material**: add to /grow and /connect once confirmed.
- [ ] **Reseller system access limit**: number of client shops per reseller (draft said 10, unconfirmed, not shown).
- [ ] **Reseller training**: format, length, content. Site currently says only "Formation incluse".
- [ ] **Kit cards**: blank NFC cards the reseller programs, or personalised? Site currently says only "Cartes NFC Boostov".
- [ ] **ICE / registration number**: add to /mentions-legales when available.
- [ ] **Legal pages**: /mentions-legales and /confidentialite are marked "à valider".
