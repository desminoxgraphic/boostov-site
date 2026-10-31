import Link from "next/link";
import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { faqPage as t } from "@/content/pages.fr";
import { POSTS } from "@/content/blog.fr";
import { pageMeta } from "@/lib/meta";
import { breadcrumb, faq } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Breadcrumbs, Card, PageHead, Section, WaButton } from "@/components/site/ui";

export const metadata: Metadata = pageMeta({ title: t.title, description: t.description, path: "/faq", og: "faq" });

export default function FaqPage() {
  return <>
    <JsonLd data={[breadcrumb([["FAQ", "/faq"]]), faq(t.groups.flatMap((g) => g.items))]} />
    <PageHead eyebrow={t.eyebrow} title={t.h1} intro={t.lead} />
    <Breadcrumbs items={[["FAQ", "/faq"]]} />
    <Section>
      <div className="faq-layout">
        <aside className="faq-aside">
          <nav className="faq-toc" aria-label="Thèmes">{t.groups.map((g) => <a key={g.id} href={`#${g.id}`}>{g.title}</a>)}</nav>
          <Card raised>
            <h2 className="h3">Une autre question&nbsp;?</h2>
            <p className="small">Écrivez-nous, on vous répond sur WhatsApp.</p>
            <WaButton msg="info" block>Écrire sur WhatsApp</WaButton>
          </Card>
        </aside>
        <div>
          {t.groups.map((g) => <section key={g.id} id={g.id} className="faq-group">
            <h2>{g.title}</h2>
            {g.items.map(([q, a]) => <details key={q} className="qa"><summary>{q}<Plus aria-hidden="true" /></summary><p>{a}</p></details>)}
          </section>)}
          <div className="faq-guides">
            <h2>Guides</h2>
            <ul>{POSTS.map((p) => <li key={p.slug}><Link href={`/blog/${p.slug}`}>{p.h1}</Link></li>)}</ul>
          </div>
        </div>
      </div>
    </Section>
  </>;
}
