// /llms.txt: a plain-text summary for AI answer engines, built from the same sources as the site.
import { PRICING } from "@/src/config/pricing";
import { INSTAGRAM_URL, PHONE_E164 } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";
import { POSTS } from "@/content/blog.fr";

export const dynamic = "force-static";

export function GET() {
  const { connect, grow, delivery, kits } = PRICING;
  const body = `# Boostov

> Boostov (boostov.ma) vend des cartes et des stands NFC personnalisés, avec QR code de secours, pour les commerces au Maroc. Basé à Agadir. Commande uniquement sur WhatsApp.

## Produits et prix (MAD)
- Boostov Connect : carte de visite digitale. Un tap NFC ou un scan du QR code ouvre la page du commerce (appel, WhatsApp, Instagram, itinéraire, enregistrer le contact). Carte ${connect.carte} DH, stand ${connect.stand} DH.
- Boostov Grow : après l'achat, le client tape et suit un parcours avis Google (optionnel), partage et récompense pour sa prochaine visite. La récompense n'est jamais liée à la publication d'un avis. Carte ${grow.carte} DH, stand ${grow.stand} DH.
- Personnalisation incluse : logo, nom, couleurs, QR code, texte.
- Livraison partout au Maroc : +${delivery} DH par commande.
- Sans application : la page s'ouvre dans le navigateur du téléphone.

## Revendeurs (18 ans et plus)
- Kit 5 : ${kits.kit5.cartes} cartes NFC Boostov, accès au système, formation. ${kits.kit5.price} DH.
- Kit 10 : ${kits.kit10.cartes} cartes NFC Boostov, accès au système, formation. ${kits.kit10.price} DH.
- Aucun revenu n'est promis.

## Contact
- WhatsApp : ${PHONE_E164}
- Instagram : ${INSTAGRAM_URL}

## Pages
- [Accueil](${SITE_URL}/)
- [Produits et comparatif Connect / Grow](${SITE_URL}/produits)
- [Stands personnalisés](${SITE_URL}/stands)
- [Revendeurs](${SITE_URL}/revendeurs)
- [FAQ](${SITE_URL}/faq)
${POSTS.map((p) => `- [${p.h1}](${SITE_URL}/blog/${p.slug})`).join("\n")}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
