import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.revnet.app", "gateway.pinata.cloud"],
  },
  turbopack: {
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
