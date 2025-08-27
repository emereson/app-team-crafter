"use client";
import { useCallback, useEffect, useState } from "react";
import FiltrarClases from "./components/FiltrarClases";
import ListaClases from "./components/ListaClases";
import TituloFiltroClases from "./components/TituloFiltroClases";
import { Clase } from "@/interfaces/clase.interface";
import { getClases } from "@/services/clases.service";
import { handleAxiosError } from "@/utils/errorHandler";

export default function Clases() {
  const [openFilter, setOpenFilter] = useState(false);
  const [clases, setClases] = useState<Clase[]>([]);
  const [categoria, setCategoria] = useState("Todos");
  const [tutorial, setTutorial] = useState("Todos");
  const [order, setOrder] = useState<"asc" | "desc">("desc"); // 👈 nuevo estado

  const gfindClases = useCallback(async () => {
    try {
      const res = await getClases({
        categoria_clase: categoria,
        tutoriales_tips: tutorial,
        order, // 👈 pasa orden al backend
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
    <main className="w-full p-10 py-8">
      <TituloFiltroClases
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
