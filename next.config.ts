import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Product photos are pre-built as responsive AVIF/WebP (scripts/build-images.py); no runtime optimizer on this Nitro build.
  images: { unoptimized: true },
  // v6 routes → v7 product pages (keep old links and Google results working).
  async redirects() {
    return [
      { source: "/produits", destination: "/#produits", permanent: true },
      { source: "/stands", destination: "/grow", permanent: true },
    ];
  },
};

export default nextConfig;
