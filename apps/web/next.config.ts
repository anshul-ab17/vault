import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@vault/shared", "@vault/solana"],
};

export default nextConfig;
