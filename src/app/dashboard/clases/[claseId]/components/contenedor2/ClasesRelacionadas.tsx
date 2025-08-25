"use client";

import { Swiper } from "swiper/react";
import { Navigation, A11y, Autoplay, Pagination } from "swiper/modules";

export default function ClasesRelacionadas() {
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
        {/* {imagenesCarrusel.map((item) => (
          <SwiperSlide key={item.id} className="!w-full !h-full pb-10">
            <CardClases
              key={item.id}
              producto={item}
              width="w-full"
              hegiht_portada="h-[157px]"
            />
          </SwiperSlide>
        ))} */}
      </Swiper>
    </section>
  );
}
