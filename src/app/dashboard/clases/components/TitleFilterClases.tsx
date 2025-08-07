"use client";
import { BreadcrumbItem, Breadcrumbs, Button } from "@heroui/react";
import Image from "next/image";

export default function TitleFilterClases() {
  return (
    <section>
      <Breadcrumbs
        itemClasses={{
          item: [" data-[current=true]:text-[#FC68B9] transition-colors"],
        }}
        size="lg"
      >
        <BreadcrumbItem key="inicio">Inicio</BreadcrumbItem>
        <BreadcrumbItem>Clases</BreadcrumbItem>
      </Breadcrumbs>
      <h1 className=" mt-6 text-4xl font-black text-[#96EAEA] ">
        Nuestras clases
      </h1>
      <article className="w-full flex justify-between items-end">
        <p className="text-[#8A8A8A]">
          Revisa todas las clases grabadas, tanto recientes como anteriores.
        </p>
        <div>
          <Button
            className="bg-white border-1 border-[#FC68B9] text-[#FC68B9] font-semibold mt-4 hover:bg-[#fc68b939] m-0"
            radius="full"
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
        </div>
      </article>
    </section>
  );
}
