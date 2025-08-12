"use client";
import { useState } from "react";
import ListaRecursos from "./components/ListaRecursos";
import FiltrarRecursos from "./components/FiltrarRecursos";
import TituloFiltroRecursos from "./components/TituloFiltroRecursos";

export default function Recursos() {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <main className="w-full p-10 py-8">
      <TituloFiltroRecursos setOpenFilter={setOpenFilter} />
      <ListaRecursos />
      <FiltrarRecursos setOpenFilter={setOpenFilter} openFilter={openFilter} />
    </main>
  );
}
