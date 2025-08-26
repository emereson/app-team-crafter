import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ["https://end-point.team-crafter.com"], // 👈 agrega aquí el dominio permitido
  },
};

export default nextConfig;
