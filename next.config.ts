import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images are pre-compressed in /public; the runtime optimizer isn't available on this Nitro build.
  images: { unoptimized: true },
};

export default nextConfig;
