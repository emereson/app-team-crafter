"use client";

import PsAi from "@/app/components/PsAi";
import DatosCompra from "./components/DatosCompra";

export default function Page() {
  return (
    <main className="w-full p-10 py-14 flex gap-8 background-login">
      <div className="w-full min-h-screen h-full  max-w-[1440px] m-auto flex  p-12 overflow-hidden">
        <PsAi />

        <DatosCompra />
      </div>
    </main>
  );
}
