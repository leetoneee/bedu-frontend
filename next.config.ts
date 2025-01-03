import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['files.edgestore.dev'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
