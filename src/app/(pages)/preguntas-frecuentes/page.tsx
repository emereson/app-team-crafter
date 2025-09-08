"use client";
import VideoPlayer from "@/app/dashboard/components/VideoPlayer";
import { faqs } from "@/utils/faqs";
import { Accordion, AccordionItem } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

export default function PreguntasFrecuentes() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePlayVideo = async () => {
    if (isAnimating || isPlaying) return;

    try {
      setIsAnimating(true);
      setTimeout(() => {
        setIsPlaying(true);
        setIsAnimating(false);
      }, 500);
    } catch (error) {
      console.error("Error al reproducir video:", error);
      setIsAnimating(false);
    }
  };

  const colores = ["bg-[#FFE1F2]", "bg-[#C3F3F3]", "bg-[#FFEE97]"];
  const coloresIcon = ["bg-[#FC68B9]", "bg-[#68E1E0]", "bg-[#EDD558]"];

  return (
    <main className="relative w-screen   bg-white flex flex-col pb-16 ">
      <div className="relative w-full h-[700px]  max-sm:h-[400px]">
        <img
          className=" w-full h-full  object-cover object-top-left rotate-180 "
          src="/gradient.svg"
          alt="fondo gradiante"
        />
        <div className="absolute bottom-[50px] w-full flex flex-col items-center justify-center p-4 mt-[100px] max-sm:bottom-[20px]">
          <article
            className="w-full max-w-[800px]  relative rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer shadow-xl shadow-pink-200"
            onClick={handlePlayVideo}
          >
            <div
              className={`w-full transition-all duration-500 ease-in-out ${
                isAnimating
                  ? "opacity-0 scale-110 transform"
                  : isPlaying
                  ? "opacity-0 scale-110 transform pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
            >
              <VideoPlayer
                hlsUrl="https://vz-96e543ae-f21.b-cdn.net/6d25523f-e92d-426f-9554-5feefe04d959/playlist.m3u8"
                mode="poster"
              />
            </div>

            <button
              className={`w-14 absolute z-10 transition-all duration-300 ease-in-out transform hover:scale-110 ${
                isAnimating
                  ? "opacity-0 scale-150"
                  : isPlaying
                  ? "opacity-0 scale-150 pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
              onClick={handlePlayVideo}
              disabled={isAnimating || isPlaying}
            >
              <Image
                src={"/icons/playVideo.svg"}
                alt="reproducir"
                width={100}
                height={100}
              />
            </button>

            <div
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                isPlaying
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {isPlaying && (
                <VideoPlayer hlsUrl="https://vz-96e543ae-f21.b-cdn.net/6d25523f-e92d-426f-9554-5feefe04d959/playlist.m3u8" />
              )}
            </div>

            {isAnimating && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB4DF]"></div>
              </div>
            )}
          </article>
        </div>
      </div>
      <h1
        className="relative  mx-auto mt-10 w-fit text-6xl font-black text-[#96EAEA] flex items-center  justify-center uppercase
      max-sm:text-4xl 
      "
      >
        Preguntas <br />
        <strong
          className="absolute -bottom-13 text-[86px] text-[#FC68B9] font-[LearningCurve] normal-case
        max-sm:text-[60px] max-sm:-bottom-8
        "
        >
          frecuentes
        </strong>
      </h1>

      <div className="w-full max-w-5xl p-4 mx-auto mt-24 max-sm:mt-12  ">
        <Accordion variant="splitted">
          {faqs.map((faq, index) => {
            const bgColor = colores[index % colores.length];
            const bgColorIcon = coloresIcon[index % coloresIcon.length];

            return (
              <AccordionItem
                key={faq.id}
                aria-label={`Accordion ${faq.id}`}
                title={faq.titulo}
                className={`rounded-full p-3 px-14 ${bgColor} mt-1 shadow-none max-sm:px-4 max-sm:py-0 max-sm:rounded-3xl`}
                indicator={({ isOpen }) => (
                  <div
                    className={`${bgColorIcon} w-8 h-8 flex items-center justify-center rounded-full cursor-pointer `}
                  >
                    {isOpen ? (
                      <LuMinus className="text-xl text-white rotate-90" />
                    ) : (
                      <LuPlus className="text-xl text-white " />
                    )}
                  </div>
                )}
                classNames={{
                  title:
                    "text-[#8A8A8A] font-extrabold text-xl max-sm:text-base",
                }}
              >
                <p className="w-[85%] text-[#8A8A8A] text-sm mt-[-20px]">
                  {faq.contenido}
                </p>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
      <section className="w-full max-w-4xl mx-auto mt-16 flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-3xl text-[#FFB4DF] font-extrabold max-sm:text-2xl">
          ¿Aún tienes preguntas?
        </h2>
        <p className="text-xl text-[#8A8A8A] font-bold max-sm:text-base">
          Estamos aquí para ayudarte con cualquier consulta.
        </p>
        <a
          href="https://api.whatsapp.com/send/?phone=51994757941&text&type=phone_number&app_absent=0"
          target="_blank"
          className={`w-fit rounded-full text-2xl font-semibold px-12 py-3 border-4
               bg-[#fc68b9] text-[#ffee97] border-[#FFEE97] shadow-rigth-yellow cursor-pointer
          max-sm:text-xl `}
        >
          Contáctanos
        </a>
      </section>
    </main>
  );
}
