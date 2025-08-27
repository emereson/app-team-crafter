"use client";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import SuscripcionVencida from "./components/SuacripcionVencida";
import useSuscripcionStore, {
  useAutoRefetch,
} from "@/stores/SuscripcionContext";
import useLikedClasesStore from "@/stores/likeClases.store";
import { useEffect } from "react";
import useLikeComentarioClaseStore from "@/stores/likeComentarioClase.store";
import useFavoritosStore from "@/stores/favoritos.store";
import Loading from "../components/Loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Usar isInitialLoading en lugar de isLoading para la primera carga
  const { suscripcion, isLoading, isInitialLoading } = useSuscripcionStore();

  useAutoRefetch();
  const fetchFavoritos = useFavoritosStore((s) => s.fetchFavoritos);
  const fetchLikes = useLikedClasesStore((s) => s.fetchLikes);
  const fetchLikesComentarioClases = useLikeComentarioClaseStore(
    (s) => s.fetchLikes
  );

  useEffect(() => {
    fetchFavoritos();
    fetchLikes();
    fetchLikesComentarioClases();
  }, [fetchLikes, fetchLikesComentarioClases, fetchFavoritos]);

  // Mostrar loading durante la carga inicial O durante refetches
  if (isInitialLoading || isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      {!suscripcion && <SuscripcionVencida />}
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
