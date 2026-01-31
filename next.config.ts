import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
  // Ganti 'website-kelas' dengan nama repository GitHub kamu
  basePath: process.env.NODE_ENV === "production" ? "/website-kelas" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/website-kelas" : "",
};

export default nextConfig;
