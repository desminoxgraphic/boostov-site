import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, Info } from "lucide-react";
import { produits as t } from "@/content/pages.fr";
import { POSTS } from "@/content/blog.fr";
import { pageMeta } from "@/lib/meta";
import { breadcrumb, product } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Photo } from "@/components/site/photo";
import { Breadcrumbs, PageHero, Section, SectionHead, WaButton } from "@/components/site/ui";

export const metadata: Metadata = pageMeta({ title: t.title, description: t.description, path: "/produits", og: "produits" });

export default function Produits() {
  return <>
    <JsonLd data={[
      breadcrumb([["Produits", "/produits"]]),
      ...t.products.map((p) => product(p.name, p.does, `/products/${p.stand.image}-1080.webp`, [{ name: `${p.name} carte`, price: p.card.price }, { name: `${p.name} stand`, price: p.stand.price }])),
    ]} />
    <PageHero eyebrow={t.eyebrow} title={t.h1} intro={t.lead}>
      <div className="hero-jump rise rise-4">{t.products.map((p) => <a key={p.id} href={`#${p.id}`} className={`jump jump--${p.accent}`}>{p.name}<ArrowRight size={16} aria-hidden="true" /></a>)}</div>
    </PageHero>
    <Breadcrumbs items={[["Produits", "/produits"]]} />

    {t.products.map((p, i) => <Section key={p.id} id={p.id} tone={i % 2 ? "tint" : "white"}>
      <article className={`prod6 prod6--${p.accent}`} aria-labelledby={`${p.id}-t`}>
        <div className="prod6-head">
          <span className="eyebrow">{p.name}</span>
          <h2 id={`${p.id}-t`} className="h2">{p.oneLine}</h2>
          <p className="lead">{p.does}</p>
          <p className="prod6-for"><Check size={18} aria-hidden="true" />{p.forWho}</p>
        </div>
        <div className="prod6-formats">
          {([["Carte", p.card], ["Stand", p.stand]] as const).map(([fmt, f]) => <div key={fmt} className="format reveal">
            <figure className={`format-media${fmt === "Carte" ? " format-media--cutout" : ""}`}>
              <Photo name={f.image as "connect-card"} alt={f.alt} sizes="(min-width: 960px) 360px, 92vw" />
              <figcaption className="tag">{f.label}</figcaption>
            </figure>
            <div className="format-body">
              <p className="format-name">{p.name.replace("Boostov ", "")} · {fmt}</p>
              <p className="format-price">{f.price}<em>DH</em></p>
              <WaButton msg={f.msg as "connectCarte"} block variant={fmt === "Carte" ? "ghost" : "wa"}>Commander {fmt === "Carte" ? "la carte" : "le stand"}</WaButton>
            </div>
          </div>)}
        </div>
      </article>
    </Section>)}

    <Section id="comparatif">
      <SectionHead eyebrow="Comparatif" title="Connect et Grow, côte à côte." intro="Connect fait venir les contacts, Grow fait venir les avis et les retours. Vous pouvez aussi prendre les deux." />
      <div className="table-wrap reveal">
        <table className="ctable">
          <caption className="sr-only">{t.table.caption}</caption>
          <thead><tr>{t.table.cols.map((c, i) => <th key={i} scope="col">{c}</th>)}</tr></thead>
          <tbody>{t.table.rows.map(([label, a, b]) => <tr key={label}><th scope="row">{label}</th><td>{a}</td><td>{b}</td></tr>)}</tbody>
        </table>
      </div>
      <ul className="notes">{t.notes.map((n) => <li key={n} className="note-item"><Info size={18} aria-hidden="true" />{n}</li>)}</ul>
      <div className="section-cta center"><WaButton msg="info" size="lg">Une question ? Écrivez-nous</WaButton></div>
    </Section>

    <Section tone="tint">
      <SectionHead eyebrow={t.related} title="Guides pour bien choisir." />
      <ul className="grid-3">{POSTS.map((post) => <li key={post.slug}><Link className="post-card" href={`/blog/${post.slug}`}><span className="eyebrow">Guide</span><b>{post.h1}</b><span className="small">{post.description}</span><span className="link-arrow">Lire<ArrowRight size={16} aria-hidden="true" /></span></Link></li>)}</ul>
    </Section>
  </>;
}
