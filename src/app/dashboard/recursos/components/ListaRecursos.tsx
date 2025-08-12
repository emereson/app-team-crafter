"use client";

import { cn, Pagination, PaginationItemType } from "@heroui/react";
import type { PaginationItemRenderProps } from "@heroui/react";
import Image from "next/image";
import CardRecursos from "../../components/CardRecursos";

export default function ListaRecursos() {
  const recursos = [
    {
      id: 1,
      titulo: "Hemos preparado estos 3 archivos gratis para halloween",
      fecha_inicio: "2025-07-25 16:16:25",
      fecha_final: "2025-07-26 16:16:25",
      premium: true,
    },
    {
      id: 2,
      titulo: "Hemos preparado estos 3 archivos gratis para halloween",
      fecha_inicio: "2025-07-25 16:16:25",
      fecha_final: "2025-07-26 16:16:25",
      premium: false,
    },
    {
      id: 3,
      titulo: "Hemos preparado estos 3 archivos gratis para halloween",
      fecha_inicio: "2025-07-25 16:16:25",
      fecha_final: "2025-07-26 16:16:25",
      premium: false,
    },
    {
      id: 4,
      titulo: "Colección exclusiva de vectores navideños",
      fecha_inicio: "2025-08-01 10:00:00",
      fecha_final: "2025-08-05 23:59:59",
      premium: true,
    },
    {
      id: 5,
      titulo: "Fondos minimalistas en alta resolución",
      fecha_inicio: "2025-08-02 08:30:00",
      fecha_final: "2025-08-10 23:59:59",
      premium: false,
    },
    {
      id: 6,
      titulo: "Set de íconos para redes sociales",
      fecha_inicio: "2025-08-03 09:15:00",
      fecha_final: "2025-08-07 20:00:00",
      premium: true,
    },
    {
      id: 7,
      titulo: "Plantillas editables para invitaciones",
      fecha_inicio: "2025-08-04 14:00:00",
      fecha_final: "2025-08-08 18:00:00",
      premium: false,
      caducado: true,
    },
    {
      id: 8,
      titulo: "Archivos PNG transparentes de emojis",
      fecha_inicio: "2025-08-05 12:00:00",
      fecha_final: "2025-08-09 22:00:00",
      premium: true,
    },
    {
      id: 9,
      titulo: "Mockups realistas para branding",
      fecha_inicio: "2025-08-06 07:00:00",
      fecha_final: "2025-08-12 23:00:00",
      premium: false,
      caducado: true,
    },
    {
      id: 10,
      titulo: "Fuentes tipográficas elegantes",
      fecha_inicio: "2025-08-07 09:00:00",
      fecha_final: "2025-08-14 23:59:59",
      premium: true,
    },
    {
      id: 11,
      titulo: "Ilustraciones de personajes estilo cartoon",
      fecha_inicio: "2025-08-08 08:45:00",
      fecha_final: "2025-08-13 20:00:00",
      premium: false,
      caducado: true,
    },
    {
      id: 12,
      titulo: "Texturas abstractas en 4K",
      fecha_inicio: "2025-08-09 11:00:00",
      fecha_final: "2025-08-15 23:59:59",
      premium: true,
    },
    {
      id: 13,
      titulo: "Animaciones Lottie gratuitas",
      fecha_inicio: "2025-08-10 10:30:00",
      fecha_final: "2025-08-16 22:00:00",
      premium: false,
      caducado: true,
    },
    {
      id: 14,
      titulo: "Packs de stickers digitales",
      fecha_inicio: "2025-08-11 09:00:00",
      fecha_final: "2025-08-17 21:30:00",
      premium: true,
    },
    {
      id: 15,
      titulo: "Colección de fondos para Zoom",
      fecha_inicio: "2025-08-12 07:15:00",
      fecha_final: "2025-08-18 23:00:00",
      premium: false,
      caducado: true,
    },
    {
      id: 16,
      titulo: "Plantillas de historias para Instagram",
      fecha_inicio: "2025-08-13 12:30:00",
      fecha_final: "2025-08-20 23:59:59",
      premium: true,
      caducado: true,
    },
    {
      id: 17,
      titulo: "Fotografías libres de derechos",
      fecha_inicio: "2025-08-14 08:00:00",
      fecha_final: "2025-08-21 23:59:59",
      premium: false,
      caducado: true,
    },
    {
      id: 18,
      titulo: "Colección de bordes decorativos",
      fecha_inicio: "2025-08-15 09:30:00",
      fecha_final: "2025-08-22 23:00:00",
      premium: true,
      caducado: true,
    },
    {
      id: 19,
      titulo: "Diseños de camisetas listos para imprimir",
      fecha_inicio: "2025-08-16 10:00:00",
      fecha_final: "2025-08-23 23:59:59",
      premium: false,
      caducado: true,
    },
    {
      id: 20,
      titulo: "Paquete de iconos minimalistas",
      fecha_inicio: "2025-08-17 11:15:00",
      fecha_final: "2025-08-24 22:00:00",
      premium: true,
      caducado: true,
    },
    {
      id: 21,
      titulo: "Ilustraciones para presentaciones",
      fecha_inicio: "2025-08-18 12:00:00",
      fecha_final: "2025-08-25 23:59:59",
      premium: false,
      caducado: true,
    },
    {
      id: 22,
      titulo: "Fotomontajes creativos",
      fecha_inicio: "2025-08-19 09:45:00",
      fecha_final: "2025-08-26 23:00:00",
      premium: true,
      caducado: true,
    },
    {
      id: 23,
      titulo: "Recortes PNG de objetos",
      fecha_inicio: "2025-08-20 08:20:00",
      fecha_final: "2025-08-27 21:00:00",
      premium: false,
      caducado: true,
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
    <section className="w-full flex flex-col items-center gap-8 pt-10">
      <div className="w-full flex flex-wrap gap-[20px] ">
        {recursos.map((recurso) => (
          <CardRecursos key={recurso.id} recurso={recurso} />
        ))}
      </div>
      <Pagination
        disableCursorAnimation
        showControls
        className="gap-4 mt-8"
        initialPage={1}
        renderItem={renderItem}
        total={8}
        boundaries={3}
        variant="light"
      />
    </section>
  );
}
