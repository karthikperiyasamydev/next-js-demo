import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MAGENTO_GRAPHQL_ENDPOINT: process.env.MAGENTO_GRAPHQL_URL,
  },
  reactStrictMode: true,
};

export default nextConfig;
