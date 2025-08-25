"use client";
import PsAi from "@/app/components/PsAi";
import FormRegistroCorreo from "./components/FormRegistroCorreo";

export default function RegistroCorreo() {
  return (
    <main className="w-screen min-h-screen  h-full  background-login ">
      <div className="w-full min-h-screen h-full  max-w-[1440px] m-auto flex  p-12 overflow-y-auto">
        <PsAi />
        <FormRegistroCorreo />
      </div>
    </main>
  );
}
