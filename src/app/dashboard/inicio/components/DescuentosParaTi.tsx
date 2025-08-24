// src\app\dashboard\inicio\components\DescuentosParaTi.tsx
"use client";
import Link from "next/link";
import CardDescuento from "../../components/CardDescuento";

export default function DescuentoParati() {
  return (
    <section className="w-full flex flex-col gap-6 sm:gap-8 mt-10 sm:mt-12 md:mt-14">
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#96EAEA] leading-tight">
          Descuentos para ti
        </h2>
        <Link
          href={"/"}
          className="text-base sm:text-lg font-semibold text-[#FC68B9] uppercase"
        >
          Ver todo
        </Link>
      </div>
      <CardDescuento
        descuento={{
          id: 1,
          monto: 20,
          tipo_descuento: "porcentaje",
          titulo: "20% en Primer Taller",
          descripcion:
            "Aprovecha un 20% de descuento en tu primer taller de scrapbooking. Ideal para quienes desean empezar a crear con nosotros.",
          fecha_expiracion: "2024-11-15",
          codigo: "PRIMERO20",
        }}
      />
    </section>
  );
}
