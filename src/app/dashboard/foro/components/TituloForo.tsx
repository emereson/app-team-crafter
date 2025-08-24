import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";

export default function TituloForo() {
  return (
    <section className="w-full flex flex-col gap-4 sm:gap-6">
      <Breadcrumbs
        itemClasses={{
          item: [" data-[current=true]:text-[#FC68B9] transition-colors"],
        }}
        size="sm"
        className="text-sm sm:text-base"
      >
        <BreadcrumbItem key="inicio">Inicio</BreadcrumbItem>
        <BreadcrumbItem>Foro</BreadcrumbItem>
      </Breadcrumbs>
      <h1 className="relative m-auto w-fit text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#96EAEA] flex items-center justify-center uppercase text-center leading-tight">
        Comunidad de <br />
        <strong className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-13 text-4xl sm:text-5xl md:text-6xl lg:text-[86px] text-[#FC68B9] font-[LearningCurve] normal-case">
          team crafter
        </strong>
      </h1>
    </section>
  );
}
