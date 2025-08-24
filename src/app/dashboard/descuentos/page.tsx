"use client";

import TituloDescuentos from "./components/TituloDescuentos";
import TodosDescuentos from "./components/TodosDescuentos";

export default function Descuentos() {
  return (
    <main className="w-full p-4 sm:p-6 md:p-8 pb-16 sm:pb-20 md:pb-24">
      <TituloDescuentos />
      <TodosDescuentos />
    </main>
  );
}
