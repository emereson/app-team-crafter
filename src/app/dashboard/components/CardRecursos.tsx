import { Button } from "@heroui/react";
import Image from "next/image";

interface Props {
  recurso: {
    id: number;
    titulo: string;
    fecha_inicio: string;
    fecha_final: string;
    premium?: boolean;
  };
}

export default function CardRecursos({ recurso }: Props) {
  return (
    <article
      key={recurso.id}
      className="w-[calc(33%_-_15px)] flex flex-col gap-3"
    >
      <div className="w-full relative rounded-2xl overflow-hidden">
        {recurso.premium && (
          <Image
            className="absolute top-4 left-4 w-10"
            src={"/icons/corona.svg"}
            alt={` ${recurso.titulo}`}
            width={100}
            height={100}
          />
        )}
        <Image
          className="w-full h-[300px] object-cover"
          src={"/inicio/producto1.png"}
          alt={recurso.titulo}
          width={500}
          height={500}
        />
        <Button
          className="absolute right-4 bottom-4 bg-[#FC68B9] text-white font-semibold  "
          radius="full"
          startContent={
            <Image
              className=" w-7"
              src={"/icons/documento.svg"}
              alt={`reproducir ${recurso.titulo}`}
              width={100}
              height={100}
            />
          }
        >
          Descargar
        </Button>
      </div>
      <div className=" w-fit bg-[#FFEE97] px-3 py-1 flex items-center gap-2 rounded-full">
        <Image
          className="w-4"
          src={"/icons/relojArena.svg"}
          alt={` ${recurso.titulo}`}
          width={100}
          height={100}
        />
        <p className="text-lg text-[#FC68B9] font-semibold ">
          Caduca en 29 días
        </p>
      </div>
      <h3 className="text-lg font-semibold text-[#8A8A8A] uppercase">
        {recurso.titulo}
      </h3>
    </article>
  );
}
