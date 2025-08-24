"use client";
import { Snippet } from "@heroui/react";

export const CopyIcon = () => {
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="40" height="40" rx="11" fill="#FFB4DF" />
      <path
        d="M25.5 21.9V24.9C25.5 28.9 23.9 30.5 19.9 30.5H16.1C12.1 30.5 10.5 28.9 10.5 24.9V21.1C10.5 17.1 12.1 15.5 16.1 15.5H19.1"
        stroke="#FC68B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.5001 21.9H22.3001C19.9001 21.9 19.1001 21.1 19.1001 18.7V15.5L25.5001 21.9Z"
        stroke="#FC68B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.1001 10.5H24.1001"
        stroke="#FC68B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 13.5C15.5 11.84 16.84 10.5 18.5 10.5H21.12"
        stroke="#FC68B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.4999 16.5V22.69C30.4999 24.24 29.2399 25.5 27.6899 25.5"
        stroke="#FC68B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.5 16.5H27.5C25.25 16.5 24.5 15.75 24.5 13.5V10.5L30.5 16.5Z"
        stroke="#FC68B9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export interface Descuento {
  id: number;
  monto: number;
  tipo_descuento: string;
  titulo: string;
  descripcion: string;
  fecha_expiracion: string; // o Date si quieres manejarlo como objeto de fecha
  codigo: string;
}

interface Props {
  descuento: Descuento;
}

export default function CardDescuento({ descuento }: Props) {
  return (
    <article className="relative flex flex-col sm:flex-row overflow-hidden">
      <span className="absolute -top-[18px] -right-[18px] w-[36px] h-[36px] rounded-full bg-white z-10" />
      <span className="absolute -bottom-[18px] -right-[18px] w-[36px] h-[36px] rounded-full bg-white z-10" />
      <div className="relative w-full sm:w-[220px] h-[120px] sm:h-[185px] bg-[#68E1E0] flex flex-col items-center justify-center text-white z-10">
        <span className="absolute -top-[18px] -left-[18px] w-[36px] h-[36px] rounded-full bg-white" />
        <span className="absolute -top-[18px] -right-[18px] w-[36px] h-[36px] rounded-full bg-white" />
        <span className="absolute -bottom-[18px] -left-[18px] w-[36px] h-[36px] rounded-full bg-white" />
        <span className="absolute -bottom-[18px] -right-[18px] w-[36px] h-[36px] rounded-full bg-white" />
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          {descuento.tipo_descuento === "efectivo"
            ? `$ ${descuento.monto}`
            : `${descuento.monto}%`}
        </h3>
        <h5 className="text-lg sm:text-xl md:text-2xl font-bold">DSCTO</h5>
      </div>
      <div className="relative w-full h-auto sm:h-[185px] bg-white border-2 border-[#68E1E0] flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-[#8A8A8A] overflow-hidden p-4 sm:p-6">
        <span className="absolute -top-[18px] -left-[18px] w-[36px] h-[36px] rounded-full bg-white border-2 border-[#68E1E0]" />
        <span className="absolute -top-[18px] -right-[18px] w-[36px] h-[36px] rounded-full bg-white border-2 border-[#68E1E0]" />
        <span className="absolute -bottom-[18px] -left-[18px] w-[36px] h-[36px] rounded-full bg-white border-2 border-[#68E1E0]" />
        <span className="absolute -bottom-[18px] -right-[18px] w-[36px] h-[36px] rounded-full bg-white border-2 border-[#68E1E0]" />

        <article className="flex flex-col w-full sm:w-auto">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">{descuento.titulo}</h3>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">{descuento.descripcion}</p>
          <span className="text-xs sm:text-sm md:text-[14px] font-bold mt-2">
            Fecha de expiración: {descuento.fecha_expiracion}
          </span>
        </article>
        <article className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 w-full sm:w-auto">
          <h3 className="text-sm sm:text-base text-[#FC68B9]">Código:</h3>
          <Snippet
            className="bg-[#FC68B9] w-full sm:w-auto px-4 py-2 rounded-2xl"
            size="sm"
            symbol=""
            copyIcon={<CopyIcon />}
          >
            <p className="font-bold text-white tracking-wide text-sm sm:text-base">
              {descuento.codigo}
            </p>
          </Snippet>
        </article>
      </div>
    </article>
  );
}
