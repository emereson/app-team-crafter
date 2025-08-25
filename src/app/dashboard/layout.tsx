"use client";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import SuscripcionVencida from "./components/SuacripcionVencida";
import { useAutoRefetch } from "@/stores/SuscripcionContext";
import { useLikeClasesInitializer } from "@/stores/likeClases.store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAutoRefetch();
  useLikeClasesInitializer();
  return (
    <div className="w-screen h-screen flex flex-col">
      <SuscripcionVencida />
      <Header />
      <div className="h-full w-full flex overflow-hidden">
        <Menu />
        <div className="flex flex-col w-full h-full overflow-y-auto">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}
