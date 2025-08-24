"use client";

import CardClases from "../../components/CardClases";
import { cn, Pagination, PaginationItemType } from "@heroui/react";
import type { PaginationItemRenderProps } from "@heroui/react";
import Image from "next/image";

export default function ListaClases() {
  const productos = [
    {
      id: 1,
      titulo: "Hemos preparado estos 3 archivos gratis para Halloween",
      fecha_inicio: "2025-07-25 16:16:25",
      fecha_final: "2025-07-26 16:16:25",
    },
    {
      id: 2,
      titulo: "Descarga estos diseños espeluznantes de calabazas",
      fecha_inicio: "2025-07-26 10:00:00",
      fecha_final: "2025-07-27 10:00:00",
    },
    {
      id: 3,
      titulo: "Plantillas imprimibles para tu fiesta de Halloween",
      fecha_inicio: "2025-07-27 09:00:00",
      fecha_final: "2025-07-28 09:00:00",
    },
    {
      id: 4,
      titulo: "Stickers de fantasmas para decorar tu casa",
      fecha_inicio: "2025-07-28 08:00:00",
      fecha_final: "2025-07-29 08:00:00",
    },
    {
      id: 5,
      titulo: "Pack gratuito de invitaciones para Halloween",
      fecha_inicio: "2025-07-29 11:30:00",
      fecha_final: "2025-07-30 11:30:00",
    },
    {
      id: 6,
      titulo: "Recortables para niños: brujas, gatos y monstruos",
      fecha_inicio: "2025-07-30 15:00:00",
      fecha_final: "2025-07-31 15:00:00",
    },
    {
      id: 7,
      titulo: "Posters tenebrosos para imprimir gratis",
      fecha_inicio: "2025-07-31 12:00:00",
      fecha_final: "2025-08-01 12:00:00",
    },
    {
      id: 8,
      titulo: "Archivos SVG para decorar camisetas de Halloween",
      fecha_inicio: "2025-08-01 13:45:00",
      fecha_final: "2025-08-02 13:45:00",
    },
    {
      id: 9,
      titulo: "Banners animados de Halloween para tus redes",
      fecha_inicio: "2025-08-02 16:00:00",
      fecha_final: "2025-08-03 16:00:00",
    },
    {
      id: 10,
      titulo: "Tarjetas de regalo con diseño de calaveras",
      fecha_inicio: "2025-08-03 09:00:00",
      fecha_final: "2025-08-04 09:00:00",
    },
    {
      id: 11,
      titulo: "Etiquetas para dulces de Halloween listas para imprimir",
      fecha_inicio: "2025-08-04 10:10:00",
      fecha_final: "2025-08-05 10:10:00",
    },
    {
      id: 12,
      titulo: "Diseños vintage de Halloween para scrapbook",
      fecha_inicio: "2025-08-05 14:00:00",
      fecha_final: "2025-08-06 14:00:00",
    },
    {
      id: 13,
      titulo: "Fondos de pantalla espeluznantes para móviles",
      fecha_inicio: "2025-08-06 08:30:00",
      fecha_final: "2025-08-07 08:30:00",
    },
    {
      id: 14,
      titulo: "Diseños para máscaras de papel de monstruos",
      fecha_inicio: "2025-08-07 11:00:00",
      fecha_final: "2025-08-08 11:00:00",
    },
    {
      id: 15,
      titulo: "Mockups de productos con temática Halloween",
      fecha_inicio: "2025-08-08 09:45:00",
      fecha_final: "2025-08-09 09:45:00",
    },
  ];

  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className="bg-default-200/50 min-w-8 w-8 h-8 hidden"
          onClick={onNext}
        >
          -
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className="bg-default-200/50 min-w-8 w-8 h-8 hidden"
          onClick={onPrevious}
        >
          -
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    // cursor is the default item
    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          "relative  min-w-[40px] min-h-[40px] text-[#68E1E0] font-black text-xl flex items-center justify-center  cursor-pointer ",
          isActive && "text-white "
        )}
        onClick={() => setPage(value)}
      >
        {isActive && (
          <Image
            className="absolute  min-w-[38px] min-h-[38px]"
            src="/icons/starPage.svg"
            alt=" select page"
            width={20}
            height={20}
          />
        )}
        <p className="z-10">{value}</p>
      </button>
    );
  };

  return (
    <section className="w-full flex flex-col items-center gap-6 sm:gap-8 pt-6 sm:pt-10">
     <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">        
        {productos.map((producto) => (
          <CardClases
            key={producto.id}
            producto={producto}
          // width="w-full sm:w-[calc(50%_-_6px)] md:w-[calc(33%_-_10px)] lg:w-[calc(33%_-_13.33px)]"     
            icon_favoritos={true}
          />
        ))}
      </div>
      <Pagination
        disableCursorAnimation
        showControls
        className="gap-2 sm:gap-4 mt-4 sm:mt-8"
        initialPage={1}
        renderItem={renderItem}
        total={8}
        boundaries={2}
        variant="light"
        size="sm"
      />
    </section>
  );
}
