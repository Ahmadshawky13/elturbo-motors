import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required to enable LAN access and fix HMR WebSocket on other PCs
  turbopack: {},
  images: {
    // Bike photography is served from the Unsplash CDN (see src/data/bikes.ts).
    // Swap this for your own host once the showroom's real photos are ready.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
