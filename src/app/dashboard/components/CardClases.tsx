import Image from "next/image";
import Link from "next/link";

interface Props {
  producto: {
    id: number;
    titulo: string;
    fecha_inicio: string;
    fecha_final: string;
    premium?: boolean;
  };
  icon_favoritos?: boolean;
  hegiht_portada?: string;
}

export default function CardClases({
  producto,
  icon_favoritos,
  hegiht_portada,
}: Props) {
  return (
    <article className="w-full flex flex-col gap-2 sm:gap-3">
      <div className="w-full relative rounded-2xl overflow-hidden">
        <Image
          className={`w-full ${
            hegiht_portada ? hegiht_portada : "h-[200px] sm:h-[250px] md:h-[300px]"
          } object-cover`}
          src={"/inicio/producto1.png"}
          alt={producto.titulo}
          width={500}
          height={500}
        />
        <Link
          href={`/dashboard/clases/${producto.id}`}
          className="absolute right-2 sm:right-4 bottom-2 sm:bottom-4"
        >
          <Image
            className="w-10 sm:w-12 md:w-14"
            src={"/icons/playVideo.svg"}
            alt={`reproducir ${producto.titulo}`}
            width={100}
            height={100}
          />
        </Link>
      </div>
      
      {/* Layout móvil: icono de favorito al lado del título */}
      <div className="flex flex-col sm:hidden gap-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm font-semibold text-[#8A8A8A] uppercase leading-tight flex-1">
            {producto.titulo}
          </h3>
          {icon_favoritos && (
            <button className="flex-shrink-0">
              <Image
                className="w-5"
                src={"/icons/favoritos-no.svg"}
                alt={`favorito ${producto.titulo}`}
                width={100}
                height={100}
              />
            </button>
          )}
        </div>
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Image
              className="w-4"
              src={"/icons/clock.svg"}
              alt={`tiempo de video`}
              width={100}
              height={100}
            />
            <p className="text-sm text-[#FFB4DF] font-semibold">1:19:51</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Image
              className="w-4"
              src={"/icons/calendario.svg"}
              alt={`fecha`}
              width={100}
              height={100}
            />
            <p className="text-sm text-[#FFB4DF] font-semibold">
              10 Oct 2024
            </p>
          </div>
        </section>
      </div>

      {/* Layout escritorio: diseño original */}
      <div className="hidden sm:flex justify-between mt-2">
        <section className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <Image
              className="w-4 sm:w-5 md:w-6"
              src={"/icons/clock.svg"}
              alt={`reproducir ${producto.titulo}`}
              width={100}
              height={100}
            />
            <p className="text-sm sm:text-medium text-[#FFB4DF] font-semibold">1:19:51</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Image
              className="w-4 sm:w-5"
              src={"/icons/calendario.svg"}
              alt={`reproducir ${producto.titulo}`}
              width={100}
              height={100}
            />
            <p className="text-sm sm:text-medium text-[#FFB4DF] font-semibold">
              10 Oct 2024
            </p>
          </div>
        </section>
        {icon_favoritos && (
          <button>
            <Image
              className="w-5 sm:w-6"
              src={"/icons/favoritos-no.svg"}
              alt={`reproducir ${producto.titulo}`}
              width={100}
              height={100}
            />
          </button>
        )}
      </div>
      
      {/* Título solo visible en escritorio */}
      <h3 className="hidden sm:block mt-2 text-sm sm:text-medium font-semibold text-[#8A8A8A] uppercase leading-tight">
        {producto.titulo}
      </h3>
    </article>
  );
}
