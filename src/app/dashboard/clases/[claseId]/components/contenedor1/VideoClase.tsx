import Image from "next/image";
import { LuEye } from "react-icons/lu";
import { PiHeart } from "react-icons/pi";

export default function VideoClase() {
  const classIcons = "w-4 sm:w-5 md:w-[22px] h-4 sm:h-5 md:h-[22px]";
  const classText = "text-sm sm:text-base md:text-lg text-[#FFB4DF] font-medium";
  
  return (
    <section>
      <article className="w-full relative rounded-2xl overflow-hidden flex items-center justify-center">
        <Image
          className="w-full h-auto object-cover"
          src="/videoimg.png"
          alt="Hemos preparado estos 3 archivos gratis para halloween"
          width={1000}
          height={1000}
        />
        <button className="w-10 sm:w-12 md:w-14 absolute">
          <Image
            src={"/icons/playVideo.svg"}
            alt={`reproducir`}
            width={100}
            height={100}
          />
        </button>
      </article>
      
      <article className="w-full flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-4 sm:mt-6">
        <h1 className="text-lg sm:text-xl text-[#8A8A8A] font-bold leading-tight">
          Hemos preparado estos 3 archivos gratis para halloween
        </h1>
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[url(/icons/favoritos-no.svg)] bg-fill bg-no-repeat bg-center hover:bg-[url(/icons/favoritos.svg)] duration-300 rounded-lg self-start sm:self-auto sm:-mt-2" />
      </article>
      
      <article className="w-full flex flex-wrap gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6">
        <div className="flex items-center gap-2">
          <Image
            className={classIcons}
            src={"/icons/clock.svg"}
            alt={`tiempro de video`}
            width={50}
            height={50}
          />
          <p className={classText}>1:19:51</p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            className={classIcons}
            src={"/icons/calendario.svg"}
            alt={`tiempro de video`}
            width={50}
            height={50}
          />
          <p className={classText}>10 Oct 2024</p>
        </div>
        <div className="flex items-center gap-2">
          <LuEye className="text-xl sm:text-2xl text-[#FFB4DF]" />
          <p className={classText}>152 reproducciones</p>
        </div>
        <div className="flex items-center gap-2">
          <PiHeart className="text-xl sm:text-2xl text-[#FFB4DF]" />
          <p className={classText}>123</p>
        </div>
      </article>
    </section>
  );
}
