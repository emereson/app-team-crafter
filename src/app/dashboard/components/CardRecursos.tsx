import { Recurso } from "@/interfaces/recurso.interface";
import Image from "next/image";
import Countdown, { useCountdown } from "@/hooks/Countdown";
import { deleteRecurso } from "@/services/recursos.service";
import { formatDate } from "@/utils/formatDate";

interface Props {
  recurso: Recurso;
}

export default function CardRecursos({ recurso }: Props) {
  const { isExpired } = useCountdown(recurso.fecha_caducidad);

  const handleDelete = async () => {
    if (recurso) {
      try {
        await deleteRecurso(recurso.id);
        console.log("Recurso eliminado por caducidad");
        // Aquí puedes actualizar el estado para remover el elemento de la UI
        // Por ejemplo, llamar a una función para refrescar la lista
      } catch (error) {
        console.error("Error al eliminar recurso:", error);
      }
    }
  };
  return (
    <article
      key={recurso.id}
      className="w-[calc(33%_-_30px)]  flex flex-col gap-3"
    >
      <div className="w-full relative rounded-2xl overflow-hidden">
        {recurso.tipo_recurso === "Exclusivos" && (
          <Image
            className="absolute top-4 left-4 w-10 z-30"
            src={"/icons/corona.svg"}
            alt={` ${recurso.nombre_recurso}`}
            width={100}
            height={100}
          />
        )}

        <div className="w-full aspect-[1/0.8] object-cover">
          <Image
            className="h-full w-full"
            src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/doc/${recurso.img_recurso}`}
            alt={`caducado ${recurso.nombre_recurso}`}
            width={500}
            height={500}
          />{" "}
        </div>

        {!isExpired && (
          <a
            className="group absolute cursor-pointer right-4 bottom-4 bg-white text-[#FC68B9] font-semibold flex items-center gap-3 p-1.5 px-4 rounded-full hover:bg-[#FC68B9] hover:text-white"
            href={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/doc/${recurso?.link_recurso}`}
            download
          >
            <div className="w-5 h-5 bg-[url(/icons/documento-pink.svg)] bg-no-repeat bg-center group-hover:bg-[url(/icons/documento.svg)]" />
            <p>Descargar</p>
          </a>
        )}
        {isExpired && (
          <div className="absolute w-full h-full top-0 left-0 bg-[#FC68B980] flex items-center justify-center cursor-no-drop z-20">
            <Image
              src={"/icons/candado.svg"}
              alt={`caducado ${recurso.nombre_recurso}`}
              width={45}
              height={45}
            />
          </div>
        )}
      </div>
      {isExpired ? (
        <div className="w-full flex justify-between items-center">
          <p className=" w-fit bg-[#FC68B9] px-3 py-1 flex items-center gap-2 rounded-full text-medium text-white font-semibold ">
            Caducado
          </p>
          <article className=" w-fit  flex items-center gap-2 ">
            <Image
              className="w-5"
              src={"/icons/calendario.svg"}
              alt={` ${recurso.nombre_recurso}`}
              width={100}
              height={100}
            />
            <p className="text-base text-[#FFB4DF]  font-medium">
              {formatDate(recurso.fecha_caducidad)}
            </p>
          </article>
        </div>
      ) : (
        <div className=" w-fit bg-[#FFEE97] text-[#FC68B9]  px-4 py-0 flex items-center gap-2 rounded-full">
          <Image
            className="w-4"
            src={"/icons/relojArena.svg"}
            alt={` ${recurso.nombre_recurso}`}
            width={100}
            height={100}
          />
          <Countdown
            fechaCaducidad={recurso?.fecha_caducidad}
            onDelete={handleDelete}
          />
        </div>
      )}

      <h3 className="text-medium font-semibold text-[#8A8A8A] uppercase">
        {recurso.nombre_recurso}
      </h3>
    </article>
  );
}
