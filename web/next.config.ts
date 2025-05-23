import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.revnet.app"],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
