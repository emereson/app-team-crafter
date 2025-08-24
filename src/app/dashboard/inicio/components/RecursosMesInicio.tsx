// src\app\dashboard\inicio\components\RecursosMesInicio.tsx
"use client";

import Link from "next/link";
import CardRecursos from "../../components/CardRecursos";
import { useState, useEffect } from "react";

export default function RecursosMesInicio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);


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
  ];

  // Detectar el tamaño de pantalla y ajustar cards a mostrar
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1); // móvil: 1 card
      } else if (window.innerWidth < 768) {
        setCardsToShow(2); // tablet: 2 cards
      } else {
        setCardsToShow(3); // desktop: 3 cards
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);

    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const maxIndex = Math.max(0, recursos.length - cardsToShow);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Obtener los cards visibles actualmente
  // const visibleCards = recursos.slice(currentIndex, currentIndex + cardsToShow);

  return (
    <section className="w-full flex flex-col gap-6 sm:gap-8 pt-12 sm:pt-16">
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase text-[#96EAEA] leading-tight">
          Recursos del mes
        </h2>
        <Link
          href={"/"}
          className="text-sm sm:text-base md:text-lg font-semibold text-[#FC68B9] uppercase"
        >
          Ver todo
        </Link>
      </div>

      {/* Contenedor del carrusel */}
      <div className="relative w-full min-h-[280px]">
        {/* Flecha izquierda */}
        {recursos.length > cardsToShow && (
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Anterior"
          >
            <span className="text-[#FC68B9] text-lg sm:text-xl font-bold">
              &lt;
            </span>
          </button>
        )}

        {/* Contenedor de cards */}
        <div
          className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 overflow-hidden px-2 sm:px-3 md:px-4 touch-pan-x"
          onTouchStart={(e) => {
            const touch = e.touches[0];
            setTouchStart(touch.clientX);
          }}
          onTouchEnd={(e) => {
            if (!touchStart) return;
            const touch = e.changedTouches[0];
            const diff = touchStart - touch.clientX;
            if (Math.abs(diff) > 50) {
              if (diff > 0) nextSlide();
              else prevSlide();
            }
            setTouchStart(null);
          }}
        >
       <div
  className="flex transition-transform duration-500 ease-in-out"
  style={{
    transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
    width: `${recursos.length * (100 / cardsToShow)}%`,
  }}
>

            {recursos.map((recurso, index) => (
           <div
           key={recurso.id}
           className={`flex-shrink-0 transition-all duration-300 ease-out px-1 sm:px-2 ${
             isAnimating ? "scale-95 opacity-80" : "scale-100 opacity-100"
           }`}
           style={{ width: `${100 / cardsToShow}%` }}
         >
         
                <CardRecursos recurso={recurso} />
              </div>
            ))}
          </div>
        </div>

        {/* Flecha derecha */}
        {recursos.length > cardsToShow && (
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Siguiente"
          >
            <span className="text-[#FC68B9] text-lg sm:text-xl font-bold">
              &gt;
            </span>
          </button>
        )}
      </div>

      {/* Indicadores de página */}
      {recursos.length > cardsToShow && (
        <div className="flex justify-center gap-2 mt-3 sm:mt-4">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              disabled={isAnimating}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === currentIndex
                  ? "bg-[#FC68B9] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir a página ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
