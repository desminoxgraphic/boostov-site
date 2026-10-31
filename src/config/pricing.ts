// Single source of truth for every price shown on boostov.ma (DH).
export const PRICING = {
  connect: { carte: 200, stand: 250 },
  grow: { carte: 250, stand: 300 },
  delivery: 40,
  kits: {
    kit5: { cartes: 5, price: 250 },
    kit10: { cartes: 10, price: 350 },
  },
} as const;

// Shows "Prix de lancement, 10 premiers kits" on the reseller kits.
export const LAUNCH_PRICE_ACTIVE = true;
