"use client";

import Link from "next/link";
import CardRecursos from "../../components/CardRecursos";
import { useCallback, useEffect, useState } from "react";
import { Recurso } from "@/interfaces/recurso.interface";
import { getRecursos } from "@/services/recursos.service";
import { handleAxiosError } from "@/utils/errorHandler";
import Loading from "@/app/components/Loading";

export default function RecursosMesInicio() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);

  const gfindRecursos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getRecursos({ cuatro_ultimos: "true" });
      setRecursos(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    gfindRecursos();
  }, [gfindRecursos]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="w-full flex flex-col gap-8 pt-16">
      <div className="w-full flex justify-between">
        <h2 className="text-3xl font-extrabold uppercase text-[#96EAEA]">
          Recursos del mes
        </h2>
        <Link
          href={"/"}
          className="text-lg font-semibold text-[#FC68B9] uppercase"
        >
          Ver todo
        </Link>
      </div>
      <div className="flex flex-wrap gap-[30px] ">
        {recursos.map((recurso) => (
          <CardRecursos key={recurso.id} recurso={recurso} />
        ))}
      </div>
    </section>
  );
}
