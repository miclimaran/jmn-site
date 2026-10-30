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

  /**
   * Send www to the bare domain.
   *
   * Both hostnames were answering 200, so Google indexed them as two sites and
   * split the ranking signals between them — the search results even showed a
   * different favicon for each. The canonical tags already pointed at the bare
   * domain, but a canonical is a hint; a 308 is binding.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.jmnautoparts.com" }],
        destination: "https://jmnautoparts.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;