import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ["https://team-crafter-backend-production.up.railway.app/"], // 👈 agrega aquí el dominio permitido
  },
};

export default nextConfig;
