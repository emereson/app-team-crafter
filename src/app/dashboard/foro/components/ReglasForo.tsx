import Image from "next/image";

export default function ReglasForo() {
  return (
    <section className="w-full flex flex-col gap-6 sm:gap-8 bg-white p-3 sm:p-4 rounded-2xl border-1 border-[#FFB4DF] mt-8 sm:mt-10 md:mt-14">
      <article className="flex flex-col gap-2">
        <h3 className="text-base sm:text-lg text-[#68E1E0] font-semibold flex items-center gap-2">
          <Image
            src={"/icons/reglas_foro.svg"}
            alt={`Más reciente `}
            width={18}
            height={18}
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          Reglas del foro
        </h3>
        <ul className="list-disc pl-3 sm:pl-4 text-sm sm:text-base text-[#FC68B9] font-semibold flex flex-col gap-1 sm:gap-2">
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            iaculis magna risus, ut egestas tortor convallis vel.
          </li>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        </ul>
      </article>
      <article className="flex flex-col gap-2">
        <h3 className="text-base sm:text-lg text-[#68E1E0] font-semibold flex items-center gap-2">
          <Image
            src={"/icons/publicacionesDestacadas.svg"}
            alt={`Más reciente `}
            width={18}
            height={18}
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          Publicaciones destacadas
        </h3>
        <ul className="list-disc pl-3 sm:pl-4 text-sm sm:text-base text-[#FC68B9] font-semibold flex flex-col gap-1 sm:gap-2">
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
