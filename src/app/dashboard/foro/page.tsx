"use client";

import FiltrarForo from "./components/FiltrarForo";
import ForosPublicados from "./components/forosPublicados/ForosPublicados";
import NuevaPublicacion from "./components/NuevaPublicacion";
import ReglasForo from "./components/ReglasForo";
import TituloForo from "./components/TituloForo";

export default function Foro() {
  return (
    <main className="w-full p-4 sm:p-6 md:p-8 lg:p-10 py-6 sm:py-8">
      <TituloForo />
      <div className="w-full flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 lg:mt-16">
        <div className="w-full flex flex-col gap-4 sm:gap-6">
          <FiltrarForo />
          <NuevaPublicacion />
          <ForosPublicados />
        </div>
        <div className="w-full lg:min-w-[312px] lg:max-w-[312px] flex flex-col gap-4 sm:gap-6">
          <ReglasForo />
        </div>
      </div>
    </main>
  );
}
