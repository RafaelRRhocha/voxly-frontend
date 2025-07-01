import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['user-images.githubusercontent.com', 'cdn.discordapp.com'],
  },
};

export default nextConfig;
