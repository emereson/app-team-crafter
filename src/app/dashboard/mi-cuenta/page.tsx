"use client";

import { useState } from "react";
import NavMiCuenta from "./components/NavMiCuenta";
import TituloMiCuenta from "./components/TituloMiCuenta";
import InformacionPersonal from "./components/InformacionPersonal";
import InformacionSuscripcion from "./components/InformacionSuscripcion";

export default function MiCuenta() {
  const [navSelect, setNavSelect] = useState(1);
  return (
    <section className="w-full max-w-7xl mx-auto p-8  pb-24 flex flex-col gap-8">
      <TituloMiCuenta />
      <NavMiCuenta navSelect={navSelect} setNavSelect={setNavSelect} />
      {navSelect === 1 && <InformacionPersonal />}

      {navSelect === 4 && <InformacionSuscripcion />}
    </section>
  );
}
