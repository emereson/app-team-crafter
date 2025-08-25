"use client";
import { Clase } from "@/interfaces/clase.interface";
import { useState } from "react";

interface Props {
  clase: Clase;
}

export default function DescripcionClase({ clase }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="w-full flex flex-col gap-2">
      <h2 className="text-lg text-[#68E1E0] font-semibold">Descripción</h2>

      <p
        className={`font-light transition-all duration-300 ${
          expanded ? "line-clamp-none" : "line-clamp-4"
        }`}
      >
        {clase.descripcion_clase}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-fit -mt-1 text-sm text-[#FC68B9] font-bold cursor-pointer uppercase"
      >
        {expanded ? "Leer menos" : "Leer más"}
      </button>
    </section>
  );
}
