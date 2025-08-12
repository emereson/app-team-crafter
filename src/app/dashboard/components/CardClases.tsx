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
  width?: string;
  icon_favoritos?: false;
  hegiht_portada?: string;
}

export default function CardClases({
  producto,
  width,
  icon_favoritos,
  hegiht_portada,
}: Props) {
  return (
    <article
      className={`${
        width ? width : "w-[calc(50%_-_15px)]"
      } flex flex-col gap-3"`}
    >
      <div className="w-full relative rounded-2xl overflow-hidden">
        <Image
          className={`w-full ${
            hegiht_portada ? hegiht_portada : "h-[300px]"
          } object-cover`}
          src={"/inicio/producto1.png"}
          alt={producto.titulo}
          width={500}
          height={500}
        />
        <Link
          href={`/dashboard/clases/${producto.id}`}
          className="absolute right-4 bottom-4"
        >
          <Image
            className=" w-14"
            src={"/icons/playVideo.svg"}
            alt={`reproducir ${producto.titulo}`}
            width={100}
            height={100}
          />
        </Link>
      </div>
      <div className="flex justify-between mt-2">
        <section className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <Image
              className="w-6"
              src={"/icons/clock.svg"}
              alt={`reproducir ${producto.titulo}`}
              width={100}
              height={100}
            />
            <p className="text-medium text-[#FFB4DF] font-semibold">1:19:51</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Image
              className="w-5"
              src={"/icons/calendario.svg"}
              alt={`reproducir ${producto.titulo}`}
              width={100}
              height={100}
            />
            <p className="text-medium text-[#FFB4DF] font-semibold">
              10 Oct 2024
            </p>
          </div>
        </section>
        {icon_favoritos && (
          <button>
            <Image
              className="w-6"
              src={"/icons/favoritos-no.svg"}
              alt={`reproducir ${producto.titulo}`}
              width={100}
              height={100}
            />
          </button>
        )}
      </div>
      <h3 className="mt-2 text-medium   font-semibold text-[#8A8A8A] uppercase">
        {producto.titulo}
      </h3>
    </article>
  );
}
