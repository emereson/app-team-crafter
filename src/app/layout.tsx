import { Toaster } from "sonner";
import "@/app/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Providers } from "./providers";

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
      </body>
    </html>
  );
}
