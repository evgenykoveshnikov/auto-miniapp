import type { NextConfig } from "next";
import { sources } from "next/dist/compiled/webpack/webpack";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/cars",
        destination: "https://testing-api.ru-rating.ru/cars",
      },
      {
      source: "/api/cars/:id",
      destination: "https://testing-api.ru-rating.ru/cars/:id",
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ru-msk-dr3-1.store.cloud.mts.ru'
      }
    ]
  }
};

export default nextConfig;
