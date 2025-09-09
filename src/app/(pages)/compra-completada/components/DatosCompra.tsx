import useSuscripcionStore from "@/stores/SuscripcionContext";
import { planes } from "@/utils/planes";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function DatosCompra() {
  const forceRefetch = useSuscripcionStore((state) => state.forceRefetch);

  useEffect(() => {
    forceRefetch();
  }, [forceRefetch]);

  const { suscripcion } = useSuscripcionStore();
  const planSuscripcion = (planExternalId: string) => {
    const planActivo = planes.find((p) => p.flow_plan_id === planExternalId);

    return planActivo;
  };

  return (
    <>
      {suscripcion && (
        <section className="w-full min-w-[300px]  h-full bg-white p-14 rounded-2xl  flex flex-col justify-center items-center  gap-10  max-sm:p-10">
          <Image
            className="w-[150px]"
            src="/verificacion.gif"
            alt="Logo PS y AI"
            width={800}
            height={800}
            priority
          />
          <article className="text-center">
            <h1 className="text-5xl text-[#68E1E0] font-black uppercase">
              Compra
            </h1>
            <h2 className="-mt-7 text-6xl text-[#FC68B9] font-[LearningCurve]">
              completada
            </h2>
            <p className="text-lg font-medium text-[#8A8A8A] mt-6">
              Gracias por tu suscripción.{" "}
              <strong> La boleta ha sido enviada a tu correo.</strong>
            </p>
          </article>
          <div className="w-full bg-[#F1F6FB] rounded-2xl p-10">
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
                  ${suscripcion?.precio.toFixed(2)}
                </p>
              </li>
              {/* <li className="text-[#8A8A8A] text-base font-medium  flex justify-between gap-10">
            <p>Correo confirmación</p>
            <p className="text-[#a9a9a9]">{suscripcion?.usuario.correo}</p>
          </li> */}
            </ul>
          </div>
          <Link
            href={"/"}
            className="w-fit  bg-[#fc68b9] text-white text-xl font-semibold px-10 py-4 border-5 border-[#fc68b9] rounded-full hover:bg-[#fc68b9] hover:border-[#fc68b9] hover:text-[#ffee97] shadow-rigth-yellow duration-500"
          >
            Explorar mi cuenta
          </Link>
        </section>
      )}
    </>
  );
}
