import { BreadcrumbItem, Breadcrumbs, Button } from "@heroui/react";
import Image from "next/image";

interface Props {
  setOpenFilter: (open: boolean) => void;
}

export default function TituloFiltroClases({ setOpenFilter }: Props) {
  return (
    <section>
      <Breadcrumbs
        itemClasses={{
          item: [" data-[current=true]:text-[#FC68B9] transition-colors"],
        }}
        size="lg"
        className="text-sm sm:text-base"
      >
        <BreadcrumbItem key="inicio">Inicio</BreadcrumbItem>
        <BreadcrumbItem>Clases</BreadcrumbItem>
      </Breadcrumbs>
      <h1 className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-black text-[#96EAEA]">
        Nuestras clases
      </h1>
      <article className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
        <p className="text-[#8A8A8A] text-sm sm:text-base leading-relaxed">
          Revisa todas las clases grabadas, tanto recientes como anteriores.
        </p>
         <div className="flex w-full flex-wrap justify-start gap-2 sm:w-auto sm:justify-end">
          <Button
           className="bg-white border-1 border-[#FC68B9] text-[#FC68B9] font-semibold hover:bg-[#fc68b939] text-sm sm:text-base"
            radius="full"
            size="sm"
            startContent={
              <Image
                className="text-xs"
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
            className="bg-white border-1 border-[#FC68B9] text-[#FC68B9] font-semibold hover:bg-[#fc68b939] text-sm sm:text-base"
            radius="full"
            size="sm"
            startContent={
              <Image
                className="text-xs"
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
