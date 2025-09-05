import { TbArrowsUpDown } from "react-icons/tb";

export default function FiltrarComentarios() {
  return (
    <section className="relative w-full h-9 flex justify-between items-center mt-6">
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8A8A8A]" />
      <article className="relative h-full flex items-center gap-2 text-lg z-10">
        <span className="text-[#FC68B9] font-bold">25</span>
        <p className="text-[#68E1E0] font-semibold text-nowrap"> Comentarios</p>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FC68B9]" />
      </article>
      <div className="h-full flex items-center  z-10">
        {/* <button className="relative w-8 h-full">
          <FaFireFlameCurved className="m-auto text-[#ED0006] text-xl" />
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ED0006]" />
        </button>
        <button className="relative w-8 h-full">
          <PiLightningFill className="m-auto text-[#F9A000] text-xl" />
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F9A000]" />
        </button> */}
        <button className="flex items-center gap-2">
          <TbArrowsUpDown className="text-xl text-[#FC68B9]" />
          <p className="text-medium text-[#FC68B9] font-bold ">Más reciente</p>
        </button>
      </div>
    </section>
  );
}
