"use client";
// import {  useState } from "react";
// import { getImagenesCarrusel } from "../services/inicio.services";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay, Pagination } from "swiper/modules";
// import { ImagenCarrusel } from "../interfaces/inicio.interfaces";
import Image from "next/image";

export default function BannerInicio() {
  const imagenesCarrusel = [
    {
      id: 1,
      guid: "/inicio/banner1.png",
    },
    {
      id: 2,
      guid: "/inicio/banner1.png",
    },
  ];

  // const cargarAulas = async () => {
  //   try {
  //     const data = await getImagenesCarrusel();
  //     setImagenesCarrusel(data.imagenesCarrusel);
  //   } catch (error) {
  //     console.error("Error al cargar aulas:", error);
  //   }
  // };
  // useEffect(() => {
  //   cargarAulas();
  // }, []);

  return (
    <section className="relative   w-full flex  flex-col  overflow-hidden  ">
      <div className="w-full h-[450px] max-md:h-[300px]">
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
          {imagenesCarrusel.map((imagen) => (
            <SwiperSlide key={imagen.id} className="!w-full !h-full pb-10">
              <img
                className="w-full h-full  object-cover rounded-2xl"
                src={imagen.guid}
                alt="ps y ai"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <article className="w-full bg-[#FFEE97] p-4 mt-4 border-4 border-[#FFE251] flex items-center gap-4 rounded-xl max-md:flex-col">
        <Image
          className="w-[55px] h-[55px] object-cover max-md:w-[40px] max-md:h-[40px]"
          src="/icons/sAdmiracion.svg"
          alt="ps y ai"
          width={100}
          height={100}
        />
        <p className="text-[#FC68B9] text-lg max-md:text-base max-md:text-center">
          <strong>¡Bienvenido!</strong> Desde el momento en que te suscribes,
          disfrutas de acceso{" "}
          <strong>a contenido exclusivo, clases y recursos diseñados</strong>
          para tus proyectos de Papelería Creativa y Personalizados. Recuerda
          que cada recurso estará disponible por{" "}
          <strong>
            {" "}
            30 días desde su publicación. Una vez caducado, no habrá opción a
            reclamos,
          </strong>{" "}
          así que no olvides{" "}
          <strong>descargarlo a tiempo y aprovecharlo al máximo.</strong>
        </p>
      </article>
    </section>
  );
}
