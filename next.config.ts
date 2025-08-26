import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "end-point.team-crafter.com",
        port: "",
        pathname: "/uploads/**", // Ajusta según tu ruta
      },
    ],
  },
};

export default nextConfig;
