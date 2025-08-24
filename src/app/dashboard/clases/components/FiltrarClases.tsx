import { Button } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
  setOpenFilter: (open: boolean) => void;
  openFilter?: boolean;
}
export default function FiltrarClases({ setOpenFilter, openFilter }: Props) {
  const [openCategorias, setOpenCategorias] = useState(true);
  const [categoria, setCategoria] = useState("todos");

  const [openTutoriales, setOpenTutoriales] = useState(true);
  const [tutorial, setTutorial] = useState("todos");

  const categorias = [
    { id: "Todos", label: "Todos" },
    { id: "Cake Toppers", label: "Cake Toppers" },
    { id: "Cajitas Temáticas", label: "Cajitas Temáticas" },
    { id: "Cartonaje", label: "Cartonaje" },
    { id: "Tarjetas Invitación", label: "Tarjetas Invitación" },
    { id: "Proyectos Varios", label: "Proyectos Varios" },
  ];

  const tutoriales = [
    { id: "Todos", label: "Todos" },
    {
      id: "Tutoriales Silhouette Studio",
      label: "Tutoriales Silhouette Studio",
    },
    { id: "Tutoriales Cricut Design", label: "Tutoriales Cricut Design" },
    { id: "Tips de Diseño", label: "Tips de Diseño" },
    { id: "Tips de Corte", label: "Tips de Corte" },
    { id: "Varios/otros", label: "Varios/otros" },
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
<div className="shrink-0 w-full p-5 pb-4">
  <button
    className="absolute top-5 right-5 cursor-pointer"
    onClick={() => setOpenFilter(false)}
  >
    <IoCloseOutline className="text-[#FC68B9] text-4xl" />
  </button>

  {/* Título */}
  <div className="flex items-center justify-center gap-3 text-[#FC68B9] mt-6">
    <Image
      src="/icons/grid-pink.svg"
      alt="FILTROS"
      width={40}
      height={40}
    />
    <h2 className="text-lg font-semibold">FILTROS</h2>
  </div>
</div>

{/* Contenido scrolleable */}
<div className="flex-1 overflow-y-auto px-5 pb-4 overscroll-contain">
  <div className="space-y-6">
    <article className="w-full">
      <Button
        className="w-full bg-white text-[#FC68B9] text-lg font-semibold flex justify-between border border-[#FC68B9]"
        endContent={<IoIosArrowUp className="text-xl" />}
        radius="full"
        onPress={() => setOpenCategorias(!openCategorias)}
      >
        Categorías
      </Button>

      <div className="mt-4 space-y-2 pl-2">
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
                className="appearance-none w-5 h-5 border-2 border-pink-500 rounded-full grid place-content-center
                before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full before:scale-0 
                before:transition-transform before:duration-200 before:bg-pink-500
                checked:before:scale-100"
              />
              <span className="text-medium font-semibold text-gray-500">
                {cat.label}
              </span>
            </label>
          ))}
      </div>
    </article>

    <article className="w-full">
      <Button
        className="w-full bg-white text-[#FC68B9] text-lg font-semibold flex justify-between border border-[#FC68B9]"
        endContent={<IoIosArrowUp className="text-xl" />}
        radius="full"
        onPress={() => setOpenTutoriales(!openTutoriales)}
      >
        Tutoriales y Tips
      </Button>

      <div className="mt-4 space-y-2 pl-2">
        {openTutoriales &&
          tutoriales.map((item) => (
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
                checked={tutorial === item.id}
                onChange={() => setTutorial(item.id)}
                className="appearance-none w-5 h-5 border-2 border-pink-500 rounded-full grid place-content-center
                before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full before:scale-0 
                before:transition-transform before:duration-200 before:bg-pink-500
                checked:before:scale-100"
              />
              <span className="text-medium font-semibold text-gray-500">
                {item.label}
              </span>
            </label>
          ))}
      </div>
    </article>
  </div>
</div>

{/* Footer fijo con botón */}
<div className="shrink-0 w-full p-5 pt-4 border-t border-gray-100">
  <Button
    className="w-full py-6 bg-[#FC68B9] text-white text-lg font-bold"
    radius="full"
  >
    Aplicar
  </Button>
</div>

    </section>
  );
}
