import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "https://tunuke.com",
      },
    ],
  },
  env: {
    SHORT_DOMAIN: process.env.SHORT_DOMAIN,
    ORIGINAL_DOMAIN: process.env.ORIGINAL_DOMAIN,
  },
};

export default nextConfig;
