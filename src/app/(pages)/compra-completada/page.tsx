"use client";

import PsAi from "@/app/components/PsAi";
import DatosCompra from "./components/DatosCompra";

export default function Page() {
  return (
    <main className="w-screen min-h-screen  h-full  background-login max-sm:h-auto max-sm:py-10 ">
      <div className="w-full min-h-screen h-full  max-w-[1440px] m-auto flex  p-12 overflow-hidden max-sm:flex-col-reverse max-sm:p-4 gap-10">
        <PsAi />
        <DatosCompra />
      </div>
    </main>
  );
}
