import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "ibb.co",
      },
      {
        protocol: "https",
        hostname: "ibb.co.com",
      },
    ],
  },
  
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Compiler optimizations
  compiler: {
    removeConsole: isProd ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
