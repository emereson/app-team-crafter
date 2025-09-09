import { Button } from "@heroui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
  setOpenFilter: (open: boolean) => void;
  openFilter?: boolean;
  setCategoria: (categorias: string[]) => void;
  setTutorial: (tutoriales: string[]) => void;
  categoria: string[];
  tutorial: string[];
  gfindClases: () => void;
}

export default function FiltrarClases({
  setOpenFilter,
  openFilter,
  setCategoria,
  setTutorial,
  categoria,
  tutorial,
  gfindClases,
}: Props) {
  const [openCategorias, setOpenCategorias] = useState(true);
  const [openTutoriales, setOpenTutoriales] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // 👇 Detecta clics fuera del section
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(false);
      }
    };

    if (openFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFilter, setOpenFilter]);

  const categorias = [
    { id: "Cake Toppers", label: "Cake Toppers" },
    { id: "Cajitas Temáticas", label: "Cajitas Temáticas" },
    { id: "Cartonaje", label: "Cartonaje" },
    { id: "Tarjetas Invitación", label: "Tarjetas Invitación" },
    { id: "Proyectos Varios", label: "Proyectos Varios" },
  ];

  const tutoriales = [
    {
      id: "Tutoriales Silhouette Studio",
      label: "Tutoriales Silhouette Studio",
    },
    { id: "Tutoriales Cricut Design", label: "Tutoriales Cricut Design" },
    { id: "Tips de Diseño", label: "Tips de Diseño" },
    { id: "Tips de Corte", label: "Tips de Corte" },
    { id: "Varios/otros", label: "Varios/otros" },
  ];

  // Función para manejar la selección de categorías
  const handleCategoriaChange = (categoriaId: string) => {
    if (categoria.includes(categoriaId)) {
      // Si ya está seleccionada, la removemos
      setCategoria(categoria.filter((id) => id !== categoriaId));
    } else {
      // Si no está seleccionada, la agregamos
      setCategoria([...categoria, categoriaId]);
    }
  };

  // Función para manejar la selección de tutoriales
  const handleTutorialChange = (tutorialId: string) => {
    if (tutorial.includes(tutorialId)) {
      // Si ya está seleccionado, lo removemos
      setTutorial(tutorial.filter((id) => id !== tutorialId));
    } else {
      // Si no está seleccionado, lo agregamos
      setTutorial([...tutorial, tutorialId]);
    }
  };

  // Función para seleccionar/deseleccionar todas las categorías
  const handleSelectAllCategorias = () => {
    if (categoria.length === categorias.length) {
      // Si todas están seleccionadas, deseleccionar todas
      setCategoria([]);
    } else {
      // Si no todas están seleccionadas, seleccionar todas
      setCategoria(categorias.map((cat) => cat.id));
    }
  };

  // Función para seleccionar/deseleccionar todos los tutoriales
  const handleSelectAllTutoriales = () => {
    if (tutorial.length === tutoriales.length) {
      // Si todos están seleccionados, deseleccionar todos
      setTutorial([]);
    } else {
      // Si no todos están seleccionados, seleccionar todos
      setTutorial(tutoriales.map((tut) => tut.id));
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-screen h-screen flex justify-end bg-[#1717178a] z-[60] 
    transition-opacity duration-300 ease-in-out
    ${
      openFilter
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }
  `}
    >
      <section
        ref={sectionRef}
        className="w-full max-w-[383px] h-screen py-10 px-5 bg-white flex flex-col items-center gap-6"
      >
        <button
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setOpenFilter(false)}
        >
          <IoCloseOutline className="text-[#FC68B9] text-4xl" />
        </button>

        {/* Título */}
        <div className="flex items-center gap-3 text-[#FC68B9]">
          <Image
            src="/icons/grid-pink.svg"
            alt="FILTROS"
            width={40}
            height={40}
          />
          <h2 className="text-lg font-semibold">FILTROS</h2>
        </div>

        <article className="w-full">
          <Button
            className="w-full bg-white text-[#FC68B9] text-lg font-semibold flex justify-between border border-[#FC68B9]"
            endContent={<IoIosArrowUp className="text-xl" />}
            radius="full"
            onPress={() => setOpenCategorias(!openCategorias)}
          >
            Categorías ({categoria.length})
          </Button>

          {/* Botón para seleccionar/deseleccionar todas las categorías */}
          {/* {openCategorias && (
            <div className="mt-2 pl-2">
              <button
                onClick={handleSelectAllCategorias}
                className="text-sm text-[#FC68B9] font-medium hover:underline"
              >
                {categoria.length === categorias.length
                  ? "Deseleccionar todas"
                  : "Seleccionar todas"}
              </button>
            </div>
          )} */}

          {/* Lista de categorías */}
          <div className="mt-4 space-y-2 pl-2">
            {openCategorias &&
              categorias.map((cat) => (
                <label
                  key={cat.id}
                  htmlFor={`cat-${cat.id}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={`cat-${cat.id}`}
                    value={cat.id}
                    checked={categoria.includes(cat.id)}
                    onChange={() => handleCategoriaChange(cat.id)}
                    className="appearance-none w-5 h-5 border-2 border-pink-500 rounded-md grid place-content-center before:content-['✓'] before:text-xs before:text-white before:font-bold before:scale-0 before:transition-transform before:duration-200 checked:bg-pink-500 checked:before:scale-100"
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
            Tutoriales y Tips ({tutorial.length})
          </Button>

          {/* Botón para seleccionar/deseleccionar todos los tutoriales */}
          {/* {openTutoriales && (
            <div className="mt-2 pl-2">
              <button
                onClick={handleSelectAllTutoriales}
                className="text-sm text-[#FC68B9] font-medium hover:underline"
              >
                {tutorial.length === tutoriales.length
                  ? "Deseleccionar todos"
                  : "Seleccionar todos"}
              </button>
            </div>
          )} */}

          {/* Lista de tutoriales */}
          <div className="mt-4 space-y-2 pl-2">
            {openTutoriales &&
              tutoriales.map((item) => (
                <label
                  key={item.id}
                  htmlFor={`tut-${item.id}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={`tut-${item.id}`}
                    value={item.id}
                    checked={tutorial.includes(item.id)}
                    onChange={() => handleTutorialChange(item.id)}
                    className="appearance-none w-5 h-5 border-2 border-pink-500 rounded-md grid place-content-center before:content-['✓'] before:text-xs before:text-white before:font-bold before:scale-0 before:transition-transform before:duration-200 checked:bg-pink-500 checked:before:scale-100"
                  />
                  <span className="text-medium font-semibold text-gray-500">
                    {item.label}
                  </span>
                </label>
              ))}
          </div>
        </article>

        <div className="flex-1"></div>

        <Button
          className="w-full py-6 bg-[#FC68B9] text-white text-lg font-bold"
          radius="full"
          type="button"
          onPress={gfindClases}
        >
          Aplicar
        </Button>
      </section>
    </div>
  );
}

// Ejemplo de cómo usar el componente en el componente padre:
// const [categoria, setCategoria] = useState<string[]>([]);
// const [tutorial, setTutorial] = useState<string[]>([]);
