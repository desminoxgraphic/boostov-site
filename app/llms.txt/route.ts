// /llms.txt: a plain-text summary for AI answer engines, built from the same sources as the site.
import { PRICING } from "@/src/config/pricing";
import { INSTAGRAM_URL, PHONE_E164 } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";
import { POSTS } from "@/content/blog.fr";

export const dynamic = "force-static";

export function GET() {
  const { grow, pro, connect, kits } = PRICING;
  const body = `# Boostov

> Boostov (boostov.ma), basé à Agadir au Maroc : « la tech qui fait grandir votre business ». Fidélité client et cartes NFC + QR code pour les commerces et les professionnels. Commande uniquement sur WhatsApp. Paiement unique.

## Produits et prix (MAD)
- Boostov Grow v2 : stand de fidélité pour commerces. Le client touche le stand (NFC) ou scanne le QR code, valide sa visite et gagne un point. Le commerçant choisit la récompense ; le compteur repart à zéro ensuite. Rappel WhatsApp, export des contacts, avis Google optionnel (jamais lié à la récompense). Stand ${grow.stand} DH, installation incluse. Actuellement en Beta : Boostov cherche 3 commerces testeurs.
- Boostov Pro : carte NFC pour freelances et professionnels, avec une page personnelle (contact, WhatsApp, liens, services). Carte ${pro.carte} DH.
- Boostov Connect : carte ou stand NFC + QR code qui ouvre la page du commerce (WhatsApp, appel, Instagram, localisation, enregistrer le contact). Carte ${connect.carte} DH, stand ${connect.stand} DH.
- Sans application : les pages s'ouvrent dans le navigateur du téléphone.

## Revendeurs (18 ans et plus)
- Kit 5 : ${kits.kit5.cartes} cartes NFC Boostov, accès au système, formation. ${kits.kit5.price} DH.
- Kit 10 : ${kits.kit10.cartes} cartes NFC Boostov, accès au système, formation. ${kits.kit10.price} DH.
- Aucun revenu n'est promis.

## Contact
- WhatsApp : ${PHONE_E164}
- Instagram : ${INSTAGRAM_URL}

## Pages
- [Accueil](${SITE_URL}/)
- [Boostov Grow v2, stand de fidélité](${SITE_URL}/grow)
- [Boostov Pro, carte pour professionnels](${SITE_URL}/pro)
- [Boostov Connect, carte ou stand](${SITE_URL}/connect)
- [Kits revendeurs](${SITE_URL}/revendeurs)
- [FAQ](${SITE_URL}/faq)
- [Guides](${SITE_URL}/blog)
${POSTS.map((p) => `- [${p.h1}](${SITE_URL}/blog/${p.slug})`).join("\n")}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
