// Single source of truth for Boostov contact details and prices.
export const PHONE_LOCAL = "0789216699";
export const PHONE_E164 = "+212789216699";
export const PHONE_DISPLAY = "07 89 21 66 99";

export const PRICES = { connect: 349, grow: 429, pack: 649 } as const;
export const PACK_SEPARATE_TOTAL = PRICES.connect + PRICES.grow;
export const PACK_SAVING = PACK_SEPARATE_TOTAL - PRICES.pack;

export const MESSAGES = {
  support: "Bonjour Boostov, j’aimerais avoir des informations.",
  order: "Bonjour Boostov, je souhaite commander. Pouvez-vous m’aider à choisir entre Connect, Grow et le Pack Grow + Connect ?",
  pack: `Bonjour Boostov, je souhaite commander le Pack Grow + Connect à ${PRICES.pack} DH (livraison gratuite).`,
} as const;

export const telHref = `tel:${PHONE_E164}`;
export function waHref(message?: string) {
  const base = `https://wa.me/${PHONE_E164.slice(1)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
