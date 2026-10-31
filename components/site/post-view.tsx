import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Lightbulb } from "lucide-react";
import { POSTS } from "@/content/blog.fr";
import { pageMeta } from "@/lib/meta";
import { article, breadcrumb } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Breadcrumbs, Button, Section, WaButton } from "@/components/site/ui";

export function postMeta(slug: string): Metadata {
  const post = POSTS.find((p) => p.slug === slug)!;
  return pageMeta({ title: post.title, description: post.description, path: `/blog/${post.slug}`, og: post.og, type: "article" });
}

// Turns bare https:// URLs in guide text into links (external sources, opened in a new tab).
function linkify(text: string) {
  return text.split(/(https:\/\/[^\s)]+)/g).map((part, i) => part.startsWith("https://") ? <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part.replace(/^https:\/\//, "")}</a> : part);
}

const date = (iso: string) => new Date(iso).toLocaleDateString("fr-MA", { day: "numeric", month: "long", year: "numeric" });

export function PostView({ slug }: { slug: string }) {
  const post = POSTS.find((p) => p.slug === slug)!;
  const others = POSTS.filter((p) => p.slug !== post.slug);
  return <>
    <JsonLd data={[breadcrumb([["Guides", "/blog"], [post.h1, `/blog/${post.slug}`]]), article({ title: post.h1, description: post.description, slug: post.slug, published: post.published, image: post.image })]} />
    <header className="page-head">
      <div className="container">
        <span className="eyebrow rise">Guide</span>
        <h1 className="display post-title rise rise-2">{post.h1}</h1>
        <p className="post-meta rise rise-3">Par Boostov · <time dateTime={post.published}>{date(post.published)}</time></p>
      </div>
    </header>
    <Breadcrumbs items={[["Guides", "/blog"], [post.h1, `/blog/${post.slug}`]]} />
    <Section>
      <article className="prose">
        <p className="answer">{post.answer}</p>
        {post.body.map((b, i) => <div key={i} className="prose-block">
          {b.h2 && <h2>{b.h2}</h2>}
          {b.p?.map((t) => <p key={t}>{linkify(t)}</p>)}
          {b.ul && <ul>{b.ul.map((t) => <li key={t}>{t}</li>)}</ul>}
          {b.ol && <ol>{b.ol.map((t) => <li key={t}>{linkify(t)}</li>)}</ol>}
          {b.tip && <p className="tip"><Lightbulb size={18} aria-hidden="true" />{b.tip}</p>}
        </div>)}
        <div className="post-cta">
          <Button href={post.related.href} variant="primary">{post.related.label}<ArrowRight size={16} aria-hidden="true" /></Button>
          <WaButton msg="info" variant="ghost">Une question ? WhatsApp</WaButton>
        </div>
      </article>
    </Section>
    <Section tone="tint">
      <h2 className="h3">À lire aussi</h2>
      <ul className="grid-2 mt-5">{others.map((p) => <li key={p.slug}><Link className="post-card" href={`/blog/${p.slug}`}><b>{p.h1}</b><span className="link-arrow">Lire<ArrowRight size={16} aria-hidden="true" /></span></Link></li>)}</ul>
    </Section>
  </>;
}
