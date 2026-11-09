import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Lightbulb } from "lucide-react";
import { POSTS } from "@/content/blog.fr";
import { pageMeta } from "@/lib/meta";
import { article, breadcrumb } from "@/lib/schema";
import { JsonLd } from "@/components/site/json-ld";
import { Cta } from "@/components/site/cta";
import { Breadcrumbs } from "@/components/site/ui";

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
    <header className="page-hero page-hero--post">
      <Breadcrumbs items={[["Guides", "/blog"], [post.h1, `/blog/${post.slug}`]]} />
      <div className="container prose-wrap" style={{ marginTop: "var(--s-5)" }}>
        <span className="eyebrow rise">Guide</span>
        <h1 className="rise rise-2">{post.h1}</h1>
        <p className="small rise rise-3 mt-4">Par Boostov · <time dateTime={post.published}>{date(post.published)}</time></p>
      </div>
    </header>
    <section className="sec sec--light"><div className="container prose-wrap">
      <article className="prose">
        <p className="answer">{post.answer}</p>
        {post.body.map((b, i) => <div key={i}>
          {b.h2 && <h2>{b.h2}</h2>}
          {b.p?.map((t) => <p key={t}>{linkify(t)}</p>)}
          {b.ul && <ul>{b.ul.map((t) => <li key={t}>{t}</li>)}</ul>}
          {b.ol && <ol>{b.ol.map((t) => <li key={t}>{linkify(t)}</li>)}</ol>}
          {b.tip && <p className="tip"><Lightbulb size={18} aria-hidden="true" />{b.tip}</p>}
        </div>)}
      </article>
      <div className="post-cta">
        <Link className="link" href={post.related.href}>{post.related.label}<ArrowRight size={16} aria-hidden="true" /></Link>
        <Cta msg={post.related.msg} />
      </div>
    </div></section>
    <section className="sec sec--white" aria-labelledby="more-title"><div className="container prose-wrap">
      <h2 id="more-title" className="h3">À lire aussi</h2>
      <ul className="posts posts--2 mt-5">{others.map((p) => <li key={p.slug}><Link className="post-card" href={`/blog/${p.slug}`}><span className="h3 post-card-title">{p.h1}</span><span className="link">Lire<ArrowRight size={16} aria-hidden="true" /></span></Link></li>)}</ul>
    </div></section>
    {/* Structured data last, so text tools read the page content first. */}
    <JsonLd data={[breadcrumb([["Guides", "/blog"], [post.h1, `/blog/${post.slug}`]]), article({ title: post.h1, description: post.description, slug: post.slug, published: post.published, image: `/og/${post.og}.jpg` })]} />
  </>;
}
