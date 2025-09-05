"use client";

import PsAi from "@/app/components/PsAi";
import TuPedido from "./components/TuPedido";
import Link from "next/link";
import useSuscripcionStore from "@/stores/SuscripcionContext";

export default function PlanId() {
  const { suscripcion } = useSuscripcionStore();

  return (
    <main className="w-full p-10 py-14 flex gap-8 background-login max-sm:px-4">
      <div className="w-full min-h-screen h-full  max-w-[1440px] m-auto flex  p-12 overflow-hidden max-sm:p-0 max-sm:flex-col-reverse">
        <PsAi />
        {suscripcion ? (
          <section
            className="m-auto w-full min-w-[300px]  h-full bg-white p-14 rounded-2xl  flex flex-col justify-center items-start  gap-14
          
          "
          >
            <h1 className="text-xl font-bold text-[#68E1E0] text-center">
              Ya cuenta con una suscripcion activa
            </h1>
            <Link
              href={"/"}
              className="color-pink m-auto text-base font-semibold"
            >
              Ir a inico
            </Link>
          </section>
        ) : (
          <TuPedido />
        )}
      </div>
    </main>
  );
}
