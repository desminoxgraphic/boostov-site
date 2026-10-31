import type { MetadataRoute } from "next";
import { POSTS } from "@/content/blog.fr";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [["/", 1], ["/produits", 0.9], ["/stands", 0.9], ["/revendeurs", 0.8], ["/faq", 0.7], ["/blog", 0.6]];
  return [
    ...pages.map(([path, priority]) => ({ url: `${SITE_URL}${path}`, changeFrequency: "monthly" as const, priority, alternates: { languages: { "fr-MA": `${SITE_URL}${path}` } } })),
    ...POSTS.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.published, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
