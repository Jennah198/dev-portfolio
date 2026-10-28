import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: the hero portrait is the LCP element on mobile.
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
};

export default nextConfig;
