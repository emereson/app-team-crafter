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
    <main className="w-full p-10 py-14 flex gap-8">
      <div className="w-full">
        <VideoClase />
        <ComentarClase />
        <FiltrarComentarios />
        <ComentariosClase />
      </div>

      <div className="min-w-[312px] max-w-[312px] flex flex-col gap-6">
        <RecursoDescargable />
        <DescripcionClase />
        <ClasesRelacionadas />
      </div>
    </main>
  );
}
