// /llms.txt: a plain-text summary for AI answer engines, built from the same sources as the site.
import { BETA_ACTIVE, BETA_PRICE, BETA_SLOTS, PRICING, PRO_DEMO_URL } from "@/src/config/pricing";
import { INSTAGRAM_URL, PHONE_E164 } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";
import { POSTS } from "@/content/blog.fr";

export const dynamic = "force-static";

export function GET() {
  const { grow, pro, connect, kits } = PRICING;
  const body = `# Boostov

> Boostov (boostov.ma), basé à Agadir au Maroc : « la tech qui fait grandir votre business ». Fidélité client et cartes NFC + QR code pour les commerces et les professionnels. Commande uniquement sur WhatsApp. Paiement unique.

## Produits et prix (MAD)
- Boostov Grow v2 : stand de fidélité pour commerces. Le client touche le stand (NFC) ou scanne le QR code, valide sa visite et gagne un point. Le commerçant choisit la récompense ; le compteur repart à zéro ensuite. Rappel WhatsApp, export des contacts, avis Google optionnel (jamais lié à la récompense). Stand ${grow.stand} DH, paiement unique, installation incluse (offre normale).${BETA_ACTIVE ? ` Beta séparée : Boostov cherche ${BETA_SLOTS} commerces testeurs, à un prix spécial ${BETA_PRICE ? `de ${BETA_PRICE} DH` : "communiqué sur demande WhatsApp"}, en échange de leurs retours et de leur accord pour montrer leurs résultats.` : ""}
- Boostov Pro : carte NFC et QR code pour freelances et professionnels, avec une page pro (photo, services, galerie de réalisations, liens, assistant de questions, demandes de devis, statistiques). Exemple : Desminox, designer graphique et motion à Agadir. Carte ${pro.carte} DH.${PRO_DEMO_URL ? ` Démo : ${PRO_DEMO_URL}` : ""}
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
