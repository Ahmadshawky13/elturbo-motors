import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required to enable LAN access and fix HMR WebSocket on other PCs
  turbopack: {},
};

export default nextConfig;
