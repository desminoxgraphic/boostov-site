// Single source of truth for Boostov contact details and WhatsApp messages.
export const PHONE_LOCAL = "0789216699";
export const PHONE_E164 = "+212789216699";
export const PHONE_DISPLAY = "07 89 21 66 99";
export const INSTAGRAM_URL = "https://www.instagram.com/boostov.ma/";

export const MESSAGES = {
  info: "Salam Boostov, bghit n3ref ktar 3la Connect w Grow.",
  connectCarte: "Salam, bghit Carte Connect personnalisée",
  connectStand: "Salam, bghit Stand Connect personnalisé",
  growCarte: "Salam, bghit Carte Grow personnalisée",
  growStand: "Salam, bghit Stand Grow personnalisé",
  stand: "Salam, bghit Stand personnalisé (logo, couleurs, QR code)",
  kit5: "Salam, bghit précommande Kit 5 revendeur",
  kit10: "Salam, bghit précommande Kit 10 revendeur",
  reseller: "Salam, bghit précommande kit revendeur (Kit 5 wla Kit 10)",
} as const;

export type MessageKey = keyof typeof MESSAGES;

export const telHref = `tel:${PHONE_E164}`;
export function waHref(message?: string) {
  const base = `https://wa.me/${PHONE_E164.slice(1)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
