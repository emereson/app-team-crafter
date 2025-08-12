import Image from "next/image";

export default function ReglasForo() {
  return (
    <section className="w-full flex flex-col gap-8 bg-white p-4 rounded-2xl border-1 border-[#FFB4DF] mt-14">
      <article className="flex flex-col gap-2">
        <h3 className=" text-lg text-[#68E1E0] font-semibold flex items-center gap-2">
          <Image
            className="text-xs"
            src={"/icons/reglas_foro.svg"}
            alt={`Más reciente `}
            width={20}
            height={20}
          />
          Reglas del foro
        </h3>
        <ul className="list-disc pl-4 text-[#FC68B9] font-semibold flex flex-col gap-2">
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            iaculis magna risus, ut egestas tortor convallis vel.
          </li>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        </ul>
      </article>
      <article className="flex flex-col gap-2">
        <h3 className=" text-lg text-[#68E1E0] font-semibold flex items-center gap-2">
          <Image
            className="text-xs"
            src={"/icons/publicacionesDestacadas.svg"}
            alt={`Más reciente `}
            width={20}
            height={20}
          />
          Publicaciones destacadas{" "}
        </h3>
        <ul className="list-disc pl-4 text-[#FC68B9] font-semibold flex flex-col gap-2">
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            iaculis magna risus, ut egestas tortor convallis vel.
          </li>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        </ul>
      </article>
    </section>
  );
}
