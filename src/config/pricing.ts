// Single source of truth for every price shown on boostov.ma (DH, paiement unique).
export const PRICING = {
  grow: { stand: 499 },
  pro: { carte: 300 },
  connect: { carte: 200, stand: 250 },
  kits: {
    kit5: { cartes: 5, price: 250 },
    kit10: { cartes: 10, price: 350 },
  },
} as const;

// Shows "Prix de lancement, 10 premiers kits" on the reseller kits.
export const LAUNCH_PRICE_ACTIVE = true;

// Boostov Pro demo page. Leave empty to hide the "Voir la démo" button.
export const PRO_DEMO_URL = "";
