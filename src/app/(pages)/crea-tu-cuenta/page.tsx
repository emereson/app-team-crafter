"use client";
import PsAi from "../../components/PsAi";
import MetodosRegistro from "./components/MetodosRegistro";

export default function CreaTuCuenta() {
  return (
    <main className="w-screen min-h-screen  h-full  background-login ">
      <div className="w-full min-h-screen h-full  max-w-[1440px] m-auto flex  p-12 overflow-hidden">
        <PsAi />

        <MetodosRegistro />
      </div>
    </main>
  );
}
