"use client";

import TituloDescuentos from "./components/TituloDescuentos";
import TodosDescuentos from "./components/TodosDescuentos";

export default function Descuentos() {
  return (
    <main className="w-full p-8  pb-24">
      <TituloDescuentos />
      <TodosDescuentos />
    </main>
  );
}
