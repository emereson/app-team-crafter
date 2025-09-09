import { DatosCliente } from "@/interfaces/user.type";
import { datosClienteFlow } from "@/services/auth/auth.service";
import { getSuscripciones } from "@/services/auth/suscripcion.service";
import useSuscripcionStore from "@/stores/SuscripcionContext";
import { handleAxiosError } from "@/utils/errorHandler";
import { planes } from "@/utils/planes";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function DatosCompra() {
  const forceRefetch = useSuscripcionStore((state) => state.forceRefetch);
  const { suscripcion } = useSuscripcionStore();
  const [datosCliente, setDatosCliente] = useState<DatosCliente>();

  const gfindsuscripciones = useCallback(async () => {
    if (!suscripcion?.customerId) return;
    try {
      const res = await datosClienteFlow(suscripcion.customerId);

      setDatosCliente(res);
    } catch (err) {
      handleAxiosError(err);
    }
  }, [suscripcion?.customerId]);

  useEffect(() => {
    gfindsuscripciones();
  }, [getSuscripciones, suscripcion?.customerId]);

  useEffect(() => {
    forceRefetch();
  }, [forceRefetch]);

  const planSuscripcion = (planExternalId: string) => {
    const planActivo = planes.find((p) => p.flow_plan_id === planExternalId);

    return planActivo;
  };

  return (
    <>
      {suscripcion && (
        <section className="w-1/2 min-w-[300px] h-auto bg-white p-6 rounded-2xl flex flex-col justify-start items-center gap-10 max-md:w-full  pb-10">
          <Image
            className="w-[150px]"
            src="/verificacion.gif"
            alt="Logo PS y AI"
            width={800}
            height={800}
            priority
          />
          <article className="text-center w-8/10">
            <h1 className="text-5xl text-[#68E1E0] font-black uppercase">
              Compra
            </h1>
            <h2 className="-mt-7 text-6xl text-[#FC68B9] font-[LearningCurve]">
              completada
            </h2>
            <p className="text-lg font-medium text-[#8A8A8A] mt-6">
              Gracias por tu suscripción.{" "}
              <strong>
                {" "}
                La boleta ha <br />
                sido enviada a tu correo.
              </strong>
            </p>
          </article>
          <div className="w-8/10 bg-[#F1F6FB] rounded-2xl p-6">
            <ul className="w-full space-y-4">
              <li className="text-[#8A8A8A] text-base font-medium  flex justify-between">
                <p>Plan seleccionado</p>
                <p className="text-[#a9a9a9]">
                  {planSuscripcion(suscripcion?.planExternalId)?.nombre_plan}
                </p>
              </li>
              <li className="text-[#8A8A8A] text-base font-medium  flex justify-between">
                <p>Total a pagar</p>
                <p className="text-[#a9a9a9]">
                  ${" "}
                  {planSuscripcion(
                    suscripcion?.planExternalId
                  )?.precio_plan?.toFixed(2)}
                </p>
              </li>
              <li className="text-[#8A8A8A] text-base font-medium  flex justify-between gap-10">
                <p>Correo confirmación</p>
                <p className="text-[#a9a9a9]">{datosCliente?.email}</p>
              </li>
            </ul>
          </div>
          <Link
            href={"/"}
            className="w-fit  bg-[#fc68b9] text-[#ffee97] text-xl font-semibold px-10 py-3 border-5 border-[#ffee97] rounded-full hover:bg-[#fc68b9]  hover:text-[#ffee97] shadow-rigth-yellow duration-500"
          >
            Explorar mi cuenta
          </Link>
        </section>
      )}
    </>
  );
}
