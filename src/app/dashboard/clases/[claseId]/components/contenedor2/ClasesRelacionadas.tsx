"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay, Pagination } from "swiper/modules";
import CardClases from "@/app/dashboard/components/CardClases";

export default function ClasesRelacionadas() {
  const imagenesCarrusel = [
    {
      id: 1,
      guid: "/inicio/banner1.png",
      titulo: "Hemos preparado estos 3 archivos gratis para halloween",
      fecha_inicio: "2025-07-25 16:16:25",
      fecha_final: "2025-07-26 16:16:25",
    },
    {
      id: 2,
      guid: "/inicio/banner1.png",
      titulo: "Hemos preparado estos 3 archivos gratis para halloween",
      fecha_inicio: "2025-07-25 16:16:25",
      fecha_final: "2025-07-26 16:16:25",
    },
  ];
  return (
    <section className="w-full flex flex-col gap-4 ">
      <h2 className="text-lg text-[#68E1E0] font-semibold">
        Clases relacionada
      </h2>
      <Swiper
        className="h-full w-full pb-4 "
        modules={[Navigation, A11y, Autoplay, Pagination]}
        spaceBetween={1}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={true}
      >
        {imagenesCarrusel.map((item) => (
          <SwiperSlide key={item.id} className="!w-full !h-full pb-10">
            <CardClases
              key={item.id}
              producto={item}
              width="w-full"
              hegiht_portada="h-[157px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
