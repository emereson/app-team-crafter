import { Button } from "@heroui/react";
import CardDescuento from "../../components/CardDescuento";
import Image from "next/image";

const descuentos = [
  {
    id: 1,
    monto: 20,
    tipo_descuento: "porcentaje",
    titulo: "20% en Primer Taller",
    descripcion:
      "Aprovecha un 20% de descuento en tu primer taller de scrapbooking. Ideal para quienes desean empezar a crear con nosotros.",
    fecha_expiracion: "15/11/2024",
    codigo: "PRIMERO20",
  },
  {
    id: 2,
    monto: 15,
    tipo_descuento: "porcentaje",
    titulo: "Descuento en Kits de Materiales",
    descripcion:
      "Compra un kit de materiales y obtén un 15% de descuento en tu próxima compra. Perfecto para quienes buscan armar su colección de herramientas.",
    fecha_expiracion: "15/11/2024",
    codigo: "KIT15",
  },
  {
    id: 3,
    monto: 5,
    tipo_descuento: "efectivo",
    titulo: "5 USD de Descuento en Archivos Digitales",
    descripcion:
      "Obtén 5 USD de descuento en archivos digitales seleccionados. Diseños únicos listos para descargar y personalizar.",
    fecha_expiracion: "15/11/2024",
    codigo: "CLASE10",
  },
];

export default function TodosDescuentos() {
  return (
    <section className="w-full flex flex-col gap-5 sm:gap-7 mt-8 sm:mt-12 md:mt-16">
      <Button
        className="w-fit bg-white border-1 border-[#FC68B9] text-[#FC68B9] font-semibold hover:bg-[#fc68b939] text-sm sm:text-base"
        radius="full"
        size="sm"
        startContent={
          <Image
            src={"/icons/arrows.svg"}
            alt={`Más reciente `}
            width={18}
            height={18}
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
        }
      >
        Más reciente
      </Button>
      {descuentos.map((descuento) => (
        <CardDescuento key={descuento.id} descuento={descuento} />
      ))}
    </section>
  );
}
