"use client";
import { Clase } from "@/interfaces/clase.interface";
import { Accordion, AccordionItem } from "@heroui/react";

interface Props {
  clase: Clase;
}

export default function DescripcionClaseAccordion({ clase }: Props) {
  return (
    <section className="w-full flex flex-col gap-2">
      <Accordion>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          startContent={
            <h2 className="text-lg text-[#68E1E0] font-semibold">
              Descripción
            </h2>
          }
        >
          <p className={`font-light transition-all duration-300`}>
            {clase.descripcion_clase}
          </p>{" "}
        </AccordionItem>
      </Accordion>
    </section>
  );
}
