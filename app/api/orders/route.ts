import { NextRequest, NextResponse } from "next/server";

const allowedOffers = ["Boostov Connect", "Boostov Grow"] as const;
const phonePattern = /^(?:0[67]\d{8}|\+212[67]\d{8})$/;
const buckets = new Map<string, { count: number; resetAt: number }>();
function safeText(value: unknown, max: number) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
function clientKey(request: NextRequest) { return request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"; }
function isRateLimited(key: string) { const now = Date.now(); const current = buckets.get(key); if (!current || current.resetAt < now) { buckets.set(key, { count: 1, resetAt: now + 10 * 60_000 }); return false; } current.count += 1; return current.count > 8; }

export async function POST(request: NextRequest) {
  if (isRateLimited(clientKey(request))) return NextResponse.json({ message: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 });
  let input: Record<string, unknown>;
  try { input = await request.json(); } catch { return NextResponse.json({ message: "Données de commande invalides." }, { status: 400 }); }
  if (safeText(input.website, 100)) return NextResponse.json({ ok: true });
  const name = safeText(input.name, 100); const phone = safeText(input.phone, 20).replace(/[\s.-]/g, ""); const city = safeText(input.city, 100); const offer = safeText(input.offer, 40); const location = safeText(input.location, 500); const quantity = Number(input.quantity);
  if (name.length < 2 || city.length < 2 || !phonePattern.test(phone) || !allowedOffers.includes(offer as (typeof allowedOffers)[number]) || !Number.isInteger(quantity) || quantity < 1 || quantity > 100) return NextResponse.json({ message: "Vérifiez les informations saisies puis réessayez." }, { status: 400 });
  if (location) { try { const url = new URL(location); if (!["http:", "https:"].includes(url.protocol)) throw new Error(); } catch { return NextResponse.json({ message: "Le lien de localisation n’est pas valide." }, { status: 400 }); } }
  const token = process.env.AIRTABLE_TOKEN; const baseId = process.env.AIRTABLE_BASE_ID; const tableName = process.env.AIRTABLE_TABLE_NAME || "Orders";
  if (!token || !baseId) return NextResponse.json({ message: "La prise de commande est momentanément indisponible. Contactez-nous directement." }, { status: 503 });
  try {
    const fields: Record<string, string | number> = { Name: name, Phone: phone, City: city, Offre: offer, "Quantité": quantity };
    if (location) fields.Location = location;
    const response = await fetch(`https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableName)}`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ fields }) });
    if (!response.ok) {
      console.error("[orders] Airtable rejected an order", { status: response.status });
      return NextResponse.json({ message: "La commande n’a pas pu être envoyée. Réessayez dans un instant." }, { status: 502 });
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("[orders] Airtable connection failed", { cause: error instanceof Error ? error.name : "unknown" });
    return NextResponse.json({ message: "Connexion impossible. Vérifiez votre réseau puis réessayez." }, { status: 502 });
  }
}
