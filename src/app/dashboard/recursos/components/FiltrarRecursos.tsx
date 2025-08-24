import { Button } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
  setOpenFilter: (open: boolean) => void;
  openFilter?: boolean;
}
export default function FiltrarRecursos({ setOpenFilter, openFilter }: Props) {
  const [openCategorias, setOpenCategorias] = useState(true);
  const [categoria, setCategoria] = useState("todos");

  const [openRecursos, setOpenRecursos] = useState(true);
  const [recurso, setRecurso] = useState("todos");

  const categorias = [
    { id: "Todos", label: "Todos" },
    { id: "Cake Toppers", label: "Cake Toppers" },
    { id: "Cajitas Temáticas", label: "Cajitas Temáticas" },
    { id: "Cartonaje", label: "Cartonaje" },
    { id: "Tarjetas Invitación", label: "Tarjetas Invitación" },
    { id: "Proyectos Varios", label: "Proyectos Varios" },
  ];

  const recursos = [
    { id: "Todos", label: "Todos" },
    { id: "Exclusivos", label: "Exclusivos" },
    { id: "Adicionales", label: "Adicionales" },
  ];
  return (
  <section
  className={`fixed top-0 right-0 w-full max-w-[383px] h-dvh bg-white z-[60] flex flex-col
${
  openFilter ? "translate-x-0" : "translate-x-full"
} transition-transform duration-300 ease-in-out overflow-hidden
`}
>
{/* Header fijo */}
<div className="shrink-0 w-full p-4 sm:p-5 pb-4">
  <button
    className="absolute top-4 sm:top-5 right-4 sm:right-5 cursor-pointer"
    onClick={() => setOpenFilter(false)}
  >
    <IoCloseOutline className="text-[#FC68B9] text-3xl sm:text-4xl" />
  </button>

  {/* Título */}
  <div className="flex items-center justify-center gap-2 sm:gap-3 text-[#FC68B9] mt-6">
    <Image
      src="/icons/grid-pink.svg"
      alt="FILTROS"
      width={32}
      height={32}
      className="w-8 h-8 sm:w-10 sm:h-10"
    />
    <h2 className="text-base sm:text-lg font-semibold">FILTROS</h2>
  </div>
</div>

{/* Contenido scrolleable */}
<div className="flex-1 overflow-y-auto px-4 sm:px-5 pb-4 overscroll-contain">
  <div className="space-y-4 sm:space-y-6">
    <article className="w-full">
      <Button
        className="w-full bg-white text-[#FC68B9] text-sm sm:text-lg font-semibold flex justify-between border border-[#FC68B9]"
        endContent={<IoIosArrowUp className="text-lg sm:text-xl" />}
        radius="full"
        size="sm"
        onPress={() => setOpenRecursos(!openRecursos)}
      >
        Tutoriales y Tips
      </Button>

      <div className="mt-3 sm:mt-4 space-y-2 pl-2">
        {openRecursos &&
          recursos.map((item) => (
            <label
              key={item.id}
              htmlFor={item.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                id={item.id}
                name="itemegoria"
                value={item.id}
                checked={recurso === item.id}
                onChange={() => setRecurso(item.id)}
                className="appearance-none w-4 h-4 sm:w-5 sm:h-5 border-2 border-pink-500 rounded-full grid place-content-center
                before:content-[''] before:w-2 before:h-2 sm:before:w-2.5 sm:before:h-2.5 before:rounded-full before:scale-0 
                before:transition-transform before:duration-200 before:bg-pink-500
                checked:before:scale-100"
              />
              <span className="text-sm sm:text-medium font-semibold text-gray-500">
                {item.label}
              </span>
            </label>
          ))}
      </div>
    </article>

    <article className="w-full">
      <Button
        className="w-full bg-white text-[#FC68B9] text-sm sm:text-lg font-semibold flex justify-between border border-[#FC68B9]"
        endContent={<IoIosArrowUp className="text-lg sm:text-xl" />}
        radius="full"
        size="sm"
        onPress={() => setOpenCategorias(!openCategorias)}
      >
        Categorías
      </Button>

      <div className="mt-3 sm:mt-4 space-y-2 pl-2">
        {openCategorias &&
          categorias.map((cat) => (
            <label
              key={cat.id}
              htmlFor={cat.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                id={cat.id}
                name="categoria"
                value={cat.id}
                checked={categoria === cat.id}
                onChange={() => setCategoria(cat.id)}
                className="appearance-none w-4 h-4 sm:w-5 sm:h-5 border-2 border-pink-500 rounded-full grid place-content-center
                before:content-[''] before:w-2 before:h-2 sm:before:w-2.5 sm:before:h-2.5 before:rounded-full before:scale-0 
                before:transition-transform before:duration-200 before:bg-pink-500
                checked:before:scale-100"
              />
              <span className="text-sm sm:text-medium font-semibold text-gray-500">
                {cat.label}
              </span>
            </label>
          ))}
      </div>
    </article>
  </div>
</div>

{/* Footer fijo con botón */}
<div className="shrink-0 w-full p-4 sm:p-5 pt-4 border-t border-gray-100">
  <Button
    className="w-full py-4 sm:py-6 bg-[#FC68B9] text-white text-sm sm:text-lg font-bold"
    radius="full"
    size="lg"
  >
    Aplicar
  </Button>
</div>

    </section>
  );
}
