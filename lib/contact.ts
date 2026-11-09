// Single source of truth for Boostov contact details and WhatsApp messages.
// Relative .ts import so node --test can load this file directly.
import { PRICING } from "../src/config/pricing.ts";

export const PHONE_LOCAL = "0709272476";
export const PHONE_E164 = "+212709272476";
export const PHONE_DISPLAY = "07 09 27 24 76";
export const INSTAGRAM_URL = "https://www.instagram.com/boostov.ma/";

const { grow, pro, connect, kits } = PRICING;

// Short, polite French. Every message names the product so the order is clear from the first line.
export const MESSAGES = {
  info: "Bonjour Boostov, je souhaite commander. Pouvez-vous me conseiller le bon produit ?",
  grow: `Bonjour Boostov, je souhaite commander Boostov Grow v2 (stand fidélité, ${grow.stand} DH). Merci !`,
  growBeta: "Bonjour Boostov, mon commerce souhaite devenir testeur de la Beta Boostov Grow v2 (prix spécial testeurs). Merci !",
  pro: `Bonjour Boostov, je souhaite commander la carte Boostov Pro (${pro.carte} DH). Merci !`,
  connect: `Bonjour Boostov, je souhaite commander Boostov Connect (carte ${connect.carte} DH ou stand ${connect.stand} DH). Merci !`,
  connectCarte: `Bonjour Boostov, je souhaite commander la carte Boostov Connect (${connect.carte} DH). Merci !`,
  connectStand: `Bonjour Boostov, je souhaite commander le stand Boostov Connect (${connect.stand} DH). Merci !`,
  kit5: `Bonjour Boostov, je souhaite précommander le Kit 5 revendeur (${kits.kit5.price} DH). Merci !`,
  kit10: `Bonjour Boostov, je souhaite précommander le Kit 10 revendeur (${kits.kit10.price} DH). Merci !`,
  reseller: "Bonjour Boostov, je souhaite précommander un kit revendeur (Kit 5 ou Kit 10). Merci !",
} as const;

export type MessageKey = keyof typeof MESSAGES;

export const telHref = `tel:${PHONE_E164}`;
export function waHref(message?: string) {
  const base = `https://wa.me/${PHONE_E164.slice(1)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
