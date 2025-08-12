"use client";
import { useState } from "react";

export default function DescripcionClase() {
  const [expanded, setExpanded] = useState(false);

  const texto =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas iaculis magna risus, ut egestas tortor convallis vel. Sed sit amet ullamcorper nisl, ut feugiat justo. Nunc gravida est et consequat pulvinar. Suspendisse nec dictum lorem. Vivamus sagittis turpis a diam luctus, at lacinia nunc bibendum. Nulla facilisi. Donec at metus eget justo suscipit suscipit. Praesent ut sem sed velit aliquet blandit.";

  return (
    <section className="w-full flex flex-col gap-2">
      <h2 className="text-lg text-[#68E1E0] font-semibold">Descripción</h2>

      <p
        className={`font-light transition-all duration-300 ${
          expanded ? "line-clamp-none" : "line-clamp-4"
        }`}
      >
        {texto}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-fit -mt-1 text-sm text-[#FC68B9] font-bold cursor-pointer uppercase"
      >
        {expanded ? "Leer menos" : "Leer más"}
      </button>
    </section>
  );
}
