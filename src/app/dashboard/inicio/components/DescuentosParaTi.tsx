"use client";
import Link from "next/link";
import CardDescuento from "../../components/CardDescuento";

export default function DescuentoParati() {
  return (
    <section className="w-full flex flex-col gap-8 mt-14  mb-14">
      <div className="w-full flex justify-between">
        <h2 className="text-3xl font-extrabold uppercase text-[#96EAEA] max-md:text-xl">
          Descuentos para ti
        </h2>
        <Link
          href={"/"}
          className="text-lg font-semibold text-[#FC68B9] uppercase max-md:text-sm"
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
