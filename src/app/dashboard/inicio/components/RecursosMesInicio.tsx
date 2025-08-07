"use client";

import Link from "next/link";
import CardRecursos from "../../components/CardRecursos";

export default function RecursosMesInicio() {
  const recursos = [
    {
      id: 1,
      titulo: "Hemos preparado estos 3 archivos gratis para halloween",
      fecha_inicio: "2025-07-25 16:16:25",
      fecha_final: "2025-07-26 16:16:25",
      premium: true,
    },
    {
      id: 2,
      titulo: "Hemos preparado estos 3 archivos gratis para halloween",
      fecha_inicio: "2025-07-25 16:16:25",
      fecha_final: "2025-07-26 16:16:25",
      premium: false,
    },
    {
      id: 3,
      titulo: "Hemos preparado estos 3 archivos gratis para halloween",
      fecha_inicio: "2025-07-25 16:16:25",
      fecha_final: "2025-07-26 16:16:25",
      premium: false,
    },
  ];
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
      <div className="flex flex-wrap gap-[15px] justify-between ">
        {recursos.map((recurso) => (
          <CardRecursos key={recurso.id} recurso={recurso} />
        ))}
      </div>
    </section>
  );
}
