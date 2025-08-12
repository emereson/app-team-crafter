"use client";
import { useState } from "react";
import FiltrarClases from "./components/FiltrarClases";
import ListaClases from "./components/ListaClases";
import TituloFiltroClases from "./components/TituloFiltroClases";

export default function Clases() {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <main className="w-full p-10 py-8">
      <TituloFiltroClases setOpenFilter={setOpenFilter} />
      <ListaClases />
      <FiltrarClases setOpenFilter={setOpenFilter} openFilter={openFilter} />
    </main>
  );
}
