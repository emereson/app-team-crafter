"use client";

import { useParams } from "next/navigation";
import ComentarClase from "./components/contenedor1/ComentarClase";
import ComentariosClase from "./components/contenedor1/ComentariosClase";
import FiltrarComentarios from "./components/contenedor1/FiltrarComentarios";
import VideoClase from "./components/contenedor1/VideoClase";
import RecursoDescargable from "./components/contenedor2/RecursoDescargable";
import DescripcionClase from "./components/contenedor2/DescripcionClase";
import ClasesRelacionadas from "./components/contenedor2/ClasesRelacionadas";
import { useCallback, useEffect, useState } from "react";
import { Clase } from "@/interfaces/clase.interface";
import { getClasesId } from "@/services/clases.service";
import { handleAxiosError } from "@/utils/errorHandler";
import Loading from "@/app/components/Loading";
import { getComentarios } from "@/services/comentarios.service";
import { Comentario } from "@/interfaces/comentario.interface";

export default function ClasesId() {
  const params = useParams();
  const claseId = params?.claseId as string;
  const [clase, setClase] = useState<Clase>();
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);

  const gfindClase = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getClasesId(claseId);
      setClase(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, [claseId]);

  const findComentarios = useCallback(async () => {
    try {
      const res = await getComentarios(claseId);
      setComentarios(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, [claseId]);

  useEffect(() => {
    gfindClase();
    findComentarios();
  }, [gfindClase, findComentarios, claseId]);
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {clase && (
        <main className="w-full max-w-7xl  mx-auto p-10 py-14 flex gap-8">
          <div className="w-full">
            <VideoClase clase={clase} />
            <ComentarClase
              claseId={clase.id}
              findComentarios={findComentarios}
            />
            <FiltrarComentarios />
            <ComentariosClase claseId={clase.id} comentarios={comentarios} />
          </div>

          <div className="min-w-[312px] max-w-[312px] flex flex-col gap-6">
            <RecursoDescargable />
            <DescripcionClase clase={clase} />
            <ClasesRelacionadas />
          </div>
        </main>
      )}
    </>
  );
}
