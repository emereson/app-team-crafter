"use client";
import { useCallback, useEffect, useState } from "react";
import FiltrarClases from "./components/FiltrarClases";
import ListaClases from "./components/ListaClases";
import { Clase } from "@/interfaces/clase.interface";
import { handleAxiosError } from "@/utils/errorHandler";
import { getFavoritosView } from "@/services/favorito.service";
import TituloFiltroFavoritos from "./components/TituloFiltroFavoritos";

export default function Favoritos() {
  const [openFilter, setOpenFilter] = useState(false);
  const [clases, setClases] = useState<Clase[]>([]);
  const [categoria, setCategoria] = useState("Todos");
  const [tutorial, setTutorial] = useState("Todos");
  const [order, setOrder] = useState<"asc" | "desc">("desc"); // 👈 nuevo estado

  const gfindClases = useCallback(async () => {
    try {
      const res = await getFavoritosView({
        categoria_clase: categoria,
        tutoriales_tips: tutorial,
        order,
      });
      setClases(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, [categoria, tutorial, order]); // 👈 dependencias

  useEffect(() => {
    gfindClases();
  }, [order]);

  return (
    <main className="w-full  max-w-7xl  mx-auto  px-10 py-8">
      <TituloFiltroFavoritos
        setOpenFilter={setOpenFilter}
        order={order}
        setOrder={setOrder}
      />
      <ListaClases clases={clases} />
      <FiltrarClases
        setOpenFilter={setOpenFilter}
        openFilter={openFilter}
        setCategoria={setCategoria}
        setTutorial={setTutorial}
        categoria={categoria}
        tutorial={tutorial}
        gfindClases={gfindClases}
      />
    </main>
  );
}
