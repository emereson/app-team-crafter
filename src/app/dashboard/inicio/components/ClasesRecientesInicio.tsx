// src\app\dashboard\inicio\components\ClasesRecientesInicio.tsx
"use client";

import Link from "next/link";
import CardClases from "../../components/CardClases";

export default function ClasesRecientesInicio() {
  const productos = [
    {
      id: 1,
      titulo: "Hemos preparado estos 3 archivos gratis para halloween",
      fecha_inicio: "2025-07-25 16:16:25",
      fecha_final: "2025-07-26 16:16:25",
    },
    {
      id: 2,
      titulo: "Hemos preparado estos 3 archivos gratis para halloween",
      fecha_inicio: "2025-07-25 16:16:25",
      fecha_final: "2025-07-26 16:16:25",
    },
  ];
  return (
    <section className="w-full flex flex-col gap-6 sm:gap-8 pt-8 sm:pt-10">
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#96EAEA] leading-tight">
          clases recientes
        </h2>
        <Link
          href={"/"}
          className="text-base sm:text-lg font-semibold text-[#FC68B9] uppercase"
        >
          Ver todo
        </Link>
      </div>
      <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 justify-center sm:justify-start">
        {productos.map((producto) => (
          <CardClases key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  );
}
