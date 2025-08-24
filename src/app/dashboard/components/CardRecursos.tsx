
import Image from "next/image";

interface Props {
  recurso: {
    id: number;
    titulo: string;
    fecha_inicio: string;
    fecha_final: string;
    premium?: boolean;
    caducado?: boolean;
  };
}

export default function CardRecursos({ recurso }: Props) {
  return (
    <article className="w-full flex flex-col gap-3">
      <div className="w-full relative rounded-2xl overflow-hidden">
        {recurso.premium && (
          <Image
            className="absolute top-4 left-4 w-8 md:w-10 z-20"
            src={"/icons/corona.svg"}
            alt={` ${recurso.titulo}`}
            width={100}
            height={100}
          />
        )}
        <Image
          className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
          src={"/inicio/producto1.png"}
          alt={recurso.titulo}
          width={500}
          height={500}
        />
        {!recurso.caducado && (
          <button className="group absolute cursor-pointer right-2 sm:right-4 bottom-2 sm:bottom-4 bg-white text-[#FC68B9] font-semibold flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 px-2 sm:px-4 rounded-full hover:bg-[#FC68B9] hover:text-white text-sm sm:text-base">
            <div className="w-4 h-4 sm:w-5 sm:w-5 bg-[url(/icons/documento-pink.svg)] bg-no-repeat bg-center group-hover:bg-[url(/icons/documento.svg)]" />
            <p className="hidden sm:block">Descargar</p>
          </button>
        )}
        {recurso.premium && (
          <div className="absolute w-full h-full top-0 left-0 bg-[#FC68B980] flex items-center justify-center cursor-no-drop z-10">
            <Image
              src={"/icons/candado.svg"}
              alt={`caducado ${recurso.titulo}`}
              width={35}
              height={35}
              className="sm:w-[45px] sm:h-[45px]"
            />
          </div>
        )}
      </div>
      {recurso.caducado ? (
        <div className="w-full flex justify-between items-center">
          <p className="w-fit bg-[#FC68B9] px-2 sm:px-3 py-1 flex items-center gap-2 rounded-full text-sm sm:text-medium text-white font-semibold">
            Caducado{" "}
          </p>
          <article className="w-fit flex items-center gap-2">
            <Image
              className="w-4 sm:w-5"
              src={"/icons/calendario.svg"}
              alt={` ${recurso.titulo}`}
              width={100}
              height={100}
            />
            <p className="text-sm sm:text-base text-[#FFB4DF] font-medium">8 Oct 2024</p>
          </article>
        </div>
      ) : (
        <div className="w-fit bg-[#FFEE97] px-2 sm:px-3 py-1 flex items-center gap-2 rounded-full">
          <Image
            className="w-3 sm:w-4"
            src={"/icons/relojArena.svg"}
            alt={` ${recurso.titulo}`}
            width={100}
            height={100}
          />
          <p className="text-sm sm:text-medium text-[#FC68B9] font-semibold">
            Caduca en 29 días
          </p>
        </div>
      )}

      <h3 className="text-sm sm:text-medium font-semibold text-[#8A8A8A] uppercase leading-tight">
        {recurso.titulo}
      </h3>
    </article>
  );
}
