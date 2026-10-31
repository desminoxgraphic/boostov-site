import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Product photos are pre-built as responsive AVIF/WebP (scripts/build-images.py); no runtime optimizer on this Nitro build.
  images: { unoptimized: true },
};

export default nextConfig;
