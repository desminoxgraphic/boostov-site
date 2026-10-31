import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/produits", "/revendeurs", "/faq"].map((path) => ({ url: `${SITE_URL}${path}`, changeFrequency: "monthly", priority: path ? 0.8 : 1 }));
}
