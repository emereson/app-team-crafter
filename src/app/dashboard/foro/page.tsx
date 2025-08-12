"use client";

import FiltrarForo from "./components/FiltrarForo";
import ForosPublicados from "./components/forosPublicados/ForosPublicados";
import NuevaPublicacion from "./components/NuevaPublicacion";
import ReglasForo from "./components/ReglasForo";
import TituloForo from "./components/TituloForo";

export default function Foro() {
  return (
    <main className="w-full p-10 py-8">
      <TituloForo />
      <div className="w-full flex gap-8 mt-16">
        <div className="w-full flex flex-col gap-6">
          <FiltrarForo />
          <NuevaPublicacion />
          <ForosPublicados />
        </div>
        <div className="min-w-[312px] max-w-[312px] flex flex-col gap-6">
          <ReglasForo />{" "}
        </div>
      </div>
    </main>
  );
}
