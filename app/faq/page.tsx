import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Plus } from "lucide-react";
import { faqPage as t } from "@/content/pages.fr";
import { POSTS } from "@/content/blog.fr";
import { pageMeta } from "@/lib/meta";
import { breadcrumb, faq } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Breadcrumbs, PageHero } from "@/components/site/ui";
import { FinalCta } from "@/components/site/sections";
import { fr } from "@/content/fr";

export const metadata: Metadata = pageMeta({ title: t.title, description: t.description, path: "/faq", og: "faq" });

export default function FaqPage() {
  return <>
    <JsonLd data={[breadcrumb([["FAQ", "/faq"]]), faq(t.groups.flatMap((g) => g.items))]} />
    <Breadcrumbs items={[["FAQ", "/faq"]]} />
    <PageHero eyebrow={t.eyebrow} title={t.h1} lead={t.lead} msg="info" />
    <section className="section section--flush-top"><div className="container faq-page">
      <nav className="faq-toc" aria-label="Thèmes">{t.groups.map((g) => <a key={g.id} href={`#${g.id}`}>{g.title}</a>)}</nav>
      <div className="faq-groups">
        {t.groups.map((g) => <section key={g.id} id={g.id} className="faq faq-group" aria-labelledby={`${g.id}-title`}>
          <h2 id={`${g.id}-title`} className="h3">{g.title}</h2>
          {g.items.map(([q, a]) => <details key={q}><summary>{q}<Plus size={22} aria-hidden="true" /></summary><p>{a}</p></details>)}
        </section>)}
        <section className="faq-group" aria-labelledby="guides-title">
          <h2 id="guides-title" className="h3">{t.guides}</h2>
          <ul className="guide-links">{POSTS.map((p) => <li key={p.slug}><Link className="link" href={`/blog/${p.slug}`}>{p.h1}<ArrowRight size={16} aria-hidden="true" /></Link></li>)}</ul>
        </section>
      </div>
    </div></section>
    <FinalCta title={fr.home.final.title} text={fr.home.final.text} />
  </>;
}
