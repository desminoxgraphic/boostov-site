import type { Metadata } from "next";

/** Per-page metadata: title, description, canonical, hreflang, Open Graph and Twitter card with the page's OG image. */
export function pageMeta({ title, description, path, og, type = "website" }: { title: string; description: string; path: string; og: string; type?: "website" | "article" }): Metadata {
  const images = [{ url: `/og/${og}.jpg`, width: 1200, height: 630, alt: title }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path, languages: { "fr-MA": path, "x-default": path } },
    openGraph: { title, description, url: path, siteName: "boostov.ma", locale: "fr_MA", type, images },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}
