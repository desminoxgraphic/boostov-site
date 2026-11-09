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

// Beta: 3 test shops get a special Grow v2 price in exchange for feedback and permission to show their results.
// The normal Grow v2 price above stays the regular offer. Leave BETA_PRICE null to show
// "Prix spécial pour les 3 testeurs, sur demande WhatsApp" (never invent a price).
export const BETA_ACTIVE = true;
export const BETA_PRICE: number | null = null;
export const BETA_SLOTS = 3;

// Boostov Pro demo page. Leave empty to hide the "Voir la démo" button.
export const PRO_DEMO_URL = "";
