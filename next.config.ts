import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.19"],
  images: {
    // Only used as a graceful fallback when a local warehouse/export photo
    // is missing; the primary images are served locally from /public.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;