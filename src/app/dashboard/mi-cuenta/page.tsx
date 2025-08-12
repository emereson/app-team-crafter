"use client";

import { useState } from "react";
import NavMiCuenta from "./components/NavMiCuenta";
import TituloMiCuenta from "./components/TituloMiCuenta";

export default function MiCuenta() {
  const [navSelect, setNavSelect] = useState(1);
  return (
    <main className="w-full p-8  pb-24 flex flex-col gap-8">
      <TituloMiCuenta />
      <NavMiCuenta navSelect={navSelect} setNavSelect={setNavSelect} />
    </main>
  );
}
