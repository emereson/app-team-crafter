import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ["localhost"], // 👈 agrega aquí el dominio permitido
  },
};

export default nextConfig;
