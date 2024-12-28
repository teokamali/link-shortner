import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    SHORT_DOMAIN: process.env.SHORT_DOMAIN,
    ORIGINAL_DOMAIN: process.env.ORIGINAL_DOMAIN,
  },
};

export default nextConfig;
