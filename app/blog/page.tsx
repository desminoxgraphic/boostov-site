import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { POSTS } from "@/content/blog.fr";
import { pageMeta } from "@/lib/meta";
import { breadcrumb } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Breadcrumbs, PageHead, Section } from "@/components/site/ui";

export const metadata: Metadata = pageMeta({
  title: "Guides avis Google, NFC et QR code pour commerces | Boostov",
  description: "Guides pratiques pour les commerces au Maroc : demander des avis Google dans les règles, choisir entre NFC et QR code, créer son lien d’avis Google.",
  path: "/blog",
  og: "blog",
});

export default function Blog() {
  return <>
    <JsonLd data={breadcrumb([["Guides", "/blog"]])} />
    <PageHead eyebrow="Guides" title="Guides pour les commerces." intro="Des guides courts et pratiques sur les avis Google, le NFC et le QR code." />
    <Breadcrumbs items={[["Guides", "/blog"]]} />
    <Section>
      <ul className="grid-3">{POSTS.map((p) => <li key={p.slug}><Link className="post-card" href={`/blog/${p.slug}`}><span className="eyebrow">Guide</span><b>{p.h1}</b><span className="small">{p.answer}</span><span className="link-arrow">Lire le guide<ArrowRight size={16} aria-hidden="true" /></span></Link></li>)}</ul>
    </Section>
  </>;
}
