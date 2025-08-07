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
    <section className="w-full flex flex-col gap-8 pt-10">
      <div className="w-full flex justify-between">
        <h2 className="text-3xl font-extrabold uppercase text-[#96EAEA]">
          clases recientes
        </h2>
        <Link
          href={"/"}
          className="text-lg font-semibold text-[#FC68B9] uppercase"
        >
          Ver todo
        </Link>
      </div>
      <div className="flex flex-wrap gap-[30px] ">
        {productos.map((producto) => (
          <CardClases key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  );
}
