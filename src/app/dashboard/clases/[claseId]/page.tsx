"use client";

import { useParams } from "next/navigation";
import ComentarClase from "./components/contenedor1/ComentarClase";
import ComentariosClase from "./components/contenedor1/ComentariosClase";
import FiltrarComentarios from "./components/contenedor1/FiltrarComentarios";
import VideoClase from "./components/contenedor1/VideoClase";
import RecursoDescargable from "./components/contenedor2/RecursoDescargable";
import DescripcionClase from "./components/contenedor2/DescripcionClase";
import ClasesRelacionadas from "./components/contenedor2/ClasesRelacionadas";

export default function ClasesId() {
  const params = useParams();
  const claseId = params?.claseId as string;
  console.log(claseId);

  return (
    <main className="w-full p-4 sm:p-6 md:p-8 lg:p-10 py-6 sm:py-8 md:py-12 lg:py-14 flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
      {/* Contenido principal - orden diferente en móvil */}
      <div className="w-full order-1 lg:order-1">
        <VideoClase />
        
        {/* En móvil: Recurso descargable y Descripción van aquí */}
        <div className="block lg:hidden">
          <RecursoDescargable />
          <DescripcionClase />
          <ClasesRelacionadas />
        </div>
        
        <ComentarClase />
        <FiltrarComentarios />
        <ComentariosClase />
      </div>

      {/* Sidebar - solo visible en escritorio */}
      <div className="w-full lg:min-w-[312px] lg:max-w-[312px] flex flex-col gap-4 sm:gap-6 order-2 lg:order-2">
        <RecursoDescargable />
        <DescripcionClase />
        <ClasesRelacionadas />
      </div>
    </main>
  );
}
