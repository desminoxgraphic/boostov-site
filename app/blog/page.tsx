import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { POSTS } from "@/content/blog.fr";
import { blogPage as t } from "@/content/pages.fr";
import { pageMeta } from "@/lib/meta";
import { breadcrumb } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Breadcrumbs, PageHero } from "@/components/site/ui";

export const metadata: Metadata = pageMeta({ title: t.title, description: t.description, path: "/blog", og: "blog" });

export default function Blog() {
  return <>
    <JsonLd data={breadcrumb([[t.eyebrow, "/blog"]])} />
    <Breadcrumbs items={[[t.eyebrow, "/blog"]]} />
    <PageHero eyebrow={t.eyebrow} title={t.h1} lead={t.lead} />
    <section className="section section--flush-top"><div className="container">
      <ul className="posts">{POSTS.map((p) => <li key={p.slug}><Link className="post-card" href={`/blog/${p.slug}`}><span className="eyebrow">Guide</span><h2 className="h3">{p.h1}</h2><p>{p.answer}</p><span className="link">{t.read}<ArrowRight size={16} aria-hidden="true" /></span></Link></li>)}</ul>
    </div></section>
  </>;
}
