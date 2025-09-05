"use client";
import { Toaster } from "sonner";
import "@/app/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Providers } from "./providers";
import Script from "next/script"; // 👈 Importamos Script de Next.js

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="ligth h-full">
      <body>
        <Providers>{children}</Providers>
        <Toaster richColors />
        <Script
          src="https://sandbox.flow.cl/app/elements/flow-1.1.0.min.js?20241202"
          strategy="beforeInteractive" // 👈 se carga antes que React
        />
      </body>
    </html>
  );
}
