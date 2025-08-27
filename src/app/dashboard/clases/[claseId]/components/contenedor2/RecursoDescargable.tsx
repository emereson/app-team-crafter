import Countdown from "@/hooks/Countdown";
import { Clase } from "@/interfaces/clase.interface";
import { deleteRecurso } from "@/services/recursos.service";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface Props {
  clase: Clase;
}

export default function RecursoDescargable({ clase }: Props) {
  const handleDelete = async () => {
    if (clase.recurso) {
      try {
        await deleteRecurso(clase.recurso.id);
        console.log("Recurso eliminado por caducidad");
        // Aquí puedes actualizar el estado para remover el elemento de la UI
        // Por ejemplo, llamar a una función para refrescar la lista
      } catch (error) {
        console.error("Error al eliminar recurso:", error);
      }
    }
  };

  return (
    <section className="w-full flex flex-col gap-4 ">
      <h2 className="text-lg text-[#68E1E0] font-semibold">
        Recurso descargable
      </h2>
      <article className="flex flex-col   gap-3 border-1 border-[#8A8A8A] rounded-2xl p-4 relative">
        <h3 className="text-medium text-[#8A8A8A] font-medium">
          {clase.recurso?.nombre_recurso}
        </h3>
        <button className="group w-min cursor-pointer  bg-white text-[#FC68B9] font-semibold flex items-center gap-3 border-1 border-[#FC68B9] p-1.5 px-4 rounded-full hover:bg-[#FC68B9] hover:text-white duration-300">
          <div className="w-5 h-5 bg-[url(/icons/documento-pink.svg)] bg-no-repeat bg-center group-hover:bg-[url(/icons/documento.svg)] duration-300" />
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/doc/${clase.recurso?.link_recurso}`}
            download
          >
            Descargar
          </a>
        </button>
      </article>
      <article className="text-[#FC68B9]  flex flex-col  items-center justify-center gap-3 bg-[#FFE1F2] rounded-2xl p-4 relative">
        <AiOutlineExclamationCircle className="text-3xl text-[#FC68B9]" />
        <h3 className="text-sm text-center font-semibold ">
          No te olvides descargar el recurso <br /> caduca en{" "}
        </h3>

        <span className="w-full bg-[#FFEE97] p-2 flex  items-center justify-center text-lg font-bold  rounded-full">
          {clase.recurso?.fecha_caducidad && (
            <Countdown
              fechaCaducidad={clase.recurso?.fecha_caducidad}
              onDelete={handleDelete}
            />
          )}
        </span>
      </article>
    </section>
  );
}
