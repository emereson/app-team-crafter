import FormularioCaducado from "@/app/dashboard/components/FormularioCaducado";
import Countdown, { useCountdown } from "@/hooks/Countdown";
import { Clase } from "@/interfaces/clase.interface";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BsExclamationCircle } from "react-icons/bs";

interface Props {
  clase: Clase;
}

export default function RecursoDescargable({ clase }: Props) {
  const { isExpired } = useCountdown(clase.recurso.fecha_caducidad);
  const [verFormulario, setVerFormulario] = useState(false);

  return (
    <>
      {isExpired ? (
        <div>
          <h2 className="text-lg text-[#68E1E0] font-semibold">
            Recurso descargable
          </h2>
          <section
            className={`w-full p-4  rounded-2xl ${
              clase.recurso.tipo_recurso === "Exclusivos"
                ? "bg-[#FFE1F2]"
                : "bg-[#FFEE97]"
            }`}
          >
            {verFormulario ? (
              <FormularioCaducado
                recurso={clase.recurso}
                onOpenChange={() => {}}
              />
            ) : (
              <div className="text-center text-[#FC68B9] font-bold flex flex-col items-center gap-2">
                <BsExclamationCircle className="text-2xl m-auto" />
                <h2 className="text-lg">¡RECURSO CADUCADO!</h2>
                <p className="text-sm">
                  {clase.recurso.tipo_recurso === "Exclusivos"
                    ? "Lo sentimos, han caducado los 30 días para la descarga de este archivo, cuando llega a la fecha límite no hay opción a solicitarlo. Para más información darle clic a contactarse."
                    : "Lo sentimos, han caducado los 30 días para la descarga de este archivo. Si deseas comprarlo por separado puedes adquirirlo en nuestra tienda web"}
                </p>
                {clase.recurso.tipo_recurso === "Exclusivos" ? (
                  <button
                    className="w-full p-2 text-lg bg-[#FC68B9] rounded-full text-[#FFFFFF] cursor-pointer "
                    onClick={() => setVerFormulario(true)}
                  >
                    Contactarse
                  </button>
                ) : (
                  <Link
                    href={"https://glorialobatonarchivos.com/"}
                    target="_blank"
                    className="w-full p-2 text-xl bg-[#FC68B9] rounded-full text-[#FFFFFF] cursor-pointer "
                  >
                    Ir a Tienda de archivos
                  </Link>
                )}
                <article className="flex gap-2 text-start mt-2">
                  <Image
                    className="aspect-[1/1] w-20 h-20 rounded-xl ov"
                    src={`${process.env.NEXT_PUBLIC_API_URL_UPLOADS}/doc/${clase.recurso.img_recurso}`}
                    alt={`caducado ${clase.recurso.nombre_recurso}`}
                    width={100}
                    height={100}
                  />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-[#8A8A8A] text-sm">
                      {clase.recurso.nombre_recurso}
                    </h3>
                    <div className="border-2 border-[#FC68B9] rounded-full">
                      {clase.recurso?.fecha_caducidad && (
                        <Countdown
                          fechaCaducidad={clase.recurso?.fecha_caducidad}
                        />
                      )}
                    </div>
                  </div>
                </article>
              </div>
            )}
          </section>
        </div>
      ) : (
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
                <Countdown fechaCaducidad={clase.recurso?.fecha_caducidad} />
              )}
            </span>
          </article>
        </section>
      )}
    </>
  );
}
