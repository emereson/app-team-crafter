import { Clase } from "@/interfaces/clase.interface";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import VideoPlayer from "./VideoPlayer";

interface Props {
  clase: Clase;
  width?: string;
  icon_favoritos?: false;
  hegiht_portada?: string;
}

export default function CardClases({ clase, width, icon_favoritos }: Props) {
  return (
    <article
      className={`${
        width ? width : "w-[calc(50%_-_15px)]"
      } flex flex-col gap-3"`}
    >
      <Link href={`/dashboard/clases/${clase?.id}`}>
        <div className="w-full relative rounded-2xl overflow-hidden">
          <VideoPlayer hlsUrl={clase.video_clase} mode="poster" />
          <Image
            className="absolute right-4 bottom-4  w-14"
            src={"/icons/playVideo.svg"}
            alt={`reproducir ${clase.descripcion_clase}`}
            width={100}
            height={100}
          />
        </div>
      </Link>
      <div className="flex justify-between mt-2">
        <section className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <Image
              className="w-6"
              src={"/icons/clock.svg"}
              alt={`reproducir ${clase.descripcion_clase}`}
              width={100}
              height={100}
            />
            <p className="text-medium text-[#FFB4DF] font-semibold">
              {clase.duracion_video}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Image
              className="w-5"
              src={"/icons/calendario.svg"}
              alt={`reproducir ${clase.descripcion_clase}`}
              width={100}
              height={100}
            />
            <p className="text-medium text-[#FFB4DF] font-semibold">
              {formatDate(clase.createdAt)}
            </p>
          </div>
        </section>
        {icon_favoritos && (
          <button>
            <Image
              className="w-6"
              src={"/icons/favoritos-no.svg"}
              alt={`reproducir ${clase.descripcion_clase}`}
              width={100}
              height={100}
            />
          </button>
        )}
      </div>
      <h3 className="mt-2 text-medium   font-semibold text-[#8A8A8A] uppercase">
        {clase.descripcion_clase}
      </h3>
    </article>
  );
}
