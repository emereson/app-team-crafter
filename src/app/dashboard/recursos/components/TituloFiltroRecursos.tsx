import { BreadcrumbItem, Breadcrumbs, Button } from "@heroui/react";
import Image from "next/image";

interface Props {
  setOpenFilter: (open: boolean) => void;
}

export default function TituloFiltroRecursos({ setOpenFilter }: Props) {
  return (
    <section>
      <Breadcrumbs
        itemClasses={{
          item: [" data-[current=true]:text-[#FC68B9] transition-colors"],
        }}
        size="sm"
        className="text-sm sm:text-base"
      >
        <BreadcrumbItem key="inicio">Inicio</BreadcrumbItem>
        <BreadcrumbItem>Recursos</BreadcrumbItem>
      </Breadcrumbs>
      <h1 className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-black text-[#96EAEA] leading-tight">
        Recursos
      </h1>
      <article className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0 mt-4 sm:mt-6">
        <p className="text-sm sm:text-base text-[#8A8A8A] leading-relaxed">
          Encuentra todos los recursos disponibles y compra nuestras ediciones
          anteriores.
        </p>
      <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-start sm:justify-end">
  <Button
    className="bg-white border-1 border-[#FC68B9] text-[#FC68B9] font-semibold hover:bg-[#fc68b939] text-sm sm:text-base min-w-fit"
    radius="full"
    size="sm"
    startContent={
      <Image
        className="text-xs shrink-0"
        src={"/icons/arrows.svg"}
        alt={`Más reciente `}
        width={20}
        height={20}
      />
    }
  >
    Más reciente
  </Button>
  <Button
    className="bg-white border-1 border-[#FC68B9] text-[#FC68B9] font-semibold hover:bg-[#fc68b939] text-sm sm:text-base min-w-fit"
    radius="full"
    size="sm"
    startContent={
      <Image
        className="text-xs shrink-0"
        src={"/icons/grid.svg"}
        alt={`Filtros `}
        width={22}
        height={22}
      />
    }
    onPress={() => setOpenFilter(true)}
  >
    Filtros
  </Button>
</div>

      </article>
    </section>
  );
}
