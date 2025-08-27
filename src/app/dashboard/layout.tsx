"use client";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import SuscripcionVencida from "./components/SuacripcionVencida";
import { useAutoRefetch } from "@/stores/SuscripcionContext";
import useLikedClasesStore from "@/stores/likeClases.store";
import { useEffect } from "react";
import useLikeComentarioClaseStore from "@/stores/likeComentarioClase.store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAutoRefetch();
  const fetchLikes = useLikedClasesStore((s) => s.fetchLikes);
  const fetchLikesComentarioClases = useLikeComentarioClaseStore(
    (s) => s.fetchLikes
  );

  useEffect(() => {
    fetchLikes();
    fetchLikesComentarioClases();
  }, [fetchLikes, fetchLikesComentarioClases]);

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
